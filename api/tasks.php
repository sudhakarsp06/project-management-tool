<?php 
/* User Roles Management */
Flight::route('/create_task', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$title = addslashes($input->title);		
		$details = addslashes($input->details);	
		$status_id = $input->status_id;	
		$project_id = $input->project_id;	
		$assigned_to = $input->assigned_to;	
		$task_type_id = $input->task_type_id;	
		$priority_id = $input->priority_id;	
		$id = $input->id;
		
		if($id) { //This form is for Edit
			if( empty($title) || empty($details) || empty($status_id) || empty($project_id) || empty($assigned_to) || empty($task_type_id) || empty($priority_id) ) {
				$response['error'] = "All the fields are mandatory";
			} else {		
				$query = $db->prepare(" UPDATE tasks SET title = '$title', details = '$details', status_id = '$status_id', project_id = '$project_id', assigned_to = '$assigned_to', task_type_id = '$task_type_id', modified_by = '".$_SESSION['id']."', modified_date = '".date('Y-m-d')."', priority_id = '$priority_id' where id = $id ");			
				$response['success'] = 'Task Updated successfully';
				$query->execute();
			}
		} else { // This is for add
			
			if(empty($title) || empty($details) || empty($status_id) || empty($project_id) || empty($assigned_to) || empty($task_type_id) || empty($priority_id) ) {
				$response['error'] = "All the fields are mandatory";
			} else {						
				$query = $db->prepare(" INSERT INTO tasks(title,details,status_id,project_id,assigned_to,task_type_id,created_by,created_date,modified_by,modified_date,priority_id) VALUES('$title','$details','$status_id','$project_id','$assigned_to','$task_type_id','".$_SESSION['id']."','".date('Y-m-d')."','".$_SESSION['id']."','".date('Y-m-d')."','$priority_id')");			
				$response['success'] = 'Task Created successfully';
				$query->execute();
				$id = $db->lastInsertId();
				//whenever they insert a new role here, try to propogate this role to all the existing user types
				//with yes = 0
				
			}
			
		}
		
	}
	echo Flight::json($response);
});

Flight::route('/gettasks', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		
		$page = isset($input->page)?$input->page:1;
		$status_id = isset($input->status_id)?$input->status_id:'';
		$priority_id = isset($input->priority_id)?$input->priority_id:'';
		$project_id = isset($input->project_id)?$input->project_id:'';
		$assigned_to = isset($input->assigned_to)?$input->assigned_to:'';
		$search = isset($input->search)?$input->search:'';
		$created_by = isset($input->created_by)?$input->created_by:1;
		$task_type_id = isset($input->task_type_id)?$input->task_type_id:'';
		
		//$rows = isset($input->total_rows)?$input->total_rows:0;
		$items_per_page = isset($input->per_page)?$input->per_page:3;
		$where = '';
		if($search) {
			$where = " AND ( t.title like '%$search%' OR t.title like '%$search%' OR  t.details like '%$search%' OR t.details like '%$search%' )";
		}
		
		if(strstr($status_id,',') || $status_id > 0) {
			$status_ids = explode(',',$status_id);
			foreach($status_ids as $id) {
				$status_where[] = ' status_id = '.$id;
			}
			$where .= " AND ( ".implode(' OR ',$status_where).") ";
		}
		
		if(strstr($priority_id,',') || $priority_id > 0) {
			$priority_ids = explode(',',$priority_id);
			foreach($priority_ids as $id) {
				$priority_where[] = ' priority_id = '.$id;
			}
			$where .= " AND ( ".implode(' OR ',$priority_where).") ";
		}
		
		if(strstr($project_id,',') || $project_id > 0) {
			$project_ids = explode(',',$project_id);
			foreach($project_ids as $id) {
				$project_where[] = ' project_id = '.$id;
			}
			$where .= " AND ( ".implode(' OR ',$project_where).") ";
		}
		
		if(strstr($assigned_to,',') || $assigned_to > 0) {
			$assigned_tos = explode(',',$assigned_to);
			foreach($assigned_tos as $id) {
				$assign_where[] = ' assigned_to = '.$id;
			}
			$where .= " AND ( ".implode(' OR ',$assign_where).") ";
		}
		
		
		if(strstr($task_type_id,',') || $task_type_id > 0) {
			$task_type_ids = explode(',',$task_type_id);
			foreach($task_type_ids as $id) {
				$tasktype_where[] = ' task_type_id = '.$id;
			}
			$where .= " AND ( ".implode(' OR ',$tasktype_where).") ";
		}
		
		if(strstr($created_by,',') || $created_by > 0) {
			$created_bys = explode(',',$created_by);
			foreach($created_bys as $id) {
				$created_by_where[] = ' t.created_by = '.$id;
			}
			$where .= " AND ( ".implode(' OR ',$created_by_where).") ";
		}
		
		/* if($_SESSION['user_type'] > 0 && $created_by) {
			$where .= " and t.created_by = ".$_SESSION['id'];
		} */
		
		//if($search != ''  ) {				
			$query = $db->prepare(" SELECT c.username as created_by, t.title, t.id, u.username, p.title as project_name, s.name as status_name, tt.name as task_name  FROM tasks t, users u,  status s, task_types tt, projects p, users c  where p.id = t.project_id and  c.id = t.created_by and u.id = t.assigned_to and s.id = t.status_id and tt.id = t.task_type_id ".$where);

			$query->execute();
			$rows = $query->rowCount();
		//}		
		$total_pages = ceil($rows/$items_per_page);
		$limit = ($page - 1 ) * $items_per_page;
		
		
		
		$query = $db->prepare("SELECT pr.name as priority_name, c.username as created_by, t.title, t.id, u.username, p.title as project_name, s.name as status_name, tt.name as task_name  FROM tasks t, users u,  status s, task_types tt, projects p, users c, priority pr  where p.id = t.project_id and  c.id = t.created_by and u.id = t.assigned_to and s.id = t.status_id and tt.id = t.task_type_id and pr.id = t.priority_id ".$where."  LIMIT $limit,$items_per_page");	
		
		
	
		
		$query->execute();
	    while($result = $query->fetch()) {
			//print_r( $result );
			$json_list[] = array( 
			'id' => $result['id'],
			'name' => $result['title'],
			'details' => $result['details'],
			'username' => $result['username'],
			'project_name' => $result['project_name'],
			'status_name' => $result['status_name'],
			'task_name' => $result['task_name'],
			'created_by' => $result['created_by'],
			'priority_name' => $result['priority_name']
			);
		}
		$response['nodata'] = "";
		if(empty($json_list)) {
			$response['nodata'] = "No Taks found";
		}
		$response['data'] = $json_list;
		
		$response['pagination']['total_rows'] = $rows;
		$response['pagination']['total_pages'] = $total_pages;	
	}
	echo Flight::json($response);
});

