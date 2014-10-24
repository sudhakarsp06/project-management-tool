'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('UserManagment.services',[]).
constant('APIURL',{'login':'api/userlogin','getpages':'api/getpages'});
  
angular.module('UserManagment.services').
		service('Loginservices',['$http','APIURL','$cookieStore','$cookies',function($http,APIURL,$cookieStore,$cookies) {

	var setCookie = function() {
		
	}
	return {		
		Auth: function(data) {
			return $http.post(
				APIURL.login,
				data
			);
		},	
		isAuth: function() {
			if( $cookieStore.get('user_details') ) {
			
				return ($cookies.PHPSESSID == $cookieStore.get('user_details').token);
			} 
			return false;
		},
		isLoggedin: function() {
			return $cookieStore.get('user_details')? true: false;
		},	
		getUserDetails: function() {
			return $cookieStore.get('user_details')? $cookieStore.get('user_details'): false;
		},
		
		/* To get the access details */
		getaccess: function() {
			return $cookieStore.get('user_details').access?$cookieStore.get('user_details').access:false;
		},
		
		getreverseaccess: function() {
			return $cookieStore.get('user_details').reverse?$cookieStore.get('user_details').reverse:false;
		},
		
		Login: function(data) {
			//setCookie(data.token);			
			$cookieStore.put('user_details',data);
			
		},
		logout: function() {	
			$http.post(
				'api/logout'				
			).success( function(response) {
				$cookieStore.remove('user_details');
				$cookieStore.remove('pages_list');
			});				
			
		},
		
		
	}
}]);

/* My interceptor 
These will intercept the request, response, error and success ajax requests,
Here we will implement the request interceptor to insert the session id & user id in the request headers
*/
angular.module('UserManagment').
factory('sessionInjector',function( $q, $injector ) {
	var interceptor =  {
		request: function(config) {
			var Loginservices = $injector.get('Loginservices');
			var $http = $injector.get('$http');
			if( Loginservices.isAuth()   ) {
				var user_details = Loginservices.getUserDetails();
				config.headers['x-token'] = user_details.token;
				
				if( typeof config.data != 'undefined'  )
				config.data.token = user_details.token;
			}
			
			
			return config;
		}
	}
	return interceptor;
});

/* Push the interceptor into the http provider */
angular.module('UserManagment').
config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('sessionInjector');
}]);


