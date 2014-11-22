'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('UserManagment.services').
constant('PROJECT_API_URLS',{'add':'api/create_project','getprojects':'api/getprojects','getproject':'api/getaproject', 'removeproject':'api/removeproject','getassignees':'api/getassignees','removeassign':'api/removeassignees','gettasksbystatus':'api/gettasksby'});

 
angular.module('UserManagment.services').
		service('ProjectsServices',['$http','PROJECT_API_URLS',function($http,PROJECT_API_URLS) {

	/* private methods and private variables */
	
	/* public methods */
	var ProjectsServices = {};
	
	//Adding a new user
	ProjectsServices.Add = function(fields) {
		var data = {};
		angular.forEach(fields, function(field, key) {
			data[key] = field.value;
		});
		//return;
		return $http.post( PROJECT_API_URLS.add, data);
	};
	
	//Get the user types
	ProjectsServices.getProjects = function(data,success_call, error_call) {
		
		$http.post( PROJECT_API_URLS.getprojects,data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};
	
	ProjectsServices.gettasksbystatus = function(data,success_call, error_call) {
		
		$http.post( PROJECT_API_URLS.gettasksbystatus,data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};
	
	
	
	ProjectsServices.getAProject = function(data, success, error ) {
		$http.post(PROJECT_API_URLS.getproject, data).
		success( function(response) {
			success(response);
		}).error( function(response) {
			error(response);
		});
	};
	
	ProjectsServices.removeProject = function(data, success, error ) {
		$http.post(PROJECT_API_URLS.removeproject, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	ProjectsServices.getassignees = function(data, success, error ) {
		$http.post(PROJECT_API_URLS.getassignees, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	ProjectsServices.removeassign = function(data, success, error ) {
		
		$http.post(PROJECT_API_URLS.removeassign, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	
	
	
	return ProjectsServices;	
	
}]);
