<?php 
/* User Roles Management */
Flight::route('/create_project', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$title = $input->title;
		$description = $input->description;
		
		$id = $input->id;
		
		if($id) { //This form is for Edit
			if(empty($title) ) {
				$response['error'] = "All the fields are mandatory";
			} else {		
				$query = $db->prepare(" UPDATE projects SET title = '$title',description = '$description',edited_by = '".$_SESSION['id']."', edited_date = '".date('Y-m-d')."' where id = $id ");			
				$response['success'] = 'Project Updated successfully';
				$query->execute();
			}
		} else { // This is for add
			
			if(empty($title) ) {
				$response['error'] = "All the fields are mandatory";
			} else {		
				
				$query = $db->prepare(" INSERT INTO projects(title,description,created_by,created_date) VALUES('$title','$description','".$_SESSION['id']."','".date('Y-m-d')."')");			
				$response['success'] = 'Project Created successfully';
				$query->execute();
				$id = $db->lastInsertId();				
			}
			
		}
		
	}
	echo Flight::json($response);
});

Flight::route('/getprojects', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		
		$page = isset($input->page)?$input->page:1;
		$created_by = isset($input->created_by)?$input->created_by:1;
		$nolimit = isset($input->nolimit)?$input->nolimit:0;
		$assigned_to = isset($input->assigned_to)?$input->assigned_to:'';
		$search = isset($input->search)?$input->search:'';
		//$rows = isset($input->total_rows)?$input->total_rows:0;
		$items_per_page = isset($input->per_page)?$input->per_page:3;
		//$where = ' where  created_by = u.id';
		if($search) {
			$where[] = "  ( p.title like '%$search%' OR p.description like '%$search%' )";
		}
		
		/* if($_SESSION['user_type'] > 0) {
			$where[] = " u.id = p.created_by ";
			if($created_by) {
			$where[] = "  p.created_by = ".$_SESSION['id'];
			}
		} */
		
		$sql = "";
		if($assigned_to) {
			$sql = ', projects_assign pa';
			$where[] = "   u.id = $assigned_to and pa.project_id =  p.id and pa.assign_id = $assigned_to ";
		} else {
			$where[] = " p.created_by = u.id ";
		}
		
		
		if($where ) {
			$where = ' where '.implode(' and ',$where);
		}
		//if($search != ''  ) {				
			$query = $db->prepare(" SELECT *  FROM projects p, users u $sql ".$where);
			//echo " SELECT *  FROM projects p, users u $sql ".$where; exit;
			$query->execute();
			$rows = $query->rowCount();
		//}		
		$total_pages = ceil($rows/$items_per_page);
		$limit = ($page - 1 ) * $items_per_page;
		
		$sql = " SELECT p.id, p.title, u.username, p.created_date FROM projects p, users u $sql  $where ";
		if(!$nolimit) {
			$sql .= "  LIMIT $limit,$items_per_page ";
		}
		$query = $db->prepare($sql);	
		
		$query->execute();
		$json_list = '';
	    while($result = $query->fetch()) {
			//print_r( $result );
			$json_list[] = array( 
			'id' => $result['id'],
			'title' => $result['title'],
			'created_by' => $result['username'],
			'created_date' => $result['created_date']
			);
		}
		$response['nodata'] = "";
		if(empty($json_list)) {
			$response['nodata'] = "No Projects found";
		}
		$response['data'] = $json_list;
		
		$response['pagination']['total_rows'] = $rows;
		$response['pagination']['total_pages'] = $total_pages;	
	}
	echo Flight::json($response);
});

