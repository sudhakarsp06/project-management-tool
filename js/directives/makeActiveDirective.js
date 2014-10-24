/* Directives */

var my_custom_directive = angular.module('UserManagment.directives', []);

/* 
Usage of this directive - 
<li class="active"><a href="#home" bt-active>Home</a></li>

Working - It will make the link as active when clicked

We're attaching the click event to each <li> with bt-active directive
*/ 
my_custom_directive.directive('btActive', function() {
	
	return {
		scope: true,// use a child scope that inherits from parent
		restrict:'A',
		link: function(scope, elem, attrs) {
		  elem.bind('click', function() {		 
		    $(this).parent().parent().find('li.active').removeAttr('class'); 
			$(this).parent().attr('class','active');
		  });		 
		}
	};
}); 





