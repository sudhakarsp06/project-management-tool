angular.module('UserManagment.directives', [])
     .directive('buildNavigation',[ 'Loginservices',function(Loginservices) {
		console.log('coming directive');
		return {
		restrict: 'E',
		replace: true,
		scope: {
		loggedin: '=isLoggedIn' // Two way binding a attribute to another variable
		},
		templateUrl: 'templates/blocks/navigation.html',
		controller: 'NavigateController'
		
		}
}]);