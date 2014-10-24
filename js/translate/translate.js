
var translations = {
	AUTH_ERROR: {
		not_auth: 'You are not authorised to view this page',
		no_perms: 'You do not have permissions to access this page'
	
	},
    CREATE_USER: {
		pagetitle: 'Create a new User',
		title: 'Create a new User',
		username: 'Username',
		email: 'User email',
		password: 'Password',
		user_type: 'User Type',
		
	},
	
	CREATE_PROJECT: {
		pagetitle: 'Create a Project',
		edittitle: 'Edit a Project',
		title: 'Create a Project',
		proj_title: 'Title',
		proj_desc: 'Description',
		proj_team: 'Teams',
		team: 'Project members'
			
	},
	
	CREATE_TASKTYPE: {
		pagetitle: 'Create a Task Type',
		edittitle: 'Edit a Task Type',
		title: 'Create a Task Type',
		proj_title: 'Task Type',
		
			
	},
	
	CREATE_TASK: {
		pagetitle: 'Create a Task',
		edittitle: 'Edit Task',
		title: 'Create a Task',
		task: 'Task Name',
		details: 'Task Details',
		assigned: 'Assigned To',
		project: 'Project Name',
		status: 'Task Status',
		priority: 'Task Priority',
		tasktype: 'Task Type',
		proj_title: 'Tasks',
		
			
	},
	
	CREATE_STATUS: {
		pagetitle: 'Create a Status',
		edittitle: 'Edit a Status',
		title: 'Create a Status',
		proj_title: 'Status',
		
			
	},
	
	CREATE_PRIORITY: {
		pagetitle: 'Create a Priority',
		edittitle: 'Edit a Priority',
		title: 'Create a Priority',
		proj_title: 'Priority',
		
			
	},
	
	CREATE_USERROLES: {
		pagetitle: 'Create a new Page / Action',
		title: 'Create a new Page / Action',
		name: 'Action Page / Action',
		role_code: 'Page URL'	
	},
	
	GENERAL: {
		add: 'Add',
		update: 'Update',
		cancel: 'Cancel',
		created_by: 'Created By',
		created_date: 'Created Date'
	},
	
	LISTICKET: {
		
	}
   
  };

angular.module('UserManagment')
.config(['$translateProvider', function($translateProvider) {
// Our translations will go in here
 $translateProvider
    .translations('en', translations)
    .preferredLanguage('en');

}]);