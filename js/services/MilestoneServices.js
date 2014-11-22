'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('UserManagment.services').
constant('MILESTONE_API_URLS',{'add':'api/create_milestone','getmilestones':'api/getmilestones','getAMilestone':'api/getamilestone', 'removeMilestone':'api/removemilestones','getAllMilestones':'api/getAllMilestones'});

 
angular.module('UserManagment.services').
		service('MilestoneServices',['$http','MILESTONE_API_URLS',function($http,MILESTONE_API_URLS) {

	/* private methods and private variables */
	
	/* public methods */
	var MilestoneServices = {};	

	//Adding a new user
	MilestoneServices.Add = function(fields) {
		var data = {};
		data['roles'] = new Array;
		angular.forEach(fields, function(field, key) {
			data[key] = field.value;
		});		
		return $http.post( MILESTONE_API_URLS.add, data);
	};
	
	//Get the user types
	MilestoneServices.getMilestones = function(data,success_call, error_call) {
		
		$http.post( MILESTONE_API_URLS.getmilestones,data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};
	
	MilestoneServices.getAMilestone = function(data, success, error ) {
		$http.post(MILESTONE_API_URLS.getAMilestone, data).
		success( function(response) {
			success(response);
		}).error( function(response) {
			error(response);
		});
	};
	
	MilestoneServices.getAllMilestones = function(data, success, error ) {
		$http.post(MILESTONE_API_URLS.getAllMilestones, data).
		success( function(response) {
			success(response);
		}).error( function(response) {
			error(response);
		});
	};
	
	
	
	MilestoneServices.removeMilestone = function(data, success, error ) {
		$http.post(MILESTONE_API_URLS.removeMilestone, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	return MilestoneServices;	
	
}]);
