my_custom_directive.directive('btPaginate', function() {
	var btpaginate = {};	
	btpaginate.restrict = 'E';
	btpaginate.scope = {paginate:'='};
	btpaginate.templateUrl =  'templates/utils/paginate.html?t=dsadsaddsds',
	btpaginate.replace = true,
	btpaginate.link = function(scope,elem,attrs) {
		scope.$watch('paginate',function(newval, oldval) {
			if(newval != oldval ) {
				scope.pages_list = new Array;
				for(var i=1; i<=scope.paginate.total_pages;i++) {					
					scope.pages_list[i] = {'page':i};
				}
				scope.nextpage = Number(scope.paginate.page) + 1;
				//scope.perpage = 				
			}
		}, true);		
	}
	
	return btpaginate;
}); 