<?php
session_start();
include '../includes/config.php';
require 'flight/Flight.php';

error_reporting(E_ALL | E_NOTICE );
/* Flight::register('db', 'PDO', array('mysql:host='.SQL_HOST.';dbname='.SQL_DB.','.SQL_USERNAME.','.SQL_PASSWORD));
$db = Flight::db();
*/

$db = new PDO('mysql:host='.SQL_HOST.';dbname='.SQL_DB, SQL_USERNAME, SQL_PASSWORD);

$input = json_decode(file_get_contents('php://input'));

$current_user_details = array();



Flight::route('/userlogin', function(){
	global $db,$input;
   
	
	$email = $input->email;
	$password = $input->password;
	

	$query = $db->prepare(" SELECT user_type, username, id,  useremail as email FROM users WHERE useremail = '$email' AND password = '".md5($password)."'");
	
	$query->execute();
	$result = $query->fetch();
	$access = array();
	if($result['user_type'] > 0 ) { //For all the normal users
		$query = $db->prepare("SELECT page_url, yes, role_key
		FROM  `roles` r, user_types_roles ut
		WHERE r.id = ut.roles_id
		AND user_types_id = ".$result['user_type']);
		
		$query->execute();
		
		while($roles = $query->fetch()) {
			$access['access'][$roles['role_key']] = $roles['yes'];
			$access['reverse'][$roles['page_url']] = $roles['yes'];
		}
		
	} else { // For superadmin
		$query = $db->prepare("SELECT name, page_url, role_key, '1' as yes
		FROM  `roles` r");		
		$query->execute();
		while($roles = $query->fetch()) {
			$access['access'][$roles['role_key']] = $roles['yes'];
			$access['reverse'][$roles['page_url']] = $roles['yes'];
		}
	}
	//print_r( $roles ); exit;
	if( $result ) {
		$response =  array_merge($result,$access);				
		$response['token'] = session_id();
		$response['success'] = "Logged in successfully";
		$_SESSION['id'] = $result['id'];
		$_SESSION['user_type'] = $result['user_type'];
		$_SESSION['username'] = $result['username'];

		$query = $db->prepare(" INSERT INTO users_sessions(users_id, session_id, activity,logged,user_data ) VALUES('".$_SESSION['id']."','".$response['token']."','".date('Y-m-d h:i:s')."','".date('Y-m-d h:i:s')."','".json_encode(array_merge($result,$access))."')");			
		
		$query->execute();
	
		echo Flight::json($response);
	} else {
		
		$response['error'] = "Invalid login details";
		echo Flight::json($response);
	}
	
	
});

Flight::route('/getpages', function(){
	$response = getpages();
	echo Flight::json($response);
});


function getpages()
{
	global $db,$input;
   
	$response = array();
	$query = $db->prepare("SELECT name, page_url, role_key
		FROM  `roles` r");		
		$query->execute();
	while($roles = $query->fetch()) {
		$response[$roles['role_key']] = $roles['page_url'];
	}
	return $response;
	
}


function isAuth() {
	global $db, $input, $current_user_details;
	
	$bool = false;
	if(isset($_SERVER['HTTP_X_TOKEN'])) {
		$bool = (session_id() == $_SERVER['HTTP_X_TOKEN']);
	}
	if($bool) {
		$query = $db->prepare("SELECT user_data FROM users_sessions WHERE session_id = '".$_SERVER['HTTP_X_TOKEN']."'");
		$query->execute();		
		$result = $query->fetch();		
		$current_user_details = json_decode($result['user_data']);
		//Update the activity col of the session table
		$query = $db->prepare("UPDATE users_sessions SET activity = '".date('Y-m-d h:i:s')."' where session_id = '".$_SERVER['HTTP_X_TOKEN']."'");
		$query->execute();
	}
	return $bool;
}

function is_action_valid($roles_id, $user_types_id) {
	global $db,$input;
	if($user_types_id == 0 ) {
		return true;
	}
	$query = $db->prepare(" SELECT yes FROM user_types_roles ut, roles r where role_code = '$roles_id' and user_types_id = $user_types_id and  yes = '1' ");
	$query->execute();
	return !($query->rowCount() == 0 );
}


Flight::route('/create_user', function() {
	global $db,$input,$current_user_deails;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		
		$username = $input->username;
		$email = $input->email;
		$user_type = $input->user_type;
		$password = isset($input->password);
		$id = $input->id;
		
		if($id) { //This form is for Edit
			if(empty($username) || empty($email)) {
				$response['error'] = "All the fields are mandatory";
			} elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
				$response['error'] = "Please enter a valid email address";
			} else {		
				$query = $db->prepare(" UPDATE users SET username = '$username', useremail = '$email',  user_type = '$user_type', edited_by = ".$_SESSION['id'].", edited_date = '".date('Y-m-d')."' where id = $id ");			
				$response['success'] = 'User Updated successfully';
				$query->execute();
			}
		} else { // This is for add
			
			if(empty($username) || empty($email) || empty($password)) {
				$response['error'] = "All the fields are mandatory";
			} elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
				$response['error'] = "Please enter a valid email address";
			} else {		
				$query = $db->prepare(" INSERT INTO users(username, useremail, password, user_type,created_by,created_date) VALUES('$username','$email','".md5($password)."',".$user_type.",".$_SESSION['id'].",'".date('Y-m-d')."')");			
				$response['success'] = 'User Created successfully';
				$query->execute();
			}
			
		}
		
	}
	echo Flight::json($response);
});





