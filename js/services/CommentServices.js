'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('UserManagment.services').
constant('COMMENTS_API_URLS',{'add':'api/create_comment','getcomments':'api/getcomments','getAComment':'api/getacomment', 'removeComment':'api/removecomment'});

 
angular.module('UserManagment.services').
		service('CommentServices',['$http','COMMENTS_API_URLS',function($http,COMMENTS_API_URLS) {

	/* private methods and private variables */
	
	/* public methods */
	var CommentServices = {};	

	
	//Adding a new user
	CommentServices.Add = function(data) {
		return $http.post( COMMENTS_API_URLS.add, data);
	};
	
	//Get the user types
	CommentServices.getcomments = function(data,success_call, error_call) {
		
		$http.post( COMMENTS_API_URLS.getcomments,data).
		success(function(response){
			success_call(response);
		}).
			error(function(response){
			error_call(response);
		});
	};


	
	CommentServices.getAComment = function(data, success, error ) {
		$http.post(COMMENTS_API_URLS.getAComment, data).
		success( function(response) {
			success(response);
		}).error( function(response) {
			error(response);
		});
	};
	
	CommentServices.removeComment = function(data, success, error ) {
		$http.post(COMMENTS_API_URLS.removeComment, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	return CommentServices;	
	
}]);