Flight::route('/getatask', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$id = isset($input->id)?$input->id:1;
		
		$query = $db->prepare(" SELECT t.priority_id, t.created_date, t.created_by, t.modified_date, t.modified_by, t.id,t.title, t.details, t.assigned_to, t.project_id, t.task_type_id, t.status_id, tt.name as task_type, s.name as status_name, u.username as assigned_name, p.title as project_name, cr.username as created_name, ed.username as edited_name  FROM tasks t, task_types tt, status s, users u, users cr, projects p, users ed, priority pr where pr.id = t.priority_id and t.id = $id and assigned_to = u.id and s.id = status_id and tt.id = task_type_id and p.id = project_id and cr.id = t.created_by and ed.id = t.modified_by");	
		
		$query->execute();
	    while($result = $query->fetch()) {
			//print_r( $result );
			$response['id']['value'] = $result['id'];		
			$response['title']['value'] = $result['title'];
			$response['details']['value'] = $result['details'];
			$response['assigned_to']['value'] = $result['assigned_to'];
			$response['project_id']['value'] = $result['project_id'];
			$response['task_type_id']['value'] = $result['task_type_id'];
			$response['status_id']['value'] = $result['status_id'];
			$response['created_date']['value'] = $result['created_date'];
			$response['edited_date']['value'] = $result['modified_date'];
			$response['created_by']['value'] = $result['created_by'];
			$response['edited_by']['value'] = $result['modified_by'];
			
			$response['task_type']['value'] = $result['task_type'];
			$response['status_name']['value'] = $result['status_name'];
			$response['assigned_name']['value'] = $result['assigned_name'];
			$response['project_name']['value'] = $result['project_name'];
			$response['created_name']['value'] = $result['created_name'];
			$response['edited_name']['value'] = $result['edited_name'];
			$response['priority_id']['value'] = $result['priority_id'];
			
			
		}
	}
	
	echo Flight::json($response);
});

Flight::route('/removetask', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		$id = $input->id;
		$query = $db->prepare(" delete FROM  tasks where id = $id");			
		$query->execute();
	}
	echo Flight::json($response);
});
Flight::route('/changetaskstatus', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		$id = $input->id;
		$status_id = $input->status;
		$query = $db->prepare(" UPDATE tasks SET status_id = $status_id where id = $id");			
		$query->execute();
		$response['success'] = 'Task Status updated successfully';
	}
	echo Flight::json($response);
});


/* User Roles Management */