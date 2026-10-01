import { INodeProperties } from 'n8n-workflow';

export const taskInputs: INodeProperties[] = [
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['projecttask'],
				operation: ['gettasksofproject', 'gettasklistsofproject', 'postaddtasktotasklist'],
			},
		},
		default: '',
		placeholder: 'Enter the project ID',
		required: true,
		description: 'The ID of the project',
	},
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['projecttask'],
				operation: ['post'],
			},
		},
		default: '',
		description: 'The ID of the project',
		required: true,
	},
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['projecttask'],
				operation: [
					'get',
					'update',
					'delete',
					'settaskcustomfield',
					'addtag',
					'changestatus',
					'comments',
					'settaskassignee',
					'postaddtasktotasklist',
					'getcomments',
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
				resource: ['projecttask'],
				operation: ['post', 'update'],
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
				resource: ['projecttask'],
				operation: ['post'],
			},
		},
		default: undefined,
		description: 'The description of the task',
	},
	{
		displayName: 'Type of Work ID',
		name: 'typeOfWorkId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['projecttask'],
				operation: ['post'],
			},
		},
		default: undefined,
		description: 'The type of work ID for the task',
	},
	{
		displayName: 'Task Status ID',
		name: 'taskStatusId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['projecttask'],
				operation: ['post'],
			},
		},
		default: undefined,
		description: 'The task status ID for the task',
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['projecttask'],
				operation: ['post'],
			},
		},
		default: undefined,
		description: 'The due date for the task',
	},
	{
		displayName: 'Planned Duration',
		name: 'plannedDuration',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['projecttask'],
				operation: ['post'],
			},
		},
		default: undefined,
		description: 'The planned duration for the task in seconds',
	},
	{
		displayName: 'Text Value',
		name: 'textValue',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['projecttask'],
				operation: ['settaskcustomfield'],
			},
		},
		default: '',
		description: 'The text value of the custom field',
	},
	{
		displayName: 'Custom Field Definition ID',
		name: 'customFieldDefinitionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['projecttask'],
				operation: ['settaskcustomfield'],
			},
		},
		default: '',
		description: 'The ID of the custom field definition',
	},
	{
		displayName: 'Tag Name',
		name: 'tagName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['projecttask'],
				operation: ['addtag'],
			},
		},
		default: '',
		description: 'The name of the tag',
	},
	{
		displayName: 'Status ID',
		name: 'statusId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['projecttask'],
				operation: ['changestatus'],
			},
		},
		default: '',
		description: 'The ID of the status',
	},
	{
		displayName: 'Comment Message',
		name: 'commentMessage',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['projecttask'],
				operation: ['comments'],
			},
		},
		default: '',
		description: 'The message of the comment',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['projecttask'],
				operation: ['settaskassignee'],
			},
		},
		default: '',
		description: 'The ID of the user',
	},
	{
		displayName: 'Task List ID',
		name: 'taskListId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['projecttask'],
				operation: ['postaddtasktotasklist'],
			},
		},
		default: '',
		description: 'The task list to move the task to',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		default: {},
		displayOptions: { show: { resource: ['projecttask'], operation: ['update'] } },
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Derive Dates From Subtasks',
				name: 'deriveDatesFromSubtasks',
				type: 'boolean',
				default: false,
				description: 'Whether to adjust task dates to its subtasks',
			},
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			{ displayName: 'Due Date', name: 'dueOn', type: 'dateTime', default: '' },
			{
				displayName: 'Lane Order',
				name: 'laneOrder',
				type: 'number',
				default: 0,
				typeOptions: { minValue: 0 },
			},
			{
				displayName: 'Planned Duration',
				name: 'plannedDuration',
				type: 'number',
				default: 0,
				description: 'The planned workload in seconds',
				typeOptions: { minValue: 0 },
			},
			{
				displayName: 'Priority',
				name: 'isPrio',
				type: 'boolean',
				default: false,
				description: 'Whether the task is marked as a priority',
			},
			{ displayName: 'Start Date', name: 'startOn', type: 'dateTime', default: '' },
		],
	},
	{
		displayName: 'Delete Time Entries',
		name: 'deleteTimeTrackings',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['projecttask'], operation: ['delete'] } },
		description: 'Whether to also delete related time entries',
	},
];
