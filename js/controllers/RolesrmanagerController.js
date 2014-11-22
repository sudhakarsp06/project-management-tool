'use strict';

/* Controllers */

angular.module('UserManagment.controllers').
 controller('RolesmanagerController', ['$scope','$location','$routeParams','$cacheFactory','$filter','$translate','RolesServices','Validationservice','Storageservices','$route','GeneralServices',function( $scope, $location, $routeParams,$cacheFactory, $filter, $translate, RolesServices,Validationservice,Storageservices,$route,GeneralServices) {
	

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
		$scope.fields = (temp_id)?btfieldManager('edit_roles'):btfieldManager('create_roles');	
		$scope.fields.id = {value:temp_id};				
		
	}
		
	/* To get a user for editing purpose */
	$scope.getarole = function() {
	
		if( $scope.fields.id.value > 0 ) {
			RolesServices.getARole({id:$scope.fields.id.value},
				function(data){
					if( data.error ) {
						$scope.response.error = data.error;					
					} else {	
						$scope.fields.name.value =  data.name;
						$scope.fields.key.value =  data.role_key;
						$scope.fields.url.value =  data.page_url;
						$scope.fields.is_public.value =  data.is_public;
						
						
					}
			}, function(data){
			});
		}
	}
	/* To get a user for editing purpose */
	
	/* To Add a user */
	$scope.addUserRole = function() {	
		//Do not run further if there is some error
		if( typeof $scope.response.error != 'undefined' &&  $scope.response.error != '') return;		
		
		Validationservice.setup($scope.fields, $scope);		
		
		if( Validationservice.validate() > 0 ) { //If any error
			$scope.response.error = Validationservice.showError();			
		} else { //Process the error
			RolesServices.Add($scope.fields).
			success(function(data){
				if( data.error ) {
					$scope.response.error = data.error;
					//$location.path('/login');
				} else {
					$scope.response.success = data.success;
					$location.path('/'+$scope.pages.LIST_ROLES+'/1');
				}
			}).error(function(data){
			});
		}
	}
		
	$scope.listUserRoles = function()
	{		
		$scope.spaginate = {};
		//This is used to compose the URL for the fields in the list header
		$scope.spaginate.page = (typeof $routeParams.page != 'undefined')?$routeParams.page:1;
		
			//This is used to compose the URL for the fields in the list header
		$scope.spaginate.per_page = (typeof $location.search().per_page != 'undefined')?$location.search().per_page:$scope.paginate_settings.defaultpagesize;		
		$scope.pagesizes = $scope.paginate_settings.pagesizes;
		
		$scope.spaginate.search = $location.search().search;
		$scope.spaginate.user_type = $location.search().user_type;
		
		$scope.spaginate.urls = GeneralServices.getUrl({per_page:$scope.spaginate.per_page,search:$scope.spaginate.search,user_type:$scope.spaginate.user_type});
		
		RolesServices.getUserRoles($scope.spaginate, function(response) {	  
			$scope.user_lists = response.data;
			$scope.nodata = response.nodata;	
			$scope.spaginate.total_rows = response.pagination.total_rows;
			$scope.spaginate.total_pages = response.pagination.total_pages;				
			$scope.spaginate.pageurl = $scope.pages.LIST_ROLES;		
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
	
	$scope.cancel = function() {
		$location.path('/'+$scope.pages.LIST_ROLES+'/1');
	}
	
	$scope.reloadPage = function() {
		var urls = GeneralServices.getUrl({per_page:$scope.spaginate.per_page,search:$scope.spaginate.search,user_type:$scope.spaginate.user_type});
		$location.path('/'+$scope.pages.LIST_ROLES+'/1').search(urls);
	}

  }]);
