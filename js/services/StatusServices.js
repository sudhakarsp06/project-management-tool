'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('UserManagment.services').
constant('STATUS_API_URLS',{'add':'api/create_status','getstatus':'api/getstatus','getAStatus':'api/getastatus', 'removeStatus':'api/removestatus'});

 
angular.module('UserManagment.services').
		service('StatusServices',['$http','STATUS_API_URLS',function($http,STATUS_API_URLS) {

	/* private methods and private variables */
	
	/* public methods */
	var StatusServices = {};	

	
	//Adding a new user
	StatusServices.Add = function(fields) {
		var data = {};
		data['roles'] = new Array;
		angular.forEach(fields, function(field, key) {
			data[key] = field.value;
		});		
		return $http.post( STATUS_API_URLS.add, data);
	};
	
	//Get the user types
	StatusServices.getStatuses = function(data,success_call, error_call) {
		
		$http.post( STATUS_API_URLS.getstatus,data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};


	
	StatusServices.getAStatus = function(data, success, error ) {
		$http.post(STATUS_API_URLS.getAStatus, data).
		success( function(response) {
			success(response);
		}).error( function(response) {
			error(response);
		});
	};
	
	StatusServices.removeStatus = function(data, success, error ) {
		$http.post(STATUS_API_URLS.removeStatus, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	return StatusServices;	
	
}]);
