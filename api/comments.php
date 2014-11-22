<?php 
/* User Roles Management */
Flight::route('/create_comment', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$comment = addslashes($input->comment);		
		$post_type = addslashes($input->post_type);	
		$post_id = $input->post_id;	
		
		$id = isset($input->id)?$input->id:'';
		
		if($id) { //This form is for Edit
			if( empty($comment)  ) {
				$response['error'] = "All the fields are mandatory";
			} else {		
				$query = $db->prepare(" UPDATE comments SET comment = '$comment' edited_by = '".$_SESSION['id']."', edited_date = '".date('Y-m-d')."' where id = $id ");			
				$response['success'] = 'Comment Updated successfully';
				$query->execute();
			}
		} else { // This is for add
			
			if(empty($comment)  ) {
				$response['error'] = "All the fields are mandatory";
			} else {						
				$query = $db->prepare(" INSERT INTO comments(post_id,comment,post_type,created_by,created_date,edited_by,edited_date) VALUES('$post_id','$comment','$post_type','".$_SESSION['id']."','".date('Y-m-d')."','".$_SESSION['id']."','".date('Y-m-d')."')");			
				$response['success'] = 'Comment Created successfully';
				$query->execute();
				$id = $db->lastInsertId();
				
				$time = time();
				$log = $_SESSION['username'].' commented on '.date('l jS \of F Y',$time);
				$activity_type = ACTIVITY_LOG_COMMENT;
				log_activity($post_id, $post_type, $log,$time,$activity_type);
				
				//whenever they insert a new role here, try to propogate this role to all the existing user types
				//with yes = 0
				
			}
			
		}
		
	}
	echo Flight::json($response);
});

Flight::route('/getcomments', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		
		$post_id = isset($input->post_id)?$input->post_id:'';
		$post_type = isset($input->post_id)?$input->post_type:'';
		//$rows = isset($input->total_rows)?$input->total_rows:0;
		$items_per_page = isset($input->per_page)?$input->per_page:3;
		
		
		//if($search != ''  ) {				
		$query = $db->prepare(" SELECT c.created_date, c.edited_date,c.comment, c.id, u.username as created_user, e.username as edited_user FROM comments c, users u,users e where u.id = c.created_by and e.id = c.edited_by and c.post_type = '$post_type' and post_id = '$post_id' order by id desc ");
		$query->execute();
		/* $rows = $query->rowCount();
		//}		
		$total_pages = ceil($rows/$items_per_page);
		$limit = ($page - 1 ) * $items_per_page;
		
		$query = $db->prepare("SELECT c.created_date, c.edited_date, c.comment, c.id, u.username as created_user, e.username as edited_user FROM comments c, users u,users e where u.id = c.created_by and e.id = c.edited_by and c.post_type = '$post_type' and post_id = '$post_id'  ".$where."  LIMIT $limit,$items_per_page");	
	
		
		$query->execute(); */
		$json_list = '';
	    while($result = $query->fetch()) {
			//print_r( $result );
			$json_list[] = array( 
			'id' => $result['id'],
			'comment' => $result['comment'],
			'created_user' => $result['created_user'],
			'edited_user' => $result['edited_user'],
			'created_date' => $result['created_date'],
			'edited_date' => $result['edited_date']
			);
		}
		$response['nodata'] = "";
		if(empty($json_list)) {
			$response['nodata'] = "No Comments found";
		}
		$response['data'] = $json_list;
		
		//$response['pagination']['total_rows'] = $rows;
		//$response['pagination']['total_pages'] = $total_pages;	
	}
	echo Flight::json($response);
});

Flight::route('/getacomment', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$id = isset($input->id)?$input->id:1;
		
		$query = $db->prepare(" SELECT c.comment, c.id, u.username as created_user, e.username as edited_user FROM comments c, users u,users e where u.id = c.created_by and e.id = c.edited_by and  c.id = '$id' ");	
		
		$query->execute();
	    while($result = $query->fetch()) {
			//print_r( $result );
			$response['id'] = $result['id'];
			$response['comment'] = $result['comment'];
			$response['edited_user'] = $result['edited_user'];
			$response['created_user'] = $result['created_user'];
			
		}
	}
	
	echo Flight::json($response);
});

Flight::route('/removecomment', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		$id = $input->id;
		$query = $db->prepare(" delete FROM  comments where id = $id");			
		$query->execute();
	}
	echo Flight::json($response);
});
/* User Roles Management */