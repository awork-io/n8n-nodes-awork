import { INodeProperties } from 'n8n-workflow';

export const checklistItemInputs: INodeProperties[] = [
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['checklistitem'],
				operation: ['create', 'update', 'get', 'getall', 'delete'],
			},
		},
	},
	{
		displayName: 'Checklist Item ID',
		name: 'checklistItemId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: { resource: ['checklistitem'], operation: ['get', 'update', 'delete'] },
		},
	},
	{
		displayName: 'Name',
		name: 'checklistName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['checklistitem'], operation: ['create', 'update'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Done',
				name: 'isDone',
				type: 'boolean',
				default: false,
				description: 'Whether the checklist item is complete',
			},
			{ displayName: 'Order', name: 'order', type: 'number', default: 0 },
		],
		displayOptions: { show: { resource: ['checklistitem'], operation: ['create'] } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Done',
				name: 'isDone',
				type: 'boolean',
				default: false,
				description: 'Whether the checklist item is complete',
			},
			{ displayName: 'Order', name: 'order', type: 'number', default: 0 },
		],
		displayOptions: { show: { resource: ['checklistitem'], operation: ['update'] } },
	},
];
