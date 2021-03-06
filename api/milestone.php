<?php 
/* User Roles Management */
Flight::route('/create_milestone', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$name = $input->name;
		$start_date = $input->start_date;		
		$end_date = $input->end_date;
		$id = isset($input->id)?$input->id:'';
		
		if($id) { //This form is for Edit
			if(empty($name) ) {
				$response['error'] = "All the fields are mandatory";
			} else {		
				$query = $db->prepare(" UPDATE milestones SET name = '$name', edited_by = ".$_SESSION['id'].", edited_date = '".date('Y-m-d')."', start_date = '$start_date', end_date = '$end_date' where id = $id ");			
				$response['success'] = 'Milestone Updated successfully';
				$query->execute();
			}
		} else { // This is for add
			
			if(empty($name) ) {
				$response['error'] = "All the fields are mandatory";
			} else {						
				$query = $db->prepare(" INSERT INTO milestones(name,created_date, created_by,start_date,end_date) VALUES('$name','".date('Y-m-d')."',".$_SESSION['id'].",'$start_date','$end_date')");			
				$response['success'] = 'Milestone Created successfully';
				$query->execute();
				$id = $db->lastInsertId();
				//whenever they insert a new role here, try to propogate this role to all the existing user types
				//with yes = 0
				
			}
			
		}
		
	}
	echo Flight::json($response);
});

Flight::route('/getmilestones', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		
		$page = isset($input->page)?$input->page:1;
		$search = isset($input->search)?$input->search:'';
		//$rows = isset($input->total_rows)?$input->total_rows:0;
		$items_per_page = isset($input->per_page)?$input->per_page:3;
		$nolimit = isset($input->nolimit)?$input->nolimit:0;
		
		$where = array();
		if($search) {
			$where[] = "  ( name like '%$search%' OR name like '%$search%' )";
		}
		
		if($_SESSION['user_type'] > 0) {
			$where[] = "  ( created_by = 0 or created_by = ".$_SESSION['id'].")";
		}
		
		if($where) {
			$where = ' where '.implode(' and ',$where);
		}
		//if($search != ''  ) {				
			$query = $db->prepare(" SELECT id,name,created_by, start_date, end_date FROM milestones ".$where);
			$query->execute();
			$rows = $query->rowCount();
		//}		
		$total_pages = ceil($rows/$items_per_page);
		$limit = ($page - 1 ) * $items_per_page;
		
		$sql = " SELECT id,name,created_by, start_date, end_date FROM milestones  $where ";
		if(!$nolimit) {
			$sql .= " LIMIT $limit,$items_per_page ";
		}
		$query = $db->prepare($sql);	
	
		
		$query->execute();
	    while($result = $query->fetch()) {
			//print_r( $result );
			$json_list[] = array( 
			'id' => $result['id'],
			'name' => $result['name'],
			'created_by' => $result['created_by'],
			'start_date' => $result['start_date'],
			'end_date' => $result['end_date']
			);
		}
		$response['nodata'] = "";
		if(empty($json_list)) {
			$response['nodata'] = "No Milestones found";
		}
		$response['data'] = $json_list;
		
		$response['pagination']['total_rows'] = $rows;
		$response['pagination']['total_pages'] = $total_pages;	
	}
	echo Flight::json($response);
});


Flight::route('/getAllMilestones', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
			
		$query = $db->prepare("  SELECT id,name  FROM milestones  ");	
		$query->execute();
		$json_list = '';
	    while($result = $query->fetch()) {
			//print_r( $result );
			$json_list[] = array( 
			'id' => $result['id'],
			'name' => $result['name']
			);
		}
		$response['nodata'] = "";
		if(empty($json_list)) {
			$response['nodata'] = "No Milestones found";
		}
		$response['data'] = $json_list;
		
	}
	echo Flight::json($response);
});



Flight::route('/getamilestone', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$id = isset($input->id)?$input->id:1;
		
		$query = $db->prepare(" SELECT id,name, start_date, end_date FROM milestones where id = $id");	
		
		$query->execute();
	    while($result = $query->fetch()) {
			//print_r( $result );
			$response['id'] = $result['id'];		
			$response['name'] = $result['name'];
			$response['start_date'] = $result['start_date'];			
			$response['end_date'] = $result['end_date'];
		}
	}
	echo Flight::json($response);
});

Flight::route('/removemilestones', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		$id = $input->id;
		$query = $db->prepare(" delete FROM milestones where id = $id");			
		$query->execute();
	}
	echo Flight::json($response);
});
/* User Roles Management */