Flight::route('/usertypes', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		$query = $db->prepare(" SELECT * FROM user_types");
		$query->execute();
	    while($result = $query->fetch()) {
			$json_list[] = array( 
			'id' => $result['id'],
			'name' => $result['type']
			);
		}
		$response['data'] = $json_list;
	}
	echo Flight::json($response);
});	

Flight::route('/isAuth',function() {
	$response['token'] =  session_id();
	echo Flight::json($response);
});

Flight::route('/logout',function() {
	global $db;
	//echo " DELETE FROM users_sessions WHERE session_id = '".$_SERVER['HTTP_X_TOKEN']."'";
	$query = $db->prepare(" DELETE FROM users_sessions WHERE session_id = '".$_SERVER['HTTP_X_TOKEN']."'");	
	$query->execute();
	session_regenerate_id();
	
});

Flight::route('/getusers', function() {
	global $db,$input,$current_user_details;
	if( !isAuth()  ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$page = isset($input->page)?$input->page:1;
		$search = isset($input->search)?$input->search:'';
		$user_type = isset($input->user_type)?$input->user_type:'';
		$nolimit = isset($input->nolimit)?$input->nolimit:0;
		//$rows = isset($input->total_rows)?$input->total_rows:0;
		$items_per_page = isset($input->per_page)?$input->per_page:3;
		$where = '';
		if($search) {
			$where = " and ( username like '%$search%' OR useremail like '%$search%' )";
		}
		
		if($user_type) {
			$where .= " and ut.id = $user_type ";
		}
		
		/* if($_SESSION['user_type'] > 0 ) {
			$where .= " and u.created_by = ".$_SESSION['id'];
		} */

		//if($search != ''  ) {				
			$query = $db->prepare(" SELECT u.id, username, useremail,type FROM users u , user_types ut WHERE superadmin = 0 and  ut.id = u.user_type ".$where);
			
			$query->execute();
			$rows = $query->rowCount();
		//}		
		$total_pages = ceil($rows/$items_per_page);
		$limit = ($page - 1 ) * $items_per_page;
		$sql = " SELECT u.id, username, useremail,type FROM users u , user_types ut WHERE superadmin = 0 and  ut.id = u.user_type $where";
		if(!$nolimit) {
			$sql .= "  LIMIT $limit,$items_per_page";
		}
		$query = $db->prepare($sql);	
	
		
		$query->execute();
	    while($result = $query->fetch()) {
			//print_r( $result );
			$json_list[] = array( 
			'id' => $result['id'],
			'useremail' => $result['useremail'],
			'name' => $result['username'],
			'type' => $result['type'],
			);
		}
		$response['nodata'] = "";
		if(empty($json_list)) {
			$response['nodata'] = "No users found";
		}
		$response['data'] = $json_list;
	
		$response['q'] = " SELECT yes FROM user_types_roles ut, roles r where role_code = 'user_list' and user_types_id = ". $current_user_details->user_type." and  yes = '1' ";
		$response['pagination']['total_rows'] = $rows;
		$response['pagination']['total_pages'] = $total_pages;	
	}
	echo Flight::json($response);
});



Flight::route('/removeuser', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		$id = $input->id;
		$query = $db->prepare(" delete FROM  users where id = $id");			
		$query->execute();
	}
});

