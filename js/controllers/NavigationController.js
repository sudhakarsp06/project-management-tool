'use strict';

/* Parent controller for rest of the Controllers */

var controller = angular.module('UserManagment.controllers').
 controller('NavigateController', ['$location','$scope','Loginservices','$translate','Storageservices','CommentServices','GeneralServices','UI_CONFIG',function($location,$scope,Loginservices,$translate,Storageservices,CommentServices,GeneralServices,UI_CONFIG) {
	
	$scope.auth = {};
	$scope.paginate_settings = UI_CONFIG;
	$scope.attachments = new Array;
	$scope.post_id = $scope.post_type = '';
	$scope.auth.loggedin = Loginservices.isAuth();
	$scope.user_details = {};
	$scope.pages = pages_actions;
	if($scope.auth.loggedin)
	{
		//var user_details = Loginservices.getUserDetails();
		$scope.access_control = Loginservices.getaccess();
		$scope.reverse_access_control = Loginservices.getreverseaccess();
		
		//Assign whatever information we want into this user_details json
		$scope.user_details = Loginservices.getUserDetails();
		//console.log('user_details',$scope.user_details );
	}
	
	$scope.response = {};
	$scope.$on("$routeChangeStart", function (event, next, current) {
		$scope.checkAuth();	 
	});
	
	$scope.checkAuth = function() {
		var paths = $location.path().split('/');
			
		if(typeof $scope.reverse_access_control != 'undefined' && $scope.user_details.user_type > 0) {
			if( $scope.reverse_access_control[paths[1]] != 1 ) {
				$scope.response.error = "You do not have permissions to access this page";
				$location.path('/home');
			}
		}
	
	}
	
	/* Keeping the comment related things here as it is common to more than one controller */
	
	$scope.parentaddcomment = function(data) {
		
		CommentServices.Add(data)
		.success(function(response){
			//$scope.comment_text = '';
			if(response.error) {
				$scope.response.error = response.error;
			} else {
				$scope.listcomments(data.post_id,data.post_type);
			}
		})
		.error(function(response){
			
		});
	}

	
	$scope.editcomment = function() {
	
	}
	
	$scope.language = 'en';
	
	//console.log('$scope.auth.loggedin',$scope.auth.loggedin);
	$scope.logout = function() {
		//console.log('coming to logout');
		Loginservices.logout();
		$scope.auth.loggedin = false;
		$scope.response.success = "Logged out successfully";
		window.location.reload();
	}
	
	$scope.parentattachments = function(type,id) {	
		console.log('type',type);
		GeneralServices.getattachments({id:id, 'type': type},
			function(data){
				if( data.error ) {
					$scope.response.error = data.error;					
				} else {	
					console.log('data.data',data.data);
					$scope.attachments =  data.data;
					$scope.getactivitylog(id,type);
					
				}
		}, function(data){
		});
	}
	
	$scope.getattachmenttoken = function(id) {	
		
		GeneralServices.getattachmenttoken({id:id}, function(response) {
			if(response.error) {
				$scope.response.error = response.error;
			} else {
				//$scope.reloadPage();
				location.href = response.data;
			}
		}, function() {		
		} );
	}
	
	$scope.removeattachment = function(id,post_id,post_type) {	
		GeneralServices.removeaattachment({id:id},
		function(data){
				$('#attach_'+id).remove();
				console.log('cominghere',post_id,post_type);
				$scope.getactivitylog(post_id,post_type);
				$scope.response.success = 'Attachment Removed';
		}, function(data){
		});
	}
	
	$scope.router = function(path,params) {
		$location.path('/'+path+'/'+params);
	}
	
	$scope.getactivitylog = function(post_id,post_type) {
		
		GeneralServices.getactivitylog({post_id:post_id,post_type:post_type},
		function(data){
				$scope.logs = data;
		}, function(data){
		});
	}
	
	


  }]);