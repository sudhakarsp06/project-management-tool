'use strict';

/* Controllers */

angular.module('UserManagment.controllers').
 controller('TaskmanagerController', ['$scope','$location','$routeParams','$cacheFactory','$filter','$translate','TaskServices','Validationservice','Storageservices','$route','GeneralServices','ProjectsServices','StatusServices','UserServices','TasktypeServices','PriorityServices',function( $scope, $location, $routeParams,$cacheFactory, $filter, $translate, TaskServices,Validationservice,Storageservices,$route,GeneralServices,ProjectsServices,StatusServices,UserServices,TasktypeServices,PriorityServices) {
	
	
	//Setting the auth error into the scope from translate
	$translate('AUTH_ERROR').then(function (error) {
		$scope.authentic_error = error.not_auth;
	});
	
	//If not auth, redirect them to the login page
	if(!$scope.auth.loggedin) {
		$scope.response.error = $scope.authentic_error;
		$location.path('/login');
	}
	
	$scope.init = function() {	
		
		$scope.fields =   {};	
		var temp_id = (typeof $routeParams.id != 'undefined')?$routeParams.id:'';
		$scope.fields = (temp_id)?btfieldManager('edit_task'):btfieldManager('create_task');	
		$scope.fields.id = {value:temp_id};	
		console.log('$scope.fields.id',$scope.fields.id);
		
	}
	
	
	$scope.getatask = function() {
		if( $scope.fields.id.value > 0 ) {
			TaskServices.getATask({id:$scope.fields.id.value},
				function(data){
					if( data.error ) {
						$scope.response.error = data.error;					
					} else {				
						$scope.fields =  data;
					}
			}, function(data){
			});
		}
	}
	
	$scope.viewtask = function() {
		if( $scope.fields.id.value > 0 ) {
			TaskServices.getATask({id:$scope.fields.id.value},
				function(data){
					if( data.error ) {
										
					} else {				
						$scope.task = data;	
						$scope.current_status = data.status_id.value;
						$scope.post_id = $scope.task.id.value;
						$scope.post_type = 'task';
						
					}
			}, function(data){
			});
		}
	}
	
	$scope.changestatus = function() {
		TaskServices.changeStatus({id:$scope.fields.id.value,status:$scope.current_status},
				function(data){
					if( data.error ) {
						$scope.response.error = data.error;					
					} else {				
						$scope.response.success =  data.success;
					}
			}, function(data){
		});
	}
	
	
	/* To get a user type for editing purpose */
	$scope.gettasks = function() {
		if( $scope.fields.id.value > 0 ) {
			TaskServices.gettasks({id:$scope.fields.id.value},
				function(data){
					if( data.error ) {
						$scope.response.error = data.error;					
					} else {				
						$scope.fields.name.value =  data.name;
					}
			}, function(data){
			});
		}
	}
	/* To get a user for editing purpose */
	
	/* Get all projects */	
	$scope.getprojects = function() {
		ProjectsServices.getProjects({}, function(data) {
			$scope.projects = data.data; //success
		}, function(data) {
		});
	}	
	/* Get all projects */
	
	/* Get all Status */	
	$scope.getstatuss = function() {
		StatusServices.getStatuses({}, function(data) {
			$scope.statuss = data.data; //success
		}, function(data) {
		});
	}	
	/* Get all Status */
	
	/* Get all Status */	
	$scope.getprioritys = function() {
		PriorityServices.getallprioritys({}, function(data) {
			$scope.prioritys = data.data; //success
		}, function(data) {
		});
	}	
	/* Get all Status */
	
	/* Get all Users */	
	$scope.getusers = function() {
		UserServices.getUsers({nolimit:'1'}, function(data) {
			$scope.users = data.data; //success
		}, function(data) {
		});
	}	
	/* Get all Users */
	
	/* Get all Task Type */	
	$scope.gettasktypes = function() {
		TasktypeServices.getTaskTypes({}, function(data) {
			$scope.tasktypes = data.data; //success
		}, function(data) {
		});
	}	
	/* Get all Task Type */
	
	/* To Add a user */
	$scope.addtask = function() {	
		//Do not run further if there is some error
		if( typeof $scope.response.error != 'undefined' &&  $scope.response.error != '') return;		
		
		Validationservice.setup($scope.fields, $scope);		
		
		if( Validationservice.validate() > 0 ) { //If any error
			$scope.response.error = Validationservice.showError();			
		} else { //Process the error
			TaskServices.Add($scope.fields).
			success(function(data){
				if( data.error ) {
					$scope.response.error = data.error;
					//$location.path('/login');
				} else {
					$scope.response.success = '<p>'+data.success+'</p>';
					$location.path('/'+$scope.pages.LIST_TASK+'/1');
				}
			}).error(function(data){
			});
		}
	}
		
	$scope.listtasks = function(per_page,assigned_to,status_id,created_by)
	{		
		$scope.spaginate = {};
		//This is used to compose the URL for the fields in the list header
		$scope.spaginate.per_page = (typeof $location.search().per_page != 'undefined')?$location.search().per_page:3;
		
		
		
		$scope.spaginate.search = $location.search().search;
		
		$scope.spaginate.status_id = ($location.search().status_id)?$location.search().status_id:0;
		$scope.spaginate.project_id = ($location.search().project_id)?$location.search().project_id:0;
		$scope.spaginate.assigned_to = ($location.search().assigned_to)?$location.search().assigned_to:0;
		$scope.spaginate.created_by = ($location.search().created_by)?$location.search().created_by:0;
		$scope.spaginate.task_type_id = ($location.search().task_type_id)?$location.search().task_type_id:0;
		$scope.spaginate.priority_id = ($location.search().priority_id)?$location.search().priority_id:0;
		
		$scope.spaginate.page = (typeof $routeParams.page != 'undefined')?$routeParams.page:1;
		$scope.spaginate.urls = GeneralServices.getUrl({per_page:$scope.spaginate.per_page,search:$scope.spaginate.search});
		
		//override the per page here
		if(typeof per_page != 'undefined') {
			$scope.spaginate.per_page = per_page;
		}
		
		//override the assigned to here
		if(typeof assigned_to != 'undefined') {
			$scope.spaginate.assigned_to = assigned_to;
		}
		
		//override the status id here
		if(typeof status_id != 'undefined') {
			$scope.spaginate.status_id = status_id;
		}
		
		//override the status id here
		if(typeof priority_id != 'undefined') {
			$scope.spaginate.priority_id = priority_id;
		}
		
		//override the status id here
		if(typeof created_by != 'undefined') {
			$scope.spaginate.created_by = created_by;
		}
		
		
		TaskServices.gettasks($scope.spaginate, function(response) {	  
			$scope.user_lists = response.data;	
			$scope.nodata = response.nodata;	
			$scope.spaginate.total_rows = response.pagination.total_rows;
			$scope.spaginate.total_pages = response.pagination.total_pages;				
			$scope.spaginate.pageurl = $scope.pages.LIST_TASK;		
		}, function() {
		
		} );
	}
	
	$scope.change_perpage = function() {	
		$scope.reloadPage();
	}
	
	$scope.search = function() {
		//console.log('$scope.spaginate',$scope.spaginate);
		if( $scope.spaginate.search == ''  ) {
			$scope.response.error = "Please fill in some search query";
		} else {
			$scope.reloadPage();
		}
	}
	
	$scope.reset = function() {
		$scope.spaginate.search = '';
		$scope.spaginate.status_id = 0;
		$scope.spaginate.project_id = 0;
		$scope.spaginate.assigned_to = 0;
		$scope.spaginate.task_type_id = 0;
		$scope.spaginate.priority_id = 0;
		
		$scope.reloadPage();
	}
	
	$scope.removeTask = function(id) {
		TaskServices.removeTask({id:id}, function(response) {
			if(response.error) {
				$scope.response.error = response.error;
			} else {
				//$scope.reloadPage();
				$scope.cancel();
			}
		}, function() {		
		} );
	}
	
	$scope.cancel = function() {
		$location.path('/'+$scope.pages.LIST_TASK+'/1');
	}
	
	$scope.reloadPage = function() {
		var params = {per_page:$scope.spaginate.per_page,search:$scope.spaginate.search};
		//console.log('$scope.spaginate',$scope.spaginate);
		var tmp = [];
		/* Status Section */
		for(var i = 0; i< $('input[name="status_id[]"]').length;i++) {
			if($('input[name="status_id[]"]')[i].checked == true ) {
				tmp.push($('input[name="status_id[]"]')[i].value);
			}
			
		}		
		if(tmp != '' ) {
			params.status_id = $scope.spaginate.status_id = tmp.join(',');
		}
		/* Status Section */
		
		/* Priority Section */
		tmp = [];
		for(var i = 0; i< $('input[name="priority_id[]"]').length;i++) {
			if($('input[name="priority_id[]"]')[i].checked == true ) {
				tmp.push($('input[name="priority_id[]"]')[i].value);
			}
			
		}		
		if(tmp != '' ) {
			params.priority_id = $scope.spaginate.priority_id = tmp.join(',');
		}
		/* Priority Section */
		
		/* Project Section */
		tmp = [];
		for(var i = 0; i< $('input[name="project_id[]"]').length;i++) {
			if($('input[name="project_id[]"]')[i].checked == true ) {
				tmp.push($('input[name="project_id[]"]')[i].value);
			}
			
		}		
		if(tmp != '' ) {
			params.project_id = $scope.spaginate.project_id = tmp.join(',');
		}
		/* Project Section */
		
		/* Assignee Section */
		tmp = [];
		for(var i = 0; i< $('input[name="user_id[]"]').length;i++) {
			if($('input[name="user_id[]"]')[i].checked == true ) {
				tmp.push($('input[name="user_id[]"]')[i].value);
			}
			
		}		
		if(tmp != '' ) {
			params.assigned_to = $scope.spaginate.assigned_to = tmp.join(',');
		}
		/* Assignee Section */
		
		/* Created Section */
		tmp = [];
		for(var i = 0; i< $('input[name="created_id[]"]').length;i++) {
			if($('input[name="created_id[]"]')[i].checked == true ) {
				tmp.push($('input[name="created_id[]"]')[i].value);
			}
			
		}		
		if(tmp != '' ) {
			params.created_by = $scope.spaginate.created_by = tmp.join(',');
		}
		/* Created Section */
		
		/* Task Type Section */
		tmp = [];
		for(var i = 0; i< $('input[name="tasktype_id[]"]').length;i++) {
			if($('input[name="tasktype_id[]"]')[i].checked == true ) {
				tmp.push($('input[name="tasktype_id[]"]')[i].value);
			}
			
		}		
		if(tmp != '' ) {
			params.task_type_id = $scope.spaginate.task_type_id = tmp.join(',');
		}
		/* Task Type Section */
		
		
		/* if( $scope.spaginate.status_id != '' ) {
			params.status_id = $scope.spaginate.status_id;
		} 
		
		if( $scope.spaginate.priority_id != '' ) {
			params.priority_id = $scope.spaginate.priority_id;
		}
		
		if( $scope.spaginate.project_id != '' ) {
			params.project_id = $scope.spaginate.project_id;
		}
		
		if( $scope.spaginate.assigned_to != '' ) {
			params.assigned_to = $scope.spaginate.assigned_to;
		}
		
		if( $scope.spaginate.created_by != '' ) {
			params.created_by = $scope.spaginate.created_by;
		}
		
		
		if( $scope.spaginate.task_type_id != '' ) {
			params.task_type_id = $scope.spaginate.task_type_id;
		}
		
		*/
		
		
		
		
		
		
		
		
		var urls = GeneralServices.getUrl(params);
		$location.path('/'+$scope.pages.LIST_TASK+'/1').search(urls);
	}
	
	$scope.getattachments = function(type) {	
		$scope.parentattachments(type,$scope.fields.id.value);
	}

  }]);
