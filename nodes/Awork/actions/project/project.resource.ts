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
						baseType: 'projecttask',
						name: '={{$parameter["projectName"]}}',     // Project name
						description: '={{$parameter["projectDescription"]}}',  // Optional project description
						startDate: '={{$parameter["startDate"]}}', // Optional start date for the project
						dueDate: '={{$parameter["dueDate"]}}', // Optional due date for the project
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
	],
	default: 'get',
};
