'use strict';

/* Controllers */

angular.module('UserManagment.controllers').
 controller('ProjectsController', ['$scope','$location','$routeParams','$cacheFactory','$filter','$translate','ProjectsServices','Validationservice','Storageservices','$route','GeneralServices','UserServices',function( $scope, $location, $routeParams,$cacheFactory, $filter, $translate, ProjectsServices,Validationservice,Storageservices,$route,GeneralServices,UserServices) {
	

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
		$scope.teams = new Array;
		
		
		var temp_id = (typeof $routeParams.id != 'undefined')?$routeParams.id:'';
		$scope.fields = (temp_id)?btfieldManager('edit_project'):btfieldManager('create_project');	
		$scope.fields.id = {value:temp_id};	
		$scope.autosug = {};
		//console.log($scope);
		
	}
		
	/* To get a user for editing purpose */
	$scope.getaproject = function() {
	
		if( $scope.fields.id.value > 0 ) {
			ProjectsServices.getAProject({id:$scope.fields.id.value},
				function(data){
					if( data.error ) {
						$scope.response.error = data.error;					
					} else {	
						$scope.fields.title.value =  data.title;
						$scope.fields.description.value =  data.description;
						
					}
			}, function(data){
			});
		}
	}
	
	$scope.viewproject = function() {
	
		if( $scope.fields.id.value > 0 ) {
			ProjectsServices.getAProject({id:$scope.fields.id.value},
				function(data){
					if( data.error ) {
						$scope.response.error = data.error;					
					} else {	
						$scope.project =  data;
					}
			}, function(data){
			});
		}
	}
	
	
	$scope.getassignees = function() {	
		if( $scope.fields.id.value > 0 ) {
			ProjectsServices.getassignees({id:$scope.fields.id.value},
				function(data){
					if( data.error ) {
						$scope.response.error = data.error;					
					} else {	
						$scope.teams =  data.data;
						
						
					}
			}, function(data){
			});
		}
	}
	
	$scope.gettasksbystatus = function() {	
		if( $scope.fields.id.value > 0 ) {
			ProjectsServices.gettasksbystatus({id:$scope.fields.id.value},
				function(data){
					if( data.error ) {
						$scope.response.error = data.error;					
					} else {	
						$scope.projectbystatusdata =  data;
						
						
					}
			}, function(data){
			});
		}
	}
	
	
	
	$scope.removeAssign = function(project_id, assign_id) {
		
		ProjectsServices.removeassign({project_id:project_id,assign_id:assign_id},
				function(data){
					if( data.error ) {
						$scope.response.error = data.error;					
					} else {	
						$scope.teams =  data.data;
						
						
					}
			}, function(data){
			});
	}
	/* To get a user for editing purpose */
	
	/* To Add a user */
	$scope.addProject = function() {	
		//Do not run further if there is some error
		if( typeof $scope.response.error != 'undefined' &&  $scope.response.error != '') return;		
		
		Validationservice.setup($scope.fields, $scope);		
		
		if( Validationservice.validate() > 0 ) { //If any error
			$scope.response.error = Validationservice.showError();			
		} else { //Process the error
			ProjectsServices.Add($scope.fields).
			success(function(data){
				if( data.error ) {
					$scope.response.error = data.error;
					//$location.path('/login');
				} else {
					$scope.response.success = data.success;
					$location.path('/'+$scope.pages.LIST_PROJECT+'/1');
				}
			}).error(function(data){
			});
		}
	}
		
	$scope.listProjects = function(per_page,assigned_to,created_by)
	{		
		$scope.spaginate = {};
		//This is used to compose the URL for the fields in the list header
		$scope.spaginate.page = (typeof $routeParams.page != 'undefined')?$routeParams.page:1;
		
		$scope.spaginate.per_page = (typeof $location.search().per_page != 'undefined')?$location.search().per_page:3;
		$scope.spaginate.search = $location.search().search;
		$scope.spaginate.user_type = $location.search().user_type;
		
		$scope.spaginate.urls = GeneralServices.getUrl({per_page:$scope.spaginate.per_page,search:$scope.spaginate.search,user_type:$scope.spaginate.user_type});
		
		//override the per page here
		if(typeof per_page != 'undefined') {
			$scope.spaginate.per_page = per_page;
		}
		
		//override the assigned to here
		if(typeof assigned_to != 'undefined') {
			$scope.spaginate.assigned_to = assigned_to;
		}
		
		//override the assigned to here
		if(typeof created_by != 'undefined') {
			$scope.spaginate.created_by = created_by;
		}
		
		
		
		ProjectsServices.getProjects($scope.spaginate, function(response) {	  
			$scope.projects = response.data;
			$scope.nodata = response.nodata;	
			$scope.spaginate.total_rows = response.pagination.total_rows;
			$scope.spaginate.total_pages = response.pagination.total_pages;				
			$scope.spaginate.pageurl = $scope.pages.LIST_PROJECT;		
		}, function() {
		
		} );
	}
	
	$scope.change_perpage = function() {		
		$scope.reloadPage();
	}
	
	
	$scope.search = function() {
		if( $scope.spaginate.search == '' ) {
			$scope.response.error = "Please fill in some search query";
		} else {
			$scope.reloadPage();
		}
	}
	
	$scope.reset = function() {
		$scope.spaginate.search = '';
		$scope.reloadPage();
	}
	
	$scope.cancel = function() {
		$location.path('/'+$scope.pages.LIST_PROJECT+'/1');
	}
	
	$scope.reloadPage = function() {
		var urls = GeneralServices.getUrl({per_page:$scope.spaginate.per_page,search:$scope.spaginate.search,user_type:$scope.spaginate.user_type});
		$location.path('/'+$scope.pages.LIST_PROJECT+'/1').search(urls);
	}
	
	$scope.assign_click = function(data) {			
		$scope.teams = data;
	}
	
	$scope.upload_asset = function(form_id,post_id, post_type) {
		GeneralServices.upload({form:form_id,post_id:post_id, post_type: post_type});
	}
	
	$scope.getattachments = function(type) {	
		console.log('$scope.fields',$scope.fields);
		$scope.parentattachments(type,$scope.fields.id.value);
	}
	


  }]);
