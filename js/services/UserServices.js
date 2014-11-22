'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('UserManagment.services').
constant('API_URLS',{'add':'api/create_user','list':'api/list_user','getticket':'api/get_user','getusertypes':'api/usertypes','lookup':'api/lookup','getusers':'api/getusers','getAuser':'api/getauser', 'removeUser':'api/removeuser','autosugest':'api/auto_suggest','addautosugest':'api/addauto_suggest'});

 
angular.module('UserManagment.services').
		service('UserServices',['$http','API_URLS',function($http,API_URLS) {

	/* private methods and private variables */
	
	/* public methods */
	var UserServices = {};
	
	//Adding a new user
	UserServices.Add = function(fields) {
		var data = {};
		angular.forEach(fields, function(field, key) {
			data[key] = field.value;
		});
		console.log( data );
		//return;
		return $http.post( API_URLS.add, data);
	};
	
	//Get the user types
	UserServices.getUserTypes = function(success_call, error_call) {
		
		$http.get( API_URLS.getusertypes).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};
	
	UserServices.lookup = function(data, success_call, error_call) {
		
		$http.post(API_URLS.lookup, data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};
	UserServices.autosugest = function(data, success_call, error_call) {
		
		$http.post(API_URLS.autosugest, data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};
	
	UserServices.addautosuggest = function(data, success_call, error_call) {
		
		$http.post(API_URLS.addautosugest, data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};
	
	
	UserServices.getUsers = function(data, success, error ) {
			$http.post(API_URLS.getusers, data).
			success( function(response) {
				success(response);
			}).error( function(response) {
				error(response);
			});
	};
	
	UserServices.getAUser = function(data, success, error ) {
		$http.post(API_URLS.getAuser, data).
		success( function(response) {
			success(response);
		}).error( function(response) {
			error(response);
		});
	};
	
	UserServices.removeUser = function(data, success, error ) {
		$http.post(API_URLS.removeUser, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	return UserServices;	
	
}]);
