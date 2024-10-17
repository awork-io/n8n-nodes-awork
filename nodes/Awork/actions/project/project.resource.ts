import { INodeProperties } from 'n8n-workflow';
import { aworkApiPagination } from '../../GenericFunctions';

export const projectResource: INodeProperties =
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'project',
			],
		},
	},
	options: [
		{
			name: 'Get All Projects',
			value: 'getall',
			action: 'Get projects',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/projects',
					qs: {
						filterBy: '={{$parameter["filterBy"] || undefined}}',
						orderBy: '={{$parameter["orderBy"] || undefined}}',
					},
				},
				operations: {
					pagination: aworkApiPagination,
				},
				send: {
					paginate: true,
				}
			},
		},
		{
			name: 'Get Project by ID',
			value: 'get',
			action: 'Get project by id',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/projects/{{$parameter["projectId"]}}'
				}
			},
		},
		{
			name: 'Get All Project Statuses',
			value: 'getprojectstatuses',
			action: 'Get projects statuses',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/projectstatuses',
					qs: {
						filterBy: '={{$parameter["filterBy"] || undefined}}',
						orderBy: '={{$parameter["orderBy"] || undefined}}',
					},
				},
				operations: {
					pagination: aworkApiPagination,
				},
				send: {
					paginate: true,
				}
			},
		},
		{
			name: 'Create Project',
			value: 'post',
			action: 'Create a project',
			description: 'Create a project by sending project details',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/projects',
					body: {
						name: '={{$parameter["projectName"]}}',
						description: '={{$parameter["projectDescription"]}}',
						startDate: '={{$parameter["startDate"]}}',
						dueDate: '={{$parameter["dueDate"]}}',
						projectTypeId: '={{$parameter["projectTypeId"] || undefined}}',
						projectStatusId: '={{$parameter["projectStatusId"] || undefined}}',
					}
				},
			},
		},
		{
			name: 'Get Task Statuses of Project',
			value: 'gettaskstatuses',
			action: 'Get task statuses of project by id',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/projects/{{$parameter["projectId"]}}/taskstatuses',
					qs: {
						filterBy: '={{$parameter["filterBy"] || undefined}}',
						orderBy: '={{$parameter["orderBy"] || undefined}}',
					},
				},
				operations: {
					pagination: aworkApiPagination,
				},
				send: {
					paginate: true,
				}
			},
		},
		{
			name: 'Get Task Lists of Project',
			value: 'gettasklists',
			action: 'Get task lists of project by id',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/projects/{{$parameter["projectId"]}}/tasklists',
					qs: {
						filterBy: '={{$parameter["filterBy"] || undefined}}',
						orderBy: '={{$parameter["orderBy"] || undefined}}',
					},
				},
				operations: {
					pagination: aworkApiPagination,
				},
				send: {
					paginate: true,
				}
			},
		},
		{
			name: 'Create Project Status',
			value: 'postprojectstatus',
			action: 'Create a project status',
			description: 'Create a project status by sending project status details',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/projects/{{$parameter["projectId"]}}/projectstatuses',
					body: {
						name: '={{$parameter["statusName"]}}',
						type: '={{$parameter["statusType"]}}'
					}
				},
			},
		},
		{
			name: 'Change Project Status',
			value: 'changeprojectstatus',
			action: 'Change the project status',
			description: 'Changes the project status of a project',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/projects/{{$parameter["projectId"]}}/changestatus',
					body: {
						projectStatusId: '={{$parameter["projectStatusId"]}}'
					}
				},
			},
		},
		{
			name: 'Create Task Status',
			value: 'posttaskstatus',
			action: 'Create a task status',
			description: 'Create a task status by sending task status details',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/projects/{{$parameter["projectId"]}}/taskstatuses',
					body: {
						name: '={{$parameter["statusName"]}}',
						type: '={{$parameter["statusType"]}}',
						icon: '={{$parameter["taskStatusIcon"]}}'
					}
				},
			},
		},
		{
			name: 'Create Task List',
			value: 'posttasklist',
			action: 'Create a task list',
			description: 'Create a task list for the project',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/projects/{{$parameter["projectId"]}}/tasklists',
					body: {
						name: '={{$parameter["name"]}}'
					}
				},
			},
		},
	],
	default: 'get',
};
