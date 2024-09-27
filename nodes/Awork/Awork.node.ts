import { INodeType, INodeTypeDescription } from 'n8n-workflow';

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
				name: 'AworkApi',
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
								url: 'api/v1/projects',
							},
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
								// Placeholder for project id in URL
								url: '=api/v1/projects/{{$parameter["projectId"]}}/projecttasks',
							},
						},
					},
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
		]
	};
}
