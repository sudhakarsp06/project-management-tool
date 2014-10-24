'use strict';


// Declare app level module which depends on filters, and services
angular.module('UserManagment', [
  'ngRoute',
  'ngResource',
  'ngCookies',
  'pascalprecht.translate',
  'UserManagment.directives', 
  'UserManagment.controllers',//Controller
  'UserManagment.services',
  'UserManagment.filters'
]).

config(['$routeProvider',function($routeProvider) {
  $routeProvider.
  when('/login', 
	{
		templateUrl: 'templates/login/login.html', 
		controller: 'LoginController'
	}).
   when('/home', 
	{
		templateUrl: 'templates/home.html', 
		controller: 'HomeController'
	}).
when('/dashboard', 
	{
		templateUrl: 'templates/dashboard.html', 
		controller: 'HomeController'
	}).	
 when('/'+pages_actions.PAGE_ABOUT, 
	{
		templateUrl: 'templates/about.html', 
		controller: 'HomeController',
	
	}).	
	 when('/'+pages_actions.PAGE_CONTACT_US, 
	{
		templateUrl: 'templates/contact.html', 
		controller: 'HomeController',
	
	}).	
	when('/'+pages_actions.CREATE_USER,
	{
		templateUrl: 'templates/user/create_user.html',
		controller: 'UsermanagerController',
		
	}).
	when('/'+pages_actions.LIST_USER+'/:page',
	{
		templateUrl: 'templates/user/list_user.html',
		controller: 'UsermanagerController',
	}).
	when('/'+pages_actions.LIST_USER+'/:page/?per_page&order&field&search',
	{
		templateUrl: 'templates/user/list_user.html',
		controller: 'UsermanagerController',
	}).	
	when('/'+pages_actions.EDIT_USER+'/:id',
	{
		templateUrl: 'templates/user/create_user.html',
		controller: 'UsermanagerController',
	}).
	when('/'+pages_actions.CREATE_USERTYPE+'',
	{
		templateUrl: 'templates/user/create_usertype.html',
		controller: 'UsertypemanagerController'		
	}).
	when('/'+pages_actions.LIST_USERTYPE+'/:page',
	{
		templateUrl: 'templates/user/list_usertype.html',
		controller: 'UsertypemanagerController',
	}).
	when('/'+pages_actions.LIST_USERTYPE+'/:page/?per_page&order&field&search',
	{
		templateUrl: 'templates/user/list_usertype.html',
		controller: 'UsertypemanagerController',
	}).	
	when('/'+pages_actions.EDIT_USERTYPE+'/:id',
	{
		templateUrl: 'templates/user/create_usertype.html',
		controller: 'UsertypemanagerController',
	}).
	when('/create_roles',
	{
		templateUrl: 'templates/user/create_roles.html',
		controller: 'RolesmanagerController',
	}).
	when('/list_userrole/:page',
	{
		templateUrl: 'templates/user/list_roles.html',
		controller: 'RolesmanagerController',
	}).
	when('/list_userrole/:page/?per_page&order&field&search',
	{
		templateUrl: 'templates/user/list_roles.html',
		controller: 'RolesmanagerController',
	}).	
	when('/edit_userrole/:id',
	{
		templateUrl: 'templates/user/create_roles.html',
		controller: 'RolesmanagerController',
	}).when('/'+pages_actions.CREATE_PROJECT+'',
	{
		templateUrl: 'templates/project/create_project.html',
		controller: 'ProjectsController'		
	}).
	when('/'+pages_actions.LIST_PROJECT+'/:page',
	{
		templateUrl: 'templates/project/list_project.html',
		controller: 'ProjectsController',
	}).
	when('/'+pages_actions.LIST_PROJECT+'/:page/?per_page&order&field&search',
	{
		templateUrl: 'templates/project/list_project.html',
		controller: 'ProjectsController',
	}).	
	when('/'+pages_actions.EDIT_PROJECT+'/:id',
	{
		templateUrl: 'templates/project/create_project.html',
		controller: 'ProjectsController',
	}).
	when('/'+pages_actions.VIEW_PROJECT+'/:id',
	{
		templateUrl: 'templates/project/view_project.html',
		controller: 'ProjectsController',
	}).
	when('/'+pages_actions.CREATE_TASKTYPE+'',
	{
		templateUrl: 'templates/task/create_tasktype.html',
		controller: 'TasktypemanagerController'		
	}).
	when('/'+pages_actions.LIST_TASKTYPE+'/:page',
	{
		templateUrl: 'templates/task/list_tasktype.html',
		controller: 'TasktypemanagerController',
	}).
	when('/'+pages_actions.LIST_TASKTYPE+'/:page/?per_page&order&field&search',
	{
		templateUrl: 'templates/task/list_tasktype.html',
		controller: 'TasktypemanagerController',
	}).	
	when('/'+pages_actions.EDIT_TASKTYPE+'/:id',
	{
		templateUrl: 'templates/task/create_tasktype.html',
		controller: 'TasktypemanagerController',
	}).
	when('/'+pages_actions.CREATE_STATUS+'',
	{
		templateUrl: 'templates/status/create_status.html',
		controller: 'StatusmanagerController'		
	}).
	when('/'+pages_actions.LIST_STATUS+'/:page',
	{
		templateUrl: 'templates/status/list_status.html',
		controller: 'StatusmanagerController',
	}).
	when('/'+pages_actions.LIST_STATUS+'/:page/?per_page&order&field&search',
	{
		templateUrl: 'templates/status/list_status.html',
		controller: 'StatusmanagerController',
	}).	
	when('/'+pages_actions.EDIT_STATUS+'/:id',
	{
		templateUrl: 'templates/status/create_status.html',
		controller: 'StatusmanagerController',
	}).
	when('/'+pages_actions.CREATE_TASK+'',
	{
		templateUrl: 'templates/task/create_task.html',
		controller: 'TaskmanagerController'		
	}).
	when('/'+pages_actions.LIST_TASK+'/:page',
	{
		templateUrl: 'templates/task/list_task.html',
		controller: 'TaskmanagerController',
	}).
	when('/'+pages_actions.LIST_TASK+'/:page/?per_page&order&assignedto&search&status&project&tasktype&priority',
	{
		templateUrl: 'templates/task/list_task.html',
		controller: 'TaskmanagerController',
	}).	
	when('/'+pages_actions.EDIT_TASK+'/:id',
	{
		templateUrl: 'templates/task/create_task.html',
		controller: 'TaskmanagerController',
	}).
	when('/'+pages_actions.VIEW_TASK+'/:id',
	{
		templateUrl: 'templates/task/view_task.html',
		controller: 'TaskmanagerController',
	}).
	when('/'+pages_actions.CREATE_PRIORITY+'',
	{
		templateUrl: 'templates/priority/create_priority.html',
		controller: 'PrioritymanagerController'		
	}).
	when('/'+pages_actions.LIST_PRIORITY+'/:page',
	{
		templateUrl: 'templates/priority/list_priority.html',
		controller: 'PrioritymanagerController',
	}).
	when('/'+pages_actions.LIST_PRIORITY+'/:page/?per_page&order&field&search',
	{
		templateUrl: 'templates/priority/list_priority.html',
		controller: 'PrioritymanagerController',
	}).	
	when('/'+pages_actions.EDIT_PRIORITY+'/:id',
	{
		templateUrl: 'templates/priority/create_priority.html',
		controller: 'PrioritymanagerController',
	}).
  otherwise(
	{
		redirectTo: '/home'
	});
}]);

angular.module('UserManagment').
run( function($rootScope, $location, $routeParams, Loginservices) {
	
	
});