Flight::route('/getauser', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$id = isset($input->id)?$input->id:1;
		
		$query = $db->prepare(" SELECT u.id, ut.id as type_id, username, useremail,type FROM users u , user_types ut WHERE superadmin = 0 and  ut.id = u.user_type and u.id = $id");	
		
		
		$query->execute();
	    while($result = $query->fetch()) {
			//print_r( $result );
			$response['email'] = $result['useremail'];		
			$response['username'] = $result['username'];		
			$response['type'] = $result['type_id'];		
			
		}
		//$response['data'] = $json_list;
		
		//$response['pagination']['total_rows'] = $rows;
		//$response['pagination']['total_pages'] = $total_pages;	
	}
	echo Flight::json($response);
});



Flight::route('/lookup', function(){
	global $db,$input;
   
	
	$field = $input->field;
	$table = $input->table;
	$value = $input->value;
	$id = $input->id;
	$where = "";
	if($id > 0 ) {
		$where = " and id != $id";
	}
	
	$query = $db->prepare(" SELECT $field FROM $table WHERE $field = '$value'".$where);
	//echo " SELECT $field FROM $table WHERE $field = '$value'"; exit;
	
	$query->execute();
	$result = $query->fetch();
	//print_r( $result ); exit;
	if( $result ) {		
		$response['available'] = 0;	
		$response['notavailable'] = 1;
$response['message'] = 'Email ID not avaible';			
		echo Flight::json($response);
	} else {
		
		$response['available'] = 1;	
		$response['notavailable'] = 0;
$response['message'] = '';				
		echo Flight::json($response);
	}
	
	
});


/* User Types Management */
Flight::route('/create_usertype', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$name = $input->name;
		$id = $input->id;
		$roles = $input->roles;
		if($id) { //This form is for Edit
			if(empty($name) ) {
				$response['error'] = "All the fields are mandatory";
			} else {		
				$query = $db->prepare(" UPDATE user_types SET type = '$name', edited_by = ".$_SESSION['id'].", edited_date = '".date('Y-m-d')."' where id = $id ");			
				$response['success'] = 'User Type Updated successfully';
				$query->execute();
				
				$query = $db->prepare("DELETE FROM user_types_roles where user_types_id = $id ");
				$query->execute();	
				for($i=1;$i<count($roles);$i++) {					
					$query = $db->prepare("INSERT INTO user_types_roles(user_types_id,roles_id,yes) VALUES($id,$i,".$roles[$i].")");
					$query->execute();	
				}
			}
		} else { // This is for add
			
			if(empty($name) ) {
				$response['error'] = "All the fields are mandatory";
			} else {
							
				//print_r($roles); exit;
				$query = $db->prepare(" INSERT INTO user_types(type,created_by,created_date) VALUES('$name',".$_SESSION['id'].",'".date('Y-m-d')."')");
				$query->execute();				
				$id = $db->lastInsertId();
				for($i=1;$i<count($roles);$i++) {
					$query = $db->prepare("INSERT INTO user_types_roles(user_types_id,roles_id,yes) VALUES($id,$i,".$roles[$i].")");
					$query->execute();			
				}
				$response['success'] = 'User Type Created successfully';
				
			}
			
		}
		
	}
	echo Flight::json($response);
});

Flight::route('/getuserstypes', function() {
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
			$where = " and  ( type like '%$search%' OR type like '%$search%' )";
		}
		
		if($_SESSION['user_type'] > 0) {
			$where .= " and created_by =  ".$_SESSION['id'];
		}
		
		if( $where ) {
			$where = ' where ' .$where;
		}
		//if($search != ''  ) {				
			$query = $db->prepare(" SELECT id,type FROM user_types ".$where);
			$query->execute();
			$rows = $query->rowCount();
		//}		
		$total_pages = ceil($rows/$items_per_page);
		$limit = ($page - 1 ) * $items_per_page;
		
		$query = $db->prepare("  SELECT id,type FROM user_types  $where  LIMIT $limit,$items_per_page");	
	
		
		$query->execute();
	    while($result = $query->fetch()) {
			//print_r( $result );
			$json_list[] = array( 
			'id' => $result['id'],
			'type' => $result['type']
			);
		}
		$response['nodata'] = "";
		if(empty($json_list)) {
			$response['nodata'] = "No users found";
		}
		$response['data'] = $json_list;
		
		$response['pagination']['total_rows'] = $rows;
		$response['pagination']['total_pages'] = $total_pages;	
	}
	echo Flight::json($response);
});

