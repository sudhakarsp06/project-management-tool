my_custom_directive.directive('btAcl', [ function() {

	var btAclDirective = {};
	btAclDirective.restrict = 'A';
	btAclDirective.scope = {field: '@',acl:'='};
		
	btAclDirective.link = function(scope,elem,attr) {		
		if( typeof scope.acl != 'undefined') {
			if( scope.acl[scope.field] != 1 )  elem.hide();
		}		
	};
	return btAclDirective;

}]);