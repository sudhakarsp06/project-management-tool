'use strict';

/* Controllers */

angular.module('UserManagment.controllers').
 controller('ProjectrmanagerController', ['$scope','$location','$routeParams','$cacheFactory','$filter','$translate','UserServices','Validationservice','Storageservices','$route','GeneralServices',function( $scope, $location, $routeParams,$cacheFactory, $filter, $translate, UserServices,Validationservice,Storageservices,$route,GeneralServices) {
	

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
		$scope.fields = (temp_id)?btfieldManager('edit_project'):btfieldManager('create_project');	
		$scope.fields.id = {value:temp_id};		
	}
	
	$scope.getusertypes = function() {
		UserServices.getUserTypes(function(response) {
			$scope.user_types = response.data;
		}, function(response) {
			$scope.response.error = response.error;
		});
	}
	
	/* To get a user for editing purpose */
	$scope.getauser = function() {
		if( $scope.fields.id.value > 0 ) {
			UserServices.getAUser({id:$scope.fields.id.value},
				function(data){
					if( data.error ) {
						$scope.response.error = data.error;					
					} else {				
						$scope.fields.username.value =  data.username;
						$scope.fields.email.value =  data.email;
						$scope.fields.user_type.value = data.type;					
					}
			}, function(data){
			});
		}
	}
	/* To get a user for editing purpose */
	
	/* To Add a user */
	$scope.addUser = function() {	
		//Do not run further if there is some error
		if( typeof $scope.response.error != 'undefined' &&  $scope.response.error != '') return;		
		
		Validationservice.setup($scope.fields, $scope);		
		
		if( Validationservice.validate() > 0 ) { //If any error
			$scope.response.error = Validationservice.showError();			
		} else { //Process the error
			UserServices.Add($scope.fields).
			success(function(data){
				if( data.error ) {
					$scope.response.error = data.error;
					//$location.path('/login');
				} else {
					$scope.response.success = data.success;
					$location.path('/list_user/1');
				}
			}).error(function(data){
			});
		}
	}
		
	$scope.listUser = function()
	{		
		$scope.spaginate = {};
		//This is used to compose the URL for the fields in the list header
		$scope.spaginate.page = (typeof $routeParams.page != 'undefined')?$routeParams.page:1;
		
		$scope.spaginate.per_page = (typeof $location.search().per_page != 'undefined')?$location.search().per_page:3;
		$scope.spaginate.search = $location.search().search;
		$scope.spaginate.user_type = $location.search().user_type;
		
		console.log('$scope.spaginate',$scope.spaginate);
		$scope.spaginate.urls = GeneralServices.getUrl({per_page:$scope.spaginate.per_page,search:$scope.spaginate.search,user_type:$scope.spaginate.user_type});
		
		UserServices.getUsers($scope.spaginate, function(response) {	  
			$scope.user_lists = response.data;
			$scope.nodata = response.nodata;	
			$scope.spaginate.total_rows = response.pagination.total_rows;
			$scope.spaginate.total_pages = response.pagination.total_pages;				
			$scope.spaginate.pageurl = 'list_user';		
		}, function() {
		
		} );
	}
	
	$scope.change_perpage = function() {		
		$scope.reloadPage();
	}
	
	$scope.change_usertype = function() {		
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
	
	$scope.removeUser = function(id) {
		UserServices.removeUser({id:id}, function(response) {
			$scope.reloadPage();
		}, function() {		
		} );
	}
	
	$scope.cancel = function() {
		$location.path('/list_user/1');
	}
	
	$scope.reloadPage = function() {
		var urls = GeneralServices.getUrl({per_page:$scope.spaginate.per_page,search:$scope.spaginate.search,user_type:$scope.spaginate.user_type});
		$location.path('/list_user/1').search(urls);
	}

  }]);
