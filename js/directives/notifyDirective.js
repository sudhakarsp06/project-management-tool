my_custom_directive.directive('ntTimer', function($compile) {
	var bttimer = {};	
	//bttimer.scope = true;
	bttimer.restrict = 'A';	
	bttimer.scope = {
			message: '=',
			
	};
	bttimer.link = function(scope,elem,attrs) {			
		var remove_notify = function()
		{
			//console.log('scope remove',scope);
			if( typeof scope.message != 'undefined') {
				scope.message =  '';
			}
		};
		
		scope.$watch('message',function(newval, oldval) {
			newval = '<p>'+newval+'</p>';
			var newElem = $compile(newval)(scope.$parent);
			elem.contents().remove();
			elem.append(newElem);
		
			//console.log('scope',scope);
			setTimeout( remove_notify , 1000);
		});			
	};	
	return bttimer;
});

