import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { aworkApiPagination, simplifyGetResponse } from './GenericFunctions';

export class Awork implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details
		displayName: 'awork',
		name: 'awork',
		icon: 'file:awork.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Automate your workflows with the awork API',
		defaults: {
			name: 'awork',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'aworkApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.awork.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'x-originating-app': 'n8n',
			},
		},
		// Operations the node supports
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Project Task',
						value: 'projecttask',
					},
				],
				default: 'project',
			},
			// Operations for the Project resource
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
						name: 'Get',
						value: 'get',
						action: 'Get projects',
						description: 'Get all projects',
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
				],
				default: 'get',
			},
			// Operations for the Project Task resource
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
						name: 'Get',
						value: 'get',
						action: 'Get tasks of a project',
						description: 'Get all tasks of a project',
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
							output: {
								postReceive: [simplifyGetResponse],
							},
						},
					}
				],
				default: 'get',
			},
			// Add an input field for the project ID
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				displayOptions: {
					show: {
						resource: [
							'projecttask',
						],
						operation: [
							'get',
						],
					},
				},
				default: '',
				placeholder: 'Enter the project ID',
				required: true,
				description: 'The ID of the project to retrieve tasks from',
			},
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				displayOptions: {
					show: {
						resource: [
							'projecttask',
						],
						operation: [
							'post',
						],
					},
				},
				default: '',
				description: 'The ID of the project to which the task will be added',
				required: true,
			},
			{
				displayName: 'Task Name',
				name: 'taskName',
				type: 'string',
				displayOptions: {
					show: {
						resource: [
							'projecttask',
						],
						operation: [
							'post',
						],
					},
				},
				default: '',
				placeholder: 'Enter the task name',
				description: 'The name of the task',
				required: true,
			},
			{
				displayName: 'Task Description',
				name: 'taskDescription',
				type: 'string',
				displayOptions: {
					show: {
						resource: [
							'projecttask',
						],
						operation: [
							'post',
						],
					},
				},
				default: '',
				description: 'A brief description of the task'
			},
			{
				displayName: 'Type of Work ID',
				name: 'typeOfWorkId',
				type: 'string',
				displayOptions: {
					show: {
						resource: [
							'projecttask',
						],
						operation: [
							'post',
						],
					},
				},
				default: '',
				description: 'The type of work ID for the task',
				required: true,
			},
			{
				displayName: 'Task Status ID',
				name: 'taskStatusId',
				type: 'string',
				displayOptions: {
					show: {
						resource: [
							'projecttask',
						],
						operation: [
							'post',
						],
					},
				},
				default: '',
				description: 'The task status ID for the task',
				required: true,
			},
			{
				displayName: 'Due Date',
				name: 'dueDate',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: [
							'projecttask',
						],
						operation: [
							'post',
						],
					},
				},
				default: '',
				description: 'The due date for the task'
			},
			// Optional fields for pagination and filtering
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: [
							'project',
							'projecttask',
						],
						operation: ['get'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit'
			},
			{
				displayName: 'Filter By',
				name: 'filterBy',
				type: 'string',
				displayOptions: {
					show: {
						resource: [
							'project',
							'projecttask',
						],
						operation: [
							'get',
						],
					},
				},
				default: '',
				placeholder: 'e.g., duration gt 5',
				description: 'Filter the results by specific criteria. See https://developers.awork.com/filtering for details.'
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				displayOptions: {
					show: {
						resource: [
							'project',
							'projecttask',
						],
						operation: [
							'get',
						],
					},
				},
				default: '',
				placeholder: 'e.g., FirstName asc',
				description: 'Order the results by a specific field and direction. See https://developers.awork.com/ordering for details.'
			},
		],
	};
}
