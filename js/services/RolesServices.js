'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('UserManagment.services').
constant('USER_ROLES_API_URLS',{'add':'api/create_userrole','getuserroles':'api/getuserroles','getARole':'api/getauserrole', 'removeUserRole':'api/removeuserrole','getrolegroup':'api/getrolegroup'});

 
angular.module('UserManagment.services').
		service('RolesServices',['$http','USER_ROLES_API_URLS',function($http,USER_ROLES_API_URLS) {

	/* private methods and private variables */
	
	/* public methods */
	var RolesServices = {};
	
	//Adding a new user
	RolesServices.Add = function(fields) {
		var data = {};
		angular.forEach(fields, function(field, key) {
			data[key] = field.value;
		});
		//return;
		return $http.post( USER_ROLES_API_URLS.add, data);
	};
	
	//Get the user types
	RolesServices.getUserRoles = function(data,success_call, error_call) {
		
		$http.post( USER_ROLES_API_URLS.getuserroles,data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};
	
	RolesServices.getARole = function(data, success, error ) {
		$http.post(USER_ROLES_API_URLS.getARole, data).
		success( function(response) {
			success(response);
		}).error( function(response) {
			error(response);
		});
	};
	
	RolesServices.removeUserRole = function(data, success, error ) {
		$http.post(USER_ROLES_API_URLS.removeUserRole, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	RolesServices.getRoleGroup = function(data, success, error ) {
		$http.post(USER_ROLES_API_URLS.getrolegroup, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	return RolesServices;	
	
}]);
