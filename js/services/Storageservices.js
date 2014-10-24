

angular.module('UserManagment.services').
service('Storageservices',['$http',function($http) {

var storageservice = {};

	storageservice.getitem = function(name, default_val) {
		if( typeof localStorage.getItem(name) == 'undefined') {	
			return default_val;
		}		
		return localStorage.getItem(name);
	};

	storageservice.setitem = function(name,value) {
		localStorage.setItem(name,value);
	};

	storageservice.removeitem = function(name) {
		localStorage.removeItem(name);
	};

	return storageservice; // Finally return the object
}]);