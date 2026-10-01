import { INodeProperties } from 'n8n-workflow';

const timeFields: INodeProperties[] = [
	{
		displayName: 'Duration (Seconds)',
		name: 'duration',
		type: 'number',
		default: 3600,
		typeOptions: { minValue: 0 },
		description:
			'Duration in seconds. Provide either a duration or an end time for a completed entry.',
	},
	{
		displayName: 'End Date (UTC)',
		name: 'endDateUtc',
		type: 'dateTime',
		default: '',
		description: 'UTC date when the entry ended',
	},
	{
		displayName: 'End Time (UTC)',
		name: 'endTimeUtc',
		type: 'string',
		default: '',
		placeholder: '10:00:00',
		description: 'UTC time in HH:mm:ss format',
	},
	{
		displayName: 'Is Billable',
		name: 'isBillable',
		type: 'boolean',
		default: false,
		description: 'Whether the time entry is billable',
	},
	{
		displayName: 'Is Billed',
		name: 'isBilled',
		type: 'boolean',
		default: false,
		description: 'Whether the time entry has been billed',
	},
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		default: '',
		description: 'A note describing the work',
	},
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		default: '',
		description: 'The project to associate with this entry',
	},
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		default: '',
		description: 'The task to associate with this entry',
	},
];
const startFields: INodeProperties[] = [
	{
		displayName: 'Start Date (UTC)',
		name: 'startDateUtc',
		type: 'dateTime',
		default: '',
		description: 'UTC date when the entry started',
	},
	{
		displayName: 'Start Time (UTC)',
		name: 'startTimeUtc',
		type: 'string',
		default: '',
		placeholder: '09:00:00',
		description: 'UTC time in HH:mm:ss format',
	},
];

export const timeEntryInputs: INodeProperties[] = [
	...[
		{ displayName: 'Time Entry ID', name: 'timeEntryId', operations: ['get', 'update', 'delete'] },
		{ displayName: 'Project ID', name: 'projectId', operations: ['gettimeentriesofproject'] },
		{ displayName: 'Task ID', name: 'taskId', operations: ['gettimeentriesoftask'] },
		{ displayName: 'User ID', name: 'userId', operations: ['create'] },
		{ displayName: 'Type of Work ID', name: 'typeOfWorkId', operations: ['create', 'update'] },
	].map(
		({ operations, ...field }): INodeProperties => ({
			...field,
			type: 'string',
			default: '',
			required: true,
			displayOptions: { show: { resource: ['timeentry'], operation: operations } },
		}),
	),
	{
		displayName: 'Timezone',
		name: 'timezone',
		type: 'string',
		default: 'Europe/Berlin',
		required: true,
		description:
			'Original IANA timezone of the entry, for example Europe/Berlin. Date and time inputs are in UTC.',
		displayOptions: { show: { resource: ['timeentry'], operation: ['create', 'update'] } },
	},
	...startFields.map(
		(field): INodeProperties => ({
			...field,
			required: true,
			displayOptions: { show: { resource: ['timeentry'], operation: ['create'] } },
		}),
	),
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: { show: { resource: ['timeentry'], operation: ['create'] } },
		options: timeFields,
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: { show: { resource: ['timeentry'], operation: ['update'] } },
		options: [
			...timeFields,
			...startFields,
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string' as const,
				default: '',
				description: 'The user who tracked the time',
			},
		].sort((a, b) => a.displayName.localeCompare(b.displayName)),
	},
];
