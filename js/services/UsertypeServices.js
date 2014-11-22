'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('UserManagment.services').
constant('USER_TYPE_API_URLS',{'add':'api/create_usertype','list':'api/list_user','getticket':'api/get_user','getusertypes':'api/getuserstypes','lookup':'api/lookup','getusers':'api/getusers','getAuserType':'api/getausertype', 'removeUserType':'api/removeusertype','getrolesall':'api/getrolesall'});

 
angular.module('UserManagment.services').
		service('UsertypeServices',['$http','USER_TYPE_API_URLS',function($http,USER_TYPE_API_URLS) {

	/* private methods and private variables */
	
	/* public methods */
	var UsertypeServices = {};	

	
	UsertypeServices.getrolesall = function(data, success_call, error_call) {
		
		$http.post(USER_TYPE_API_URLS.getrolesall, data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};
	
	//Adding a new user
	UsertypeServices.Add = function(fields) {
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
		//console.log( data );
		//return;
		//console.log( data );
		//return;
		return $http.post( USER_TYPE_API_URLS.add, data);
	};
	
	//Get the user types
	UsertypeServices.getUserTypes = function(data,success_call, error_call) {
		
		$http.post( USER_TYPE_API_URLS.getusertypes,data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};
	
	UsertypeServices.lookup = function(data, success_call, error_call) {
		
		$http.post(API_URLS.lookup, data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};
	

	
	UsertypeServices.getAUserType = function(data, success, error ) {
		$http.post(USER_TYPE_API_URLS.getAuserType, data).
		success( function(response) {
			success(response);
		}).error( function(response) {
			error(response);
		});
	};
	
	UsertypeServices.removeUserType = function(data, success, error ) {
		$http.post(USER_TYPE_API_URLS.removeUserType, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	return UsertypeServices;	
	
}]);
