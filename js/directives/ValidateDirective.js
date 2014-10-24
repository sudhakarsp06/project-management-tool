angular.module('UserManagment.directives', [])
.directive('btValidate',function($timeout) {
	
	var validate_required = function(val) {
		
		return ($val == '' );
	};
	
	var btvalidate = {};
	
	btvalidate.restrict = 'E';
	
	btvalidate.scope = { valid: '=', fieldid: '@', show: '@'};
	
	btvalidate.template = '<div ng-show="show" class="alert alert-danger" >Username required</div>';	
	btvalidate.replace = true;
	
	btvalidate.link = function(scope,element,attr) {
	
		//scope.valid = 'Linking'
		scope.show = 1;
			$('#username').on('blur',function(e) {
				if( $('#'+scope.fieldid).val() == '' ) {
				console.log('if');
					scope.show = 1;				
				}
				else {
				console.log('else');
					scope.show = 0;
				}
			});
		
	};
	
	return btvalidate;
});


