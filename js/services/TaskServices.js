'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('UserManagment.services').
constant('TASK_API_URLS',{'add':'api/create_task','gettasks':'api/gettasks','getATask':'api/getatask', 'removeTask':'api/removetask','changestatus':'api/changetaskstatus'});

 
angular.module('UserManagment.services').
		service('TaskServices',['$http','TASK_API_URLS',function($http,TASK_API_URLS) {

	/* private methods and private variables */
	
	/* public methods */
	var TaskServices = {};	

	
	//Adding a new user
	TaskServices.Add = function(fields) {
		var data = {};
		data['roles'] = new Array;
		angular.forEach(fields, function(field, key) {
			data[key] = field.value;
		});		
		return $http.post( TASK_API_URLS.add, data);
	};
	
	
	
	//Get the user types
	TaskServices.gettasks = function(data,success_call, error_call) {
		
		$http.post( TASK_API_URLS.gettasks,data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};

	TaskServices.changeStatus = function(data,success_call, error_call) {
		
		$http.post( TASK_API_URLS.changestatus,data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};
	
	TaskServices.getATask = function(data, success, error ) {
		$http.post(TASK_API_URLS.getATask, data).
		success( function(response) {
			success(response);
		}).error( function(response) {
			error(response);
		});
	};
	
	TaskServices.removeTask = function(data, success, error ) {
		$http.post(TASK_API_URLS.removeTask, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	

	
	
	
	return TaskServices;	
	
}]);
