'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('UserManagment.services').
constant('PRIORITY_API_URLS',{'add':'api/create_priority','getprioritys':'api/getprioritys','getAPriority':'api/getapriority', 'removePriority':'api/removepriority','getallprioritys':'api/getallprioritys'});

 
angular.module('UserManagment.services').
		service('PriorityServices',['$http','PRIORITY_API_URLS',function($http,PRIORITY_API_URLS) {

	/* private methods and private variables */
	
	/* public methods */
	var PriorityServices = {};	

	
	//Adding a new user
	PriorityServices.Add = function(fields) {
		var data = {};
		data['roles'] = new Array;
		angular.forEach(fields, function(field, key) {
			data[key] = field.value;
		});		
		return $http.post( PRIORITY_API_URLS.add, data);
	};
	
	//Get the user types
	PriorityServices.getPrioritys = function(data,success_call, error_call) {
		
		$http.post( PRIORITY_API_URLS.getprioritys,data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};


	
	PriorityServices.getAPriority = function(data, success, error ) {
		$http.post(PRIORITY_API_URLS.getAPriority, data).
		success( function(response) {
			success(response);
		}).error( function(response) {
			error(response);
		});
	};
	
	PriorityServices.removePriority = function(data, success, error ) {
		$http.post(PRIORITY_API_URLS.removePriority, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	PriorityServices.getallprioritys = function(data,success_call, error_call) {
		
		$http.post( PRIORITY_API_URLS.getallprioritys,data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};
	
	
	
	return PriorityServices;	
	
}]);
