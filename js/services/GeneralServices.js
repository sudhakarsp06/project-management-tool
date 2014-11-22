'use strict';

/* Services */

angular.module('UserManagment.services').
constant('GENERAL_API_URLS',{'upload':'upload.php','getattachments':'api/getattachments','removeaattachment':'api/removeaattachment','uploadattachment':'api/uploadattachment','getattachmenttoken':'api/getattachmenttoken','getactivitylog':'api/getactivitylog'});

var pagesize_list = new Array;
pagesize_list.push({'data':'10'});
pagesize_list.push({'data':'20'});
pagesize_list.push({'data':'30'});


angular.module('UserManagment.services').
constant('UI_CONFIG',{'defaultpagesize':'30', 'pagesizes':pagesize_list });

angular.module('UserManagment.services').
		service('GeneralServices',['$routeParams','$location','GENERAL_API_URLS','$http',function($routeParams,$location,GENERAL_API_URLS,$http) {

	/* private methods and private variables */
	
	/* public methods */
	var GeneralServices = {};
	
	GeneralServices.getUrl = function(params) {
		var urls = new Array;
		angular.forEach(params, function(field, key) {
		if(typeof field != 'undefined' && field != '' )
			urls.push(key+'='+field);
		});
		return urls.join('&');
	}	
	
		//Get the user types
	GeneralServices.upload = function(data) {
		
		$.ajax( {
			  url: GENERAL_API_URLS.upload,
			  type: 'POST',
			  data: new FormData('#'+data.form),
			  processData: false,
			  contentType: false
		} );
	};
	
	GeneralServices.getattachments = function(data, success, error ) {
		
		$http.post(GENERAL_API_URLS.getattachments, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	
	GeneralServices.removeaattachment = function(data, success, error ) {
		
		$http.post(GENERAL_API_URLS.removeaattachment, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	GeneralServices.getattachmenttoken = function(data, success, error ) {
		$http.post(GENERAL_API_URLS.getattachmenttoken, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	GeneralServices.getactivitylog = function(data, success, error ) {
		$http.post(GENERAL_API_URLS.getactivitylog, data).
			success( function(response) {
				success(response);
		}).error( function(response) {
				error(response);
		});
	}
	
	return GeneralServices;	
	
}]);
