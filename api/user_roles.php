<?php 
/* User Roles Management */
Flight::route('/create_userrole', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$name = $input->name;
		$page_url = $input->url;
		$role_key = $input->key;
		$is_public = $input->is_public;
		$id = $input->id;
		
		if($id) { //This form is for Edit
			if(empty($name) ) {
				$response['error'] = "All the fields are mandatory";
			} else {		
				$query = $db->prepare(" UPDATE roles SET name = '$name',page_url = '$page_url',role_key = '$role_key', is_public = '$is_public' where id = $id ");			
				$response['success'] = 'User Role Updated successfully';
				$query->execute();
			}
		} else { // This is for add
			
			if(empty($name) ) {
				$response['error'] = "All the fields are mandatory";
			} else {		
				$role_code = str_replace(' ','_',strtolower($name));
				$query = $db->prepare(" INSERT INTO roles(name,page_url,role_key,is_public) VALUES('$name','$page_url','$role_key','$is_public')");			
				$response['success'] = 'User Role Created successfully';
				$query->execute();
				$id = $db->lastInsertId();
				//whenever they insert a new role here, try to propogate this role to all the existing user types
				//with yes = 0
				$query2 = $db->prepare("  SELECT id FROM user_types  ");	
				$query2->execute();
				
				while($result = $query2->fetch()) {
					$query = $db->prepare(" INSERT INTO user_types_roles(user_types_id,roles_id,yes) VALUES('".$result['id']."','".$id."','0')");	
					$query->execute();
				}
			}
			
		}
		
	} exit;
	echo Flight::json($response);
});

Flight::route('/getuserroles', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		
		$page = isset($input->page)?$input->page:1;
		$search = isset($input->search)?$input->search:'';
		//$rows = isset($input->total_rows)?$input->total_rows:0;
		$items_per_page = isset($input->per_page)?$input->per_page:3;
		$where = '';
		if($search) {
			$where = " where ( name like '%$search%' OR name like '%$search%' )";
		}
		//if($search != ''  ) {				
			$query = $db->prepare(" SELECT id,name FROM roles ".$where);
			$query->execute();
			$rows = $query->rowCount();
		//}		
		$total_pages = ceil($rows/$items_per_page);
		$limit = ($page - 1 ) * $items_per_page;
		
		$query = $db->prepare("  SELECT id,name,role_key,page_url FROM roles  $where  LIMIT $limit,$items_per_page");	
	
		
		$query->execute();
	    while($result = $query->fetch()) {
			//print_r( $result );
			$json_list[] = array( 
			'id' => $result['id'],
			'name' => $result['name'],
			'page_url' => $result['page_url'],
			'role_key' => $result['role_key']
			);
		}
		$response['nodata'] = "";
		if(empty($json_list)) {
			$response['nodata'] = "No Roles found";
		}
		$response['data'] = $json_list;
		
		$response['pagination']['total_rows'] = $rows;
		$response['pagination']['total_pages'] = $total_pages;	
	}
	echo Flight::json($response);
});

Flight::route('/getauserrole', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$id = isset($input->id)?$input->id:1;
		
		$query = $db->prepare(" SELECT is_public,id,name,page_url,role_key FROM roles where id = $id");	
		
		$query->execute();
	    while($result = $query->fetch()) {
			//print_r( $result );
			$response['id'] = $result['id'];		
			$response['name'] = $result['name'];	
			$response['page_url'] = $result['page_url'];	
			$response['role_key'] = $result['role_key'];
			$response['is_public'] = $result['is_public'];			
		}
	}
	echo Flight::json($response);
});

Flight::route('/removeuserrole', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		$id = $input->id;
		$query = $db->prepare(" delete FROM  roles where id = $id");			
		$query->execute();
	}
	echo Flight::json($response);
});

Flight::route('/getrolegroup', function() {
	global $db,$input;
	$json_list = array();
	if( !isAuth() ) {		
		$json_list['error'] = "You are not authorised to see that page.";		
	} else {		
		$query = $db->prepare(" select * FROM  roles_groups ");			
		$query->execute();
	}
	while($result = $query->fetch()) {
		//print_r( $result );
		$json_list[] = array('id' => $result['id'],'label' => $result['label'],'name' => $result['name']);
							
	}
	$response['data'] = $json_list;
	echo Flight::json($response);
});

function get_roles($user_types_id = '') {
	global $db,$input;
	
	$where = '';
	if($_SESSION['user_type'] != 0 ) {
		$where = " and is_public = 1";
	}
	
	if($user_types_id) {
		$query = $db->prepare(" SELECT role_key, id,name,yes, roles_group_id FROM user_types_roles RIGHT JOIN roles ON roles_id = id where ( user_types_id = $user_types_id OR user_types_id IS NULL )  $where ");
		$query->execute();
		if($query->rowCount() == 0 ) {
			$query = $db->prepare(" SELECT role_key, id,name, '0' as yes,roles_group_id FROM roles where 1  $where");		
			$query->execute();
		}
	} else {
		$query = $db->prepare(" SELECT role_key, id,name, '0' as yes, roles_group_id FROM roles");
		$query->execute();	
	}
	
	while($result = $query->fetch()) {
		//print_r( $result );
		$response[$result['roles_group_id']][] = array('id' => $result['id'],'name' => $result['name'],'yes' => is_null($result['yes'])?0:$result['yes']);
							
	}
	return $response;
}

/* User Roles Management */