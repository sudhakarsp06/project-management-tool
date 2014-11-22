'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('UserManagment.services').
constant('TASK_TYPE_API_URLS',{'add':'api/create_tasktype','gettasktypes':'api/gettasktypes','getAtaskType':'api/getatasktype', 'removetaskType':'api/removetasktype'});

 
angular.module('UserManagment.services').
		service('TasktypeServices',['$http','TASK_TYPE_API_URLS',function($http,TASK_TYPE_API_URLS) {

	/* private methods and private variables */
	
	/* public methods */
	var UsertaskServices = {};	

	
	//Adding a new user
	UsertaskServices.Add = function(fields) {
		var data = {};
		data['roles'] = new Array;
		angular.forEach(fields, function(field, key) {
			data[key] = field.value;
		});
		$('input[type="radio"]').each(function() {
			//console.log('name',$(this).prop('checked') );
			
			if($(this).prop('checked') == true) {
				data['roles'][$(this).attr('data-id')] = $(this).val();
			}
		});
		return $http.post( TASK_TYPE_API_URLS.add, data);
	};
	
	//Get the user types
	UsertaskServices.getTaskTypes = function(data,success_call, error_call) {
		
		$http.post( TASK_TYPE_API_URLS.gettasktypes,data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};


	
	UsertaskServices.getATaskType = function(data, success, error ) {
		$http.post(TASK_TYPE_API_URLS.getAtaskType, data).
		success( function(response) {
			success(response);
		}).error( function(response) {
			error(response);
		});
	};
	
	UsertaskServices.removeTaskType = function(data, success, error ) {
		$http.post(TASK_TYPE_API_URLS.removetaskType, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	return UsertaskServices;	
	
}]);
