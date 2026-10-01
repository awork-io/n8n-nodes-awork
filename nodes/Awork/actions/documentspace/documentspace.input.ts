import { INodeProperties } from 'n8n-workflow';

const fields: INodeProperties[] = [
	{
		displayName: 'Color',
		name: 'color',
		// awork uses named colors such as purple, rather than a hex color picker.
		// eslint-disable-next-line n8n-nodes-base/node-param-color-type-unused
		type: 'string',
		default: '',
		description: 'The display color of the document space',
	},
	{
		displayName: 'Emoji',
		name: 'emoji',
		type: 'string',
		default: '',
		description: 'The emoji icon for the document space',
	},
	{
		displayName: 'Order',
		name: 'order',
		type: 'number',
		default: 0,
		description: 'The position in the document space list',
	},
	{
		displayName: 'Workspace Access Level',
		name: 'workspaceAccessLevel',
		type: 'options',
		default: 'none',
		description: 'The access granted to all workspace users',
		options: [
			{ name: 'Manage', value: 'manage' },
			{ name: 'None', value: 'none' },
			{ name: 'Read', value: 'read' },
		],
	},
];

export const documentSpaceInputs: INodeProperties[] = [
	{
		displayName: 'Document Space ID',
		name: 'documentSpaceId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the document space',
		displayOptions: {
			show: { resource: ['documentspace'], operation: ['get', 'update', 'delete'] },
		},
	},
	{
		displayName: 'Document Space Name',
		name: 'documentSpaceName',
		type: 'string',
		default: '',
		required: true,
		description: 'The name of the document space to create',
		displayOptions: { show: { resource: ['documentspace'], operation: ['create'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: { show: { resource: ['documentspace'], operation: ['create'] } },
		options: fields,
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: { show: { resource: ['documentspace'], operation: ['update'] } },
		options: [
			fields[0],
			fields[1],
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the document space',
			},
			...fields.slice(2),
		],
	},
];
