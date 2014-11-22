var btfieldManager = function () {

	var fields = {};
	fields.create_user = 	
		 {
			username:{ 
						name: 'username', 
						error: { 
								0: 'It is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			email: { 
						name: 'email', 
						error: { 0: 'It is Required',
								 1: 'Valid Email'
						}, 
						validation: {
								0:'required',
								1:'email'
						},
					    value: ''
					},
			password: { 
						name: 'password', 
						error: { 
							0: 'It is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''		
					},
			user_type: {
						name: 'user_type',
						error: {
						
						},
						validation: {
						},
						value: ''
			}
			
		};
		
		fields.edit_user = 	
		 {
			username:{ 
						name: 'username', 
						error: { 
								0: 'It is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			email: { 
						name: 'email', 
						error: { 0: 'It is Required',
								 1: 'Valid Email'
						}, 
						validation: {
								0:'required',
								1:'email'
						},
					    value: ''
					},
			user_type: {
						name: 'user_type',
						error: {
						
						},
						validation: {
						},
						value: ''
			}		
			
		};
		
		fields.create_usertype = 	
		{
			name:{ 
						name: 'type', 
						error: { 
								0: 'It is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
		};
		
		fields.edit_usertype = 	
		{
			name:{ 
						name: 'type', 
						error: { 
								0: 'It is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
		};
		
		
		fields.create_roles = 	
		{
			name:{ 
						name: 'name', 
						error: { 
								0: 'Name is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			url:{ 
						name: 'url', 
						error: { 
								0: 'URL is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			key:{ 
						name: 'key', 
						error: { 
								0: 'Key is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			is_public: {
						name: 'is_public',
						error: {
						
						},
						validation: {
						},
						value: ''
			}
		};
		
		fields.edit_roles = 	
		{
			name:{ 
						name: 'name', 
						error: { 
								0: 'Name is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			url:{ 
						name: 'url', 
						error: { 
								0: 'URL is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			key:{ 
						name: 'key', 
						error: { 
								0: 'Key is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			
			is_public: {
						name: 'is_public',
						error: {
						
						},
						validation: {
						},
						value: ''
			}
		};
		
		fields.create_project = 	
		{
			title:{ 
						name: 'title', 
						error: { 
								0: 'Title Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
			},
			description:{ 
						name: 'description', 
						error: { 
								0: 'Description Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
			},
		};
		
		fields.edit_project = 	
		{
			title:{ 
						name: 'title', 
						error: { 
								0: 'Title Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
			},
			description:{ 
						name: 'description', 
						error: { 
								0: 'Description Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
			},
		};
		
		fields.create_tasktype = 	
		{
			name:{ 
						name: 'type', 
						error: { 
								0: 'It is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			color:{ 
						name: 'color', 
						error: { 
								0: 'Colour Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
		};
		
		fields.edit_tasktype = 	
		{
			name:{ 
						name: 'type', 
						error: { 
								0: 'It is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			color:{ 
						name: 'color', 
						error: { 
								0: 'Colour Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
		};
		
		fields.create_status = 	
		{
			name:{ 
						name: 'type', 
						error: { 
								0: 'It is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			color:{ 
						name: 'color', 
						error: { 
								0: 'Colour Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
		};
		
		fields.edit_status = 	
		{
			name:{ 
						name: 'type', 
						error: { 
								0: 'It is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
				},
			color:{ 
						name: 'color', 
						error: { 
								0: 'Colour Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
		};
		
		fields.create_milestone = 	
		{
			name:{ 
						name: 'type', 
						error: { 
								0: 'Milestone Name Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			start_date:{ 
						name: 'start_date', 
						error: { 
								0: 'Start Date Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
			},
			end_date:{ 
						name: 'end_date', 
						error: { 
								0: 'End Date Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
			},
		};
		
		fields.edit_milestone = 	
		{
			name:{ 
						name: 'type', 
						error: { 
								0: 'Milestone Name Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			start_date:{ 
						name: 'start_date', 
						error: { 
								0: 'Start Date Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
			},
			end_date:{ 
						name: 'end_date', 
						error: { 
								0: 'End Date Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
			},
		};
		
		
		fields.create_priority = 	
		{
			name:{ 
						name: 'type', 
						error: { 
								0: 'It is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			color:{ 
						name: 'color', 
						error: { 
								0: 'Colour Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
		};
		
		fields.edit_priority = 	
		{
			name:{ 
						name: 'type', 
						error: { 
								0: 'It is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			color:{ 
						name: 'color', 
						error: { 
								0: 'Colour Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
		};
		
		fields.create_task = 	
		{
			title:{ 
						name: 'title', 
						error: { 
								0: 'Title Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			details:{ 
						name: 'details', 
						error: { 
								0: 'Details Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			project_id: {
						name: 'project_id',
						error: {
							0: 'Project Required' 
						},
						validation: {
							0:'required'
						},
						value: ''
			},
			assigned_to: {
						name: 'assigned_to',
						error: {
							0: 'Assigned To Required' 
						},
						validation: {
							0:'required'
						},
						value: ''
			},
			task_type_id: {
						name: 'task_type_id',
						error: {
							0: 'Task Type Required' 
						},
						validation: {
							0:'required'
						},
						value: ''
			},
			status_id: {
						name: 'status_id',
						error: {
							0: 'Status Required' 
						},
						validation: {
							0:'required'
						},
						value: ''
			},
			
			priority_id: {
						name: 'priority_id',
						error: {
							0: 'Status Required' 
						},
						validation: {
							0:'required'
						},
						value: ''
			},
			
			milestone_id: {
						name: 'milestone_id',
						error: {
							0: 'Milestone Required' 
						},
						validation: {
							0:'required'
						},
						value: ''
			},
		};
		
		fields.edit_task = 	
		{
			title:{ 
						name: 'title', 
						error: { 
								0: 'It is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			details:{ 
						name: 'details', 
						error: { 
								0: 'It is Required' 
						}, 
						validation: {
								0:'required'
						},
					    value: ''						
					},
			project_id: {
						name: 'project_id',
						error: {
							0: 'It is Required' 
						},
						validation: {
							0:'required'
						},
						value: ''
			},
			assigned_to: {
						name: 'assigned_to',
						error: {
							0: 'It is Required' 
						},
						validation: {
							0:'required'
						},
						value: ''
			},
			task_type_id: {
						name: 'task_type_id',
						error: {
							0: 'It is Required' 
						},
						validation: {
							0:'required'
						},
						value: ''
			},
			status_id: {
						name: 'status_id',
						error: {
							0: 'It is Required' 
						},
						validation: {
							0:'required'
						},
						value: ''
			},
			priority_id: {
						name: 'priority_id',
						error: {
							0: 'Status Required' 
						},
						validation: {
							0:'required'
						},
						value: ''
			},
			milestone_id: {
						name: 'milestone_id',
						error: {
							0: 'Milestone Required' 
						},
						validation: {
							0:'required'
						},
						value: ''
			},
		};
		
		var getfields =  function() {
			/* Polymorphism here */
			console.log('arguments',arguments);
			if(arguments.length == 1 ) {
				return fields[arguments[0]];
			} 
		}
		
		return getfields;
}();		