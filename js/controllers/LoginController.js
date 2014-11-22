'use strict';

/* Controllers */

angular.module('UserManagment.controllers').
 controller('LoginController', ['Loginservices','$scope','$location','Storageservices',function(Loginservices, $scope, $location,Storageservices) {
	
	$scope.login =  {};
	$scope.error = {};
	$scope.login.submitted = false;
	$scope.error.email = 'Invalid Email Id';
	$scope.error.password = 'Password is required';
	
	//Redirect to home page if this user is a logged in
	if( $scope.auth.loggedin ) {
		$location.path('/home');
	}
	
	$scope.submitLogin = function() {
			$scope.login.submitted = true;
			if( $scope.loginform.$valid ) {
				Loginservices.Auth($scope.login).
				success(function(data){
					if( data.error ) {
						$scope.response.error = data.error;
						$location.path('/login');
					} else {
						
						Loginservices.Login(data);
						$scope.auth.loggedin = true;
						$scope.response.success = data.success;
						Storageservices.setitem('success',data.success);
						
						$location.path('/home');
						window.location.reload();
					}
				}).
				error(function(data){
				});
			}
			
	}
	
	
  }]);
