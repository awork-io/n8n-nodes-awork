import { INodeProperties } from 'n8n-workflow';

export const taskInputs: INodeProperties[] =
	[
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
						'gettasksofproject',
					],
				},
			},
			default: '',
			placeholder: 'Enter the project ID',
			required: true,
			description: 'The ID of the project to retrieve tasks for',
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
			description: 'The ID of the project in which the task will be created',
			required: true,
		},
		{
			displayName: 'Task ID',
			name: 'taskId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'projecttask',
					],
					operation: [
						'get',
						'settaskcustomfield',
					],
				},
			},
			default: '',
			placeholder: 'Enter the task ID',
			required: true,
			description: 'The ID of the task to retrieve',
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
		{
			displayName: 'Text Value',
			name: 'textValue',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'projecttask',
					],
					operation: [
						'settaskcustomfield',
					],
				},
			},
			default: '',
			description: 'The text value of the custom field'
		},
		{
			displayName: 'Custom Field Definition ID',
			name: 'customFieldDefinitionId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'projecttask',
					],
					operation: [
						'settaskcustomfield',
					],
				},
			},
			default: '',
			description: 'The ID of the custom field definition'
		}
	];