Flight::route('/getAuserType', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$id = isset($input->id)?$input->id:1;
		
		$query = $db->prepare(" SELECT id,type FROM user_types where id = $id");	
		
		
		$query->execute();
	    while($result = $query->fetch()) {
			//print_r( $result );
			$response['id'] = $result['id'];		
			$response['type'] = $result['type'];		
					
		}
		//$response['data'] = $json_list;
		
		//$response['pagination']['total_rows'] = $rows;
		//$response['pagination']['total_pages'] = $total_pages;	
	}
	echo Flight::json($response);
});

Flight::route('/removeusertype', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		$id = $input->id;
		$query = $db->prepare(" SELECT username FROM users WHERE user_type = '$id'");
	//echo " SELECT $field FROM $table WHERE $field = '$value'"; exit;
	
	$query->execute();
	$result = $query->fetch();
	//print_r($result); exit;
		if( $result ) {	
			$response['error'] = "You cannot remove this type as this is attached to users.";
		} else {
			$query = $db->prepare(" delete FROM  user_types where id = $id");
			$query = $db->prepare("DELETE FROM user_types_roles where user_types_id = $id ");			
			$query->execute();
		}
	}
	echo Flight::json($response);
});

Flight::route('/getrolesall', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		$user_types_id = isset($input->id)?$input->id:'';
		$response['data'] = get_roles($user_types_id);
	}
	echo Flight::json($response);
});



Flight::route('/auto_suggest', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		
		$field = isset($input->field)?$input->field:'username';
		$table = isset($input->table)?$input->table:'users';
		$project_id = isset($input->project_id)?$input->project_id:'';
		//$nolimit = isset($input->nolimit)?$input->nolimit:0;
		$search = $input->value;
		
		if($search) {
			$where = " $field like '$search%' and ";
		} 
		
		$query = $db->prepare("  SELECT id, username FROM $table u  where  $where id != ".$_SESSION['id']." and user_type > 0 and id NOT IN (select assign_id FROM projects_assign where project_id = $project_id ) ");	


		$query->execute();
	    while($result = $query->fetch()) {
			//print_r( $result );
			$json_list[] = array( 
			'id' => $result['id'],
			'name' => $result[$field]
			);
		}
		$response['nodata'] = "";
		if(empty($json_list)) {
			$response['nodata'] = "No users found";
		}
		$response['data'] = $json_list;
	}
	echo Flight::json($response);
});

function get_token() {
return md5(substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, rand(1,10)));

}

Flight::route('/uploadattachment', function() {
	global $db,$input;
	
	$id = $_GET['id'];
	$type = $_GET['type'];
	list(,$ext) = explode('.',$_FILES['myFile']['name']);
	$label = get_token().'.'.$ext;
	
	
	if(!is_dir('uploads/'.$type)) {
		mkdir('uploads/'.$type);
	}
	
	$destination = 'uploads/'.$type.'/'.$id;
	
	if(!is_dir($destination)) {
		mkdir($destination);
	}
	move_uploaded_file($_FILES['myFile']['tmp_name'],  $destination.'/'.$label);
	$mime_type = $_FILES['myFile']['type'];	
	
	
	$query = $db->prepare(" INSERT INTO attachments(post_id, post_type, name, label, created_date, created_by, edited_date, edited_by,mime_type) VALUES($id, '$type','".$_FILES['myFile']['name']."','$label','".date('Y-m-d')."','".$_SESSION['id']."','".date('Y-m-d')."','".$_SESSION['id']."','$mime_type') ");	
	$query->execute();
	$post_id = $db->lastInsertId();
	
	$time = time();
	$log = $_SESSION['username'].' uploaded a file "'.$_FILES['myFile']['name'].'" on '.date('l jS \of F Y',$time);
	$activity_type = ACTIVITY_LOG_UPLOAD;
	log_activity($id, $type, $log,$time,$activity_type);
	
	
	
	//$db->
	
	//echo Flight::json($response);
});



Flight::route('/getattachments', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		
		$id = isset($input->id)?$input->id:'';
		$type = isset($input->type)?$input->type:'';
		$response['nodata'] = "";
		$json_list = array();
		$json_list = get_all_attachments($id,$type);
		if(empty($json_list)) {
			$response['nodata'] = "No users found";
		}
		$response['data'] = $json_list ;
	}
	echo Flight::json($response);
});

Flight::route('/getactivitylog', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {		
		$post_id = isset($input->post_id)?$input->post_id:'';
		$post_type = isset($input->post_type)?$input->post_type:'';
		$response['nodata'] = "";
		$json_list = array();
		$json_list = get_all_logs($post_id,$post_type);
		if(empty($json_list)) {
			$response['nodata'] = "No activity found";
		}
		$response['data'] = $json_list;
	}
	echo Flight::json($response);
});

