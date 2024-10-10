import { INodeProperties } from 'n8n-workflow';
import { aworkApiPagination } from '../../GenericFunctions';

export const taskResource: INodeProperties =
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'projecttask',
			],
		},
	},
	options: [
		{
			name: 'Get Tasks of Project',
			value: 'gettasksofproject',
			action: 'Get tasks of a project',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/projects/{{$parameter["projectId"]}}/projecttasks',
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
			name: 'Get Task by ID',
			value: 'get',
			action: 'Get task by id',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/tasks/{{$parameter["taskId"]}}'
				}
			},
		},
		{
			name: 'Post',
			value: 'post',
			action: 'Create a project task',
			description: 'Create a task in a project by sending task details',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/tasks',
					body: {
						baseType: 'projecttask',
						entityId: '={{$parameter["projectId"]}}', // ID of the project the task belongs to
						name: '={{$parameter["taskName"]}}',     // Task name
						description: '={{$parameter["taskDescription"]}}',  // Optional task description
						dueDate: '={{$parameter["dueDate"]}}', // Optional due date for the task
						typeOfWorkId: '={{$parameter["typeOfWorkId"]}}', // Required type of work ID
						taskStatusId: '={{$parameter["taskStatusId"]}}', // Required task status ID
					}
				},
			},
		},
		{
			name: 'Set Custom Field',
			value: 'settaskcustomfield',
			action: 'Set a custom field',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/tasks/{{$parameter["taskId"]}}/setcustomfields',
					body: [
						{
							textValue: '={{$parameter["textValue"]}}',
							customFieldDefinitionId: '={{$parameter["customFieldDefinitionId"]}}',
						}
					]
				},
			},
		},
		{
			name: 'Add Tag',
			value: 'addtag',
			action: 'Add tag',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/tasks/{{$parameter["taskId"]}}/addtags',
					body: [
						{
							name: '={{$parameter["tagName"]}}',
						}
					]
				},
			},
		},
		{
			name: 'Change Status',
			value: 'changestatus',
			action: 'Change status',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/tasks/changestatuses',
					body: [
						{
							taskId: '={{$parameter["taskId"]}}',
							statusId: '={{$parameter["statusId"]}}',
						}
					]
				},
			},
		},
		{
			name: 'Add Comment',
			value: 'comments',
			action: 'Add comment',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/tasks/{{$parameter["taskId"]}}/comments',
					body: {
						message: '={{$parameter["commentMessage"]}}',
					}
				},
			},
		},
		{
			name: 'Set Task Assignee',
			value: 'settaskassignee',
			action: 'Set a task assignee',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/tasks/{{$parameter["taskId"]}}/setassignees',
					body: [
						'={{$parameter["userId"]}}'
					]
				},
			},
		},
	],
	default: 'get',
};
