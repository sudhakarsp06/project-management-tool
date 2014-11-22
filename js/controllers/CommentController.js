'use strict';

/* Controllers */

angular.module('UserManagment.controllers').
 controller('CommentController', ['$scope','$location','$routeParams','$cacheFactory','$filter','$translate','TaskServices','Validationservice','Storageservices','$route','CommentServices',function( $scope, $location, $routeParams,$cacheFactory, $filter, $translate, TaskServices,Validationservice,Storageservices,$route,CommentServices) {
	
	$scope.comment_text = '';
	
	//Setting the auth error into the scope from translate
	$translate('AUTH_ERROR').then(function (error) {
		$scope.authentic_error = error.not_auth;
	});
	
	//If not auth, redirect them to the login page
	if(!$scope.auth.loggedin) {
		$scope.response.error = $scope.authentic_error;
		$location.path('/login');
	}
	
	/* Keeping the comment related things here as it is common to more than one controller */
	
	$scope.parentaddcomment = function(post_id, post_type) {
		var data = {post_id:post_id, post_type:post_type,comment: $scope.comment_text};
		 CommentServices.Add(data)
		.success(function(response){
			//$scope.comment_text = '';
			if(response.error) {
				$scope.response.error = response.error;
			} else {
				$scope.comment_text = '';
				$scope.listcomments(data.post_id,data.post_type);
			}
		})
		.error(function(response){
			
		}); 
	}
	
	$scope.listcomments = function(post_id, post_type) {
		CommentServices.getcomments({post_id:post_id,post_type:post_type},function(response) {
			$scope.comments = response;	
			$scope.getactivitylog(post_id,post_type);	
		}, function(response) {
		});
	}
	
	$scope.editcomment = function() {
	
	}

  }]);