Flight::route('/getattachmenttoken', function() {
	global $db,$input;
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		$id = isset($input->id)?$input->id:'';
		$temp_token = $_SESSION['tmp_token'] = get_token();
		$response['data'] = HTTP_PATH . 'api/downloadattachment?token='.$temp_token.'&id='.$id;
	}
	echo Flight::json($response);
});

function log_activity($post_id, $post_type, $log,$time, $activity_type) {

global $db;

$query = $db->prepare(" INSERT INTO activity(post_id, post_type, log, updated,activity_type) VALUES($post_id, '$post_type','$log','".$time."','$activity_type')");
$query->execute();

}


Flight::route('/downloadattachment', function() {
	global $db,$input;
	$token = '';
	if(isset($_SESSION['tmp_token'])) {
		$token = $_SESSION['tmp_token'];
	}
	if( !isset($_SESSION['id']) || $_GET['token'] != $token ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {
		unset($_SESSION['tmp_token']);		
		$id = isset($_GET['id'])?$_GET['id']:'';
		
		//fetch the attach
		$query = $db->prepare(" SELECT * FROM attachments where id = $id");	
		$query->execute();
	    while($result = $query->fetch()) {
			//print_r( $result );
			$label = $result['label'];	
			$post_id = $result['post_id'];	
			$type = $result['post_type'];
			$mime_type = $result['mime_type'];
			$name = $result['name'];		
		}
		$file = 'uploads/'.$type.'/'.$post_id . '/' . $label; 
		$filename = 'uploads/'.$type.'/'.$post_id . '/' . $name; 
		
		ob_clean();
		header('Content-Description: File Transfer');
		header('Content-Type: '.$mime_type);
		header('Content-Disposition: attachment; filename='.basename($filename));
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($file));
		ob_clean();
		flush();
		readfile($file);
		exit;
		
		
	}
	echo Flight::json($response);
});


Flight::route('/removeaattachment', function() {
	global $db,$input;
	$response = array();
	if( !isAuth() ) {		
		$response['error'] = "You are not authorised to see that page.";		
	} else {		
		$id = isset($input->id)?$input->id:'';
		
		//Get all the type and id
		$query = $db->prepare(" SELECT * FROM attachments WHERE id = $id ");
	//echo " SELECT $field FROM $table WHERE $field = '$value'"; exit;
	
	$query->execute();
	$result = $query->fetch();

		
		$type = $result['post_type'];
		$post_id = $result['post_id'];
		$label = $result['label'];
		$name = $result['name'];
		unlink('uploads/'.$type.'/'.$post_id . '/'.$label);
		$query = $db->prepare(" DELETE FROM attachments where id = $id LIMIT 1 ");	
		$query->execute();		
		
		$time = time();
		$log = $_SESSION['username'].' removed file name '.$name.' on '.date('l jS \of F Y',	$time);
		$activity_type = ACTIVITY_LOG_REMOVE_UPLOAD;
		log_activity($post_id, $type, $log, $time, $activity_type);
	}
	echo Flight::json($response);
});


function get_all_logs($post_id, $post_type) {

	global $db;
	
	
	$query = $db->prepare("  SELECT log FROM activity where post_id = $post_id and post_type =  '$post_type' order by updated desc ");
	$query->execute();
	$json_list = '';
	while($result = $query->fetch()) {
		//print_r( $result );
		$json_list[] = array( 
		'log' => $result['log'],	
		);
	}
	
	return $json_list;

}

function get_all_attachments($id,$type,$post_id = '') {

	global $db;
	$where = '';
	if($post_id) {
		$where = ' and id = $post_id';
	}	
	//echo "  SELECT * FROM task_attachments where post_id = $id and post_type =  '$type' $where"; exit;
	$query = $db->prepare("  SELECT * FROM attachments where post_id = $id and post_type =  '$type' $where");
	$query->execute();
	$json_list = '';
	while($result = $query->fetch()) {
		//print_r( $result );
		$json_list[] = array( 
		'id' => $result['id'],
		'name' => $result['name'],
		'label' => $result['label']
		);
	}
	return $json_list;
}

/* User Types Management */

include 'user_roles.php';
include 'projects.php';
include 'tasktypes.php';
include 'status.php';
include 'tasks.php';
include 'comments.php';
include 'priority.php';
include 'milestone.php';



Flight::start();
?>
