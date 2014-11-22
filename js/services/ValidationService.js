'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('UserManagment.services').
		service('Validationservice',[function() {

	var errors = new Array;		
	/* private methods and private variables */
	var validate_required = function(value) {
		return (value != '' )
	}
	
	var validate_email = function(value) {
		 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(value); 
	}
	
	var validate_number = function(value) {
		 return !isNaN(parseFloat(value)) && isFinite(value);
	}
	
	var collect_error = function(message) {
		errors.push(message);
	}
	
	/* public methods */
	var Validationservice = {};
	
	Validationservice.setup = function(fields, scope) {
		this.fields = fields;
		console.log(this.fields);
		scope.response.error = '';
	}
	
	Validationservice.showError = function() {
		var error_string = '';
		angular.forEach(errors, function(message, key) {
			error_string += '<li>'+message+'</li>';
		});
		return '<ul>'+error_string+'</ul>';
	};
	
	Validationservice.validate = function(type) {	
		errors = new Array;
		angular.forEach(this.fields, function(field, key) {				
			angular.forEach(field.validation, function(type, key) {			
				switch(type) {	
					case 'required':
						if(!validate_required(field.value)) {							
							collect_error(field.error[key]);
						}
					break;
					
					case 'email':
						if(!validate_email(field.value)) {
							collect_error(field.error[key]);
						}
					break;
					
					case 'number':
					break;
				}				
			});				
		});
		
		return errors.length;	
		
	};
	
	return Validationservice;	
	
}]);
