'use strict';

/* Controllers */

angular.module('UserManagment.controllers').
 controller('MilestonemanagerController', ['$scope','$location','$routeParams','$cacheFactory','$filter','$translate','MilestoneServices','Validationservice','Storageservices','$route','GeneralServices',function( $scope, $location, $routeParams,$cacheFactory, $filter, $translate, MilestoneServices,Validationservice,Storageservices,$route,GeneralServices) {
	

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
		$scope.fields = (temp_id)?btfieldManager('edit_milestone'):btfieldManager('create_milestone');	
		$scope.fields.id = {value:temp_id};		
		
	}
		
	/* To get a user type for editing purpose */
	$scope.getamilestone = function() {
		if( $scope.fields.id.value > 0 ) {
			MilestoneServices.getAMilestone({id:$scope.fields.id.value},
				function(data){
					if( data.error ) {
						$scope.response.error = data.error;					
					} else {				
						$scope.fields.name.value =  data.name;
						$scope.fields.start_date.value =  data.start_date;
						$scope.fields.end_date.value =  data.end_date;
					}
			}, function(data){
			});
		}
	}
	/* To get a user for editing purpose */
	
	/* To Add a user */
	$scope.addmilestone = function() {	
		//Do not run further if there is some error
		if( typeof $scope.response.error != 'undefined' &&  $scope.response.error != '') return;		
		
		Validationservice.setup($scope.fields, $scope);		
		
		if( Validationservice.validate() > 0 ) { //If any error
			$scope.response.error = Validationservice.showError();			
		} else { //Process the error
			MilestoneServices.Add($scope.fields).
			success(function(data){
				if( data.error ) {
					$scope.response.error = data.error;
					//$location.path('/login');
				} else {
					$scope.response.success = data.success;
					$location.path('/'+$scope.pages.LIST_MILESTONE+'/1');
				}
			}).error(function(data){
			});
		}
	}
		
	$scope.listmilestones = function()
	{		
		$scope.spaginate = {};
			//This is used to compose the URL for the fields in the list header
		$scope.spaginate.per_page = (typeof $location.search().per_page != 'undefined')?$location.search().per_page:$scope.paginate_settings.defaultpagesize;		
		$scope.pagesizes = $scope.paginate_settings.pagesizes;
		
		$scope.spaginate.search = $location.search().search;
		$scope.spaginate.page = (typeof $routeParams.page != 'undefined')?$routeParams.page:1;
		$scope.spaginate.urls = GeneralServices.getUrl({per_page:$scope.spaginate.per_page,search:$scope.spaginate.search});
		
		MilestoneServices.getMilestones($scope.spaginate, function(response) {	  
			$scope.user_lists = response.data;	
			$scope.nodata = response.nodata;	
			$scope.spaginate.total_rows = response.pagination.total_rows;
			$scope.spaginate.total_pages = response.pagination.total_pages;				
			$scope.spaginate.pageurl = $scope.pages.LIST_MILESTONE;		
		}, function() {
		
		} );
	}
	
	$scope.change_perpage = function() {	
		$scope.reloadPage();
	}
	
	$scope.search = function() {
		//console.log('$scope.spaginate',$scope.spaginate);
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
	
	$scope.removeMilestone = function(id) {
		MilestoneServices.removeMilestone({id:id}, function(response) {
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
		$location.path('/'+$scope.pages.LIST_MILESTONE+'/1');
	}
	
	$scope.reloadPage = function() {
		var urls = GeneralServices.getUrl({per_page:$scope.spaginate.per_page,search:$scope.spaginate.search});
		$location.path('/'+$scope.pages.LIST_MILESTONE+'/1').search(urls);
	}

  }]);
