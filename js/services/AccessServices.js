'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('UserManagment.services').
constant('ACCESS_API_URLS',{'getaccess':'api/get_access'});

 
angular.module('UserManagment.services').
		service('AccessServices',['$http','ACCESS_API_URLS',function($http,ACCESS_API_URLS) {

	/* private methods and private variables */
	
	/* public methods */
	var AccessServices = {};		
	AccessServices.getrolesall = function( success_call, error_call) {
		
		$http.post(ACCESS_API_URLS.getaccess).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};
	
	return AccessServices;	
	
}]);
