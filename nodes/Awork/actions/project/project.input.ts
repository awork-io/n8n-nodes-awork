import { INodeProperties } from 'n8n-workflow';

export const projectInputs: INodeProperties[] = [
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: [
					'get',
					'update',
					'delete',
					'getprojectstatusesofproject',
					'gettaskstatuses',
					'postprojectstatus',
					'changeprojectstatus',
					'posttaskstatus',
					'gettasklists',
					'posttasklist',
					'getcomments',
					'gettasklist',
					'updatetasklist',
					'deletetasklist',
				],
			},
		},
		default: '',
		placeholder: 'Enter the project ID',
		required: true,
	},
	{
		displayName: 'Project Name',
		name: 'projectName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['post', 'update'],
			},
		},
		default: '',
		placeholder: 'Enter the project name',
		description: 'The name of the project',
		required: true,
	},
	{
		displayName: 'Project Description',
		name: 'projectDescription',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['post'],
			},
		},
		default: '',
		description: 'The description of the project',
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['post'],
			},
		},
		default: '',
		description: 'The start date for the project',
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['post'],
			},
		},
		default: '',
		description: 'The due date for the project',
	},
	{
		displayName: 'Project Type ID',
		name: 'projectTypeId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['post'],
			},
		},
		default: undefined,
		description: 'The project type ID for the project',
	},
	{
		displayName: 'Project Status ID',
		name: 'projectStatusId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['post'],
			},
		},
		default: undefined,
		description: 'The project status ID for the project',
	},
	{
		displayName: 'Project Template ID',
		name: 'projectTemplateId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['post'],
			},
		},
		default: '',
		description: 'The project template ID to use for the project',
	},
	{
		displayName: 'Status Name',
		name: 'statusName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['postprojectstatus', 'posttaskstatus'],
			},
		},
		default: 'Not Started',
		required: true,
	},
	{
		displayName: 'Status Type',
		name: 'statusType',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['postprojectstatus', 'posttaskstatus'],
			},
		},
		default: '',
		required: true,
	},
	{
		displayName: 'Task Status Icon',
		name: 'taskStatusIcon',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['posttaskstatus'],
			},
		},
		default: 'arrow_forward',
		required: true,
	},
	{
		displayName: 'Project Status ID',
		name: 'projectStatusId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['changeprojectstatus'],
			},
		},
		default: undefined,
		required: true,
	},
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['post'],
			},
		},
		default: '',
		description: 'The ID of the company to associate the project with',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		default: {},
		displayOptions: { show: { resource: ['project'], operation: ['update'] } },
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Billable by Default',
				name: 'isBillableByDefault',
				type: 'boolean',
				default: false,
				description: 'Whether project times are billable by default',
			},
			{ displayName: 'Company ID', name: 'companyId', type: 'string', default: '' },
			{
				displayName: 'Deduct Non-Billable Hours',
				name: 'deductNonBillableHours',
				type: 'boolean',
				default: false,
				description: 'Whether non-billable hours count toward the project budget',
			},
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			{ displayName: 'Due Date', name: 'dueDate', type: 'dateTime', default: '' },
			{
				displayName: 'Private',
				name: 'isPrivate',
				type: 'boolean',
				default: false,
				description: 'Whether the project is visible only to members and its creator',
			},
			{
				displayName: 'Project Key Visible',
				name: 'isProjectKeyVisible',
				type: 'boolean',
				default: false,
				description: 'Whether to display the project key',
			},
			{ displayName: 'Project Type ID', name: 'projectTypeId', type: 'string', default: '' },
			{ displayName: 'Start Date', name: 'startDate', type: 'dateTime', default: '' },
			{
				displayName: 'Time Budget',
				name: 'timeBudget',
				type: 'number',
				default: 0,
				description: 'The project time budget in seconds',
				typeOptions: { minValue: 0 },
			},
		],
	},
	{
		displayName: 'Delete Time Entries',
		name: 'deleteTimeTrackings',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['project'], operation: ['delete'] } },
		description: 'Whether to also delete related time entries',
	},
	{
		displayName: 'Task List ID',
		name: 'taskListId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['gettasklist', 'updatetasklist', 'deletetasklist'],
			},
		},
		required: true,
	},
	{
		displayName: 'Task List Name',
		name: 'taskListName',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: ['project'], operation: ['updatetasklist'] } },
		required: true,
	},
	{
		displayName: 'Update Fields',
		name: 'taskListUpdateFields',
		type: 'collection',
		default: {},
		displayOptions: { show: { resource: ['project'], operation: ['updatetasklist'] } },
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Hidden for External Users',
				name: 'isHiddenForConnectUsers',
				type: 'boolean',
				default: false,
				description: 'Whether tasks in the list are hidden from external workspace users',
			},
		],
	},
	{
		displayName: 'Delete Tasks',
		name: 'deleteTasks',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['project'], operation: ['deletetasklist'] } },
		description: 'Whether to also delete all tasks in the list',
	},
	{
		displayName: 'Delete Time Entries',
		name: 'deleteTimes',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['project'], operation: ['deletetasklist'] } },
		description: 'Whether to also delete time entries related to tasks in the list',
	},
];