Flight::route('/gettasksby', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$id = isset($input->id)?$input->id:'';
		$type = isset($input->type)?$input->type:'';
		
		if($type == 'status') {
			$query = $db->prepare("  SELECT s.id, s.color, s.name, COUNT( t.status_id ) as cnt FROM  `tasks` t, STATUS s WHERE project_id = $id AND s.id = t.status_id GROUP BY t.status_id");	
		} elseif( $type == 'priority') {
			$query = $db->prepare("  SELECT p.id, p.color, p.name, COUNT( t.priority_id ) as cnt FROM  `tasks` t, priority p WHERE project_id = $id AND p.id = t.priority_id GROUP BY t.priority_id");
		} elseif( $type == 'task_type' ) {
			$query = $db->prepare("  SELECT tt.id, tt.color, tt.name, COUNT( t.task_type_id ) as cnt FROM  `tasks` t, task_types tt WHERE project_id = $id AND tt.id = t.task_type_id GROUP BY t.task_type_id");
		}
		
		$query->execute();
		if( $query->rowCount() ) {
	    while($result = $query->fetch()) {
			//print_r( $result );
			$json_list[] = array( 
			'label' => $result['name'],
			'value' => $result['cnt'],
			'color' => $result['color'],
			'id' => $result['id'],
			
			);
		}
			$response['data'] = $json_list;
			$response['nodata'] = '';
		} else {
			$response['data'] = '';
			$response['nodata'] = 'No data';
		}
		
		
		
	}
	echo Flight::json($response);
});



Flight::route('/getaproject', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$id = isset($input->id)?$input->id:1;
		
		$query = $db->prepare(" SELECT * FROM projects where id = $id");	
		
		$query->execute();
	    while($result = $query->fetch()) {
			//print_r( $result );
			$response['id'] = $result['id'];		
			$response['title'] = $result['title'];	
			$response['description'] = $result['description'];
			$response['created_date'] = $result['created_date'];			
			$response['edited_date'] = $result['edited_date'];
			$response['created_by'] = $result['created_by'];
			$response['edited_by'] = $result['edited_by'];
		}
	}
	echo Flight::json($response);
});

Flight::route('/removeproject', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		$id = $input->id;
		$query = $db->prepare(" delete FROM  projects where id = $id limit 1");			
		$query->execute();
	}
	echo Flight::json($response);
});

Flight::route('/getassignees', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		
		$id = isset($input->id)?$input->id:'';
		
		$json_list = get_all_assignees($id);
		$response['nodata'] = "";
		if(empty($json_list)) {
			$response['nodata'] = "No users found";
		}
		$response['data'] = $json_list;
	}
	echo Flight::json($response);
});




Flight::route('/removeaattachment', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {		
		$project_id = isset($input->project_id)?$input->project_id:'';
		$project_type = isset($input->project_type)?$input->project_type:'';
		$query = $db->prepare("DELETE FROM task_attachments where post_type = '$project_type' and post_id = $project_id");
		$query->execute();		
	}
	echo Flight::json($response);
});

Flight::route('/removeassignees', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		
		$project_id = isset($input->project_id)?$input->project_id:'';
		$assign_id = isset($input->assign_id)?$input->assign_id:'';
		
		$query = $db->prepare("DELETE FROM projects_assign where project_id = $project_id and assign_id = $assign_id");
		$query->execute();
		$json_list = get_all_assignees($project_id);
		$response['nodata'] = "";
		if(empty($json_list)) {
			$response['nodata'] = "No users found";
		}
		$response['data'] = $json_list;
	}
	echo Flight::json($response);
});


Flight::route('/addauto_suggest', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		
		$project_id = isset($input->id)?$input->id:'';
		$assign_id = isset($input->assign_id)?$input->assign_id:'users';
				
		$query = $db->prepare("  INSERT INTO projects_assign(project_id,assign_id) VALUES($project_id,$assign_id)");	
	

		$query->execute();
		
		$json_list = get_all_assignees($project_id);
		$response['nodata'] = "";
		if(empty($json_list)) {
			$response['nodata'] = "No users found";
		}
		$response['data'] = $json_list;
	}
	echo Flight::json($response);
});

function get_all_assignees($project_id) {

	global $db;
	
	$query = $db->prepare("  SELECT pa.assign_id, username FROM projects_assign pa ,users u where u.id = pa.assign_id and project_id = $project_id");
	$query->execute();
	while($result = $query->fetch()) {
		//print_r( $result );
		$json_list[] = array( 
		'id' => $result['assign_id'],
		'name' => $result['username']
		);
	}
	return $json_list;
}

/* User Roles Management */