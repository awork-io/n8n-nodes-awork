import { INodeProperties } from 'n8n-workflow';

export const absenceInputs: INodeProperties[] = [
	{
		displayName: 'Absence ID',
		name: 'absenceId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['absence'], operation: ['get', 'update', 'delete'] } },
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['absence'], operation: ['create', 'update'] } },
	},
	{
		displayName: 'Start Date',
		name: 'startOn',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['absence'], operation: ['create', 'update'] } },
	},
	{
		displayName: 'End Date',
		name: 'endOn',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['absence'], operation: ['create', 'update'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			{
				displayName: 'External Provider',
				name: 'externalProvider',
				type: 'string',
				default: '',
				description:
					'Provider managing this absence. When set, users cannot edit or delete the absence in awork.',
			},
			{
				displayName: 'Half Day on End',
				name: 'isHalfDayOnEnd',
				type: 'boolean',
				default: false,
				description:
					'Whether the absence ends with a half day. For a single day, selects the second half; for multiple days, the first half of the last day.',
			},
			{
				displayName: 'Half Day on Start',
				name: 'isHalfDayOnStart',
				type: 'boolean',
				default: false,
				description:
					'Whether the absence starts with a half day. For a single day, selects the first half; for multiple days, the second half of the first day.',
			},
		],
		displayOptions: { show: { resource: ['absence'], operation: ['create'] } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			{
				displayName: 'External Provider',
				name: 'externalProvider',
				type: 'string',
				default: '',
				description:
					'Provider managing this absence. When set, users cannot edit or delete the absence in awork.',
			},
			{
				displayName: 'Half Day on End',
				name: 'isHalfDayOnEnd',
				type: 'boolean',
				default: false,
				description:
					'Whether the absence ends with a half day. For a single day, selects the second half; for multiple days, the first half of the last day.',
			},
			{
				displayName: 'Half Day on Start',
				name: 'isHalfDayOnStart',
				type: 'boolean',
				default: false,
				description:
					'Whether the absence starts with a half day. For a single day, selects the first half; for multiple days, the second half of the first day.',
			},
		],
		displayOptions: { show: { resource: ['absence'], operation: ['update'] } },
	},
];
