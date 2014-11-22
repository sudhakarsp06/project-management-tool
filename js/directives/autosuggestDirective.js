my_custom_directive.directive('btAutosuggest', [ 'UserServices','$timeout',function(UserServices,$timeout) {
	
	var btAutosuggest = {};
	btAutosuggest.restrict = 'A';
	btAutosuggest.scope = {field: '@',table: '@',suggest:'=',projectid:'@'};
		
	btAutosuggest.link = function(scope,elem,attr) {		
		scope.$watch(function(newval, oldval) {			
			if(newval != '' ) {
				$('.list-group-item').on('click',function() {
					UserServices.addautosuggest({id:$(this).attr('project-id'), assign_id: $(this).attr('user-id')}, 
						function(response) {							
							if(response.nodata == '' ) {
								scope.suggest = {};								
								scope.$parent.$parent.assign_click(response.data); //FIXME - not the correct way to call the parent scope function
							}				
						}, function(response) { //Error Call back
							
					});	
				});
			}
		});
		var suggest = function() {
			
			UserServices.autosugest({project_id: scope.projectid, field:scope.field, table:scope.table, value:elem.val(),nolimit:'1'}, function(response) {
						//SuccessCall back
					scope.suggest = response;						
				}, function(response) { //Error Call back
			});	
		};
		elem.focus(suggest);
		elem.keyup(suggest);
		//elem.bind('keyup, click',);
	};
	return btAutosuggest;

}]);