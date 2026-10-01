import { INodeProperties } from 'n8n-workflow';

export const typeOfWorkInputs: INodeProperties[] = [
	{
		displayName: 'Type of Work ID',
		name: 'typeOfWorkId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: { resource: ['typeofwork'], operation: ['get', 'update', 'delete', 'setarchived'] },
		},
	},
	{
		displayName: 'Name',
		name: 'workName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['typeofwork'], operation: ['create', 'update'] } },
	},
	{
		displayName: 'Replacement Type of Work ID',
		name: 'replacementTypeOfWorkId',
		type: 'string',
		default: '',
		description: 'Replacement for tasks and time entries using the deleted type of work',
		displayOptions: { show: { resource: ['typeofwork'], operation: ['delete'] } },
	},
	{
		displayName: 'Archived',
		name: 'isArchived',
		type: 'boolean',
		default: true,
		description: 'Whether to archive the type of work',
		displayOptions: { show: { resource: ['typeofwork'], operation: ['setarchived'] } },
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
				displayName: 'Icon',
				name: 'icon',
				type: 'string',
				default: '',
				description: 'Icon identifier from Get Type of Work Icons',
			},
		],
		displayOptions: { show: { resource: ['typeofwork'], operation: ['create'] } },
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
				displayName: 'Icon',
				name: 'icon',
				type: 'string',
				default: '',
				description: 'Icon identifier from Get Type of Work Icons',
			},
		],
		displayOptions: { show: { resource: ['typeofwork'], operation: ['update'] } },
	},
];
