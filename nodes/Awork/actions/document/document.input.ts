import { INodeProperties } from 'n8n-workflow';

export const documentInputs: INodeProperties[] = [
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get', 'getcontent', 'delete', 'update', 'updatecontent'],
			},
		},
		default: '',
		placeholder: 'Enter the document ID',
		required: true,
		description: 'The ID of the document',
	},
	{
		displayName: 'Document Space ID',
		name: 'documentSpaceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['getdocumentsofdocumentspace'],
			},
		},
		default: '',
		placeholder: 'Enter the document space ID',
		required: true,
		description: 'The ID of the document space',
	},
	{
		displayName: 'Document Space ID',
		name: 'documentSpaceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'Enter the document space ID',
		description:
			'The document space where the document will be created. Leave empty for a project, task, or private document.',
	},
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'Enter the project ID',
		description:
			'The project where the document will be created. Leave empty for a document space, task, or private document.',
	},
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['getdocumentsofproject'],
			},
		},
		default: '',
		placeholder: 'Enter the project ID',
		required: true,
		description: 'The ID of the project',
	},
	{
		displayName: 'Document Name',
		name: 'documentName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'Enter the document name',
		required: true,
		description: 'The name of the document',
	},
	{
		displayName: 'Document Content',
		name: 'documentContent',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create', 'updatecontent'],
			},
		},
		default: '',
		placeholder: 'Enter the document content',
		description: 'The HTML or Markdown content of the document',
	},
	{
		displayName: 'Emoji',
		name: 'emoji',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'Enter an emoji (e.g., 📄)',
		description: 'An emoji icon for the document',
	},
	{
		displayName: 'Parent Document ID',
		name: 'parentId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'Enter the parent document ID',
		description:
			'The ID of another document in the same project or document space to nest this document under',
	},
	{
		displayName: 'Content Format',
		name: 'contentFormat',
		type: 'options',
		default: 'html',
		description: 'The input format of the document content',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create', 'updatecontent'],
			},
		},
		options: [
			{
				name: 'HTML',
				value: 'html',
			},
			{
				name: 'Markdown',
				value: 'markdown',
			},
		],
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Document Space ID',
				name: 'documentSpaceId',
				type: 'string',
				default: '',
				description: 'The ID of the document space to move the document to',
			},
			{
				displayName: 'Emoji',
				name: 'emoji',
				type: 'string',
				default: '',
				description: 'The emoji icon for the document',
			},
			{
				displayName: 'Hidden for Connect Users',
				name: 'isHiddenForConnectUsers',
				type: 'boolean',
				default: false,
				description: 'Whether the document is hidden for Connect users',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the document',
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'number',
				default: 0,
				description: 'The position in the document list',
			},
			{
				displayName: 'Parent Document ID',
				name: 'parentId',
				type: 'string',
				default: '',
				description: 'The ID of the parent document',
			},
			{
				displayName: 'Private',
				name: 'isPrivate',
				type: 'boolean',
				default: false,
				description: 'Whether the document is private',
			},
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				default: '',
				description: 'The ID of the referenced project',
			},
			{
				displayName: 'Task ID',
				name: 'taskId',
				type: 'string',
				default: '',
				description: 'The ID of the referenced task',
			},
			{
				displayName: 'Workspace Access Level',
				name: 'workspaceAccessLevel',
				type: 'options',
				default: 'none',
				description: 'The access granted to all workspace users',
				options: [
					{
						name: 'Manage',
						value: 'manage',
					},
					{
						name: 'None',
						value: 'none',
					},
					{
						name: 'Read',
						value: 'read',
					},
				],
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Hidden for Connect Users',
				name: 'isHiddenForConnectUsers',
				type: 'boolean',
				default: false,
				description: 'Whether the document is hidden for Connect users',
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'number',
				default: 0,
				description: 'The position in the document list',
			},
			{
				displayName: 'Private',
				name: 'isPrivate',
				type: 'boolean',
				default: false,
				description: 'Whether the document is private',
			},
			{
				displayName: 'Task ID',
				name: 'taskId',
				type: 'string',
				default: '',
				description: 'The ID of the referenced task',
			},
			{
				displayName: 'Workspace Access Level',
				name: 'workspaceAccessLevel',
				type: 'options',
				default: 'none',
				description: 'The access granted to all workspace users',
				options: [
					{
						name: 'Manage',
						value: 'manage',
					},
					{
						name: 'None',
						value: 'none',
					},
					{
						name: 'Read',
						value: 'read',
					},
				],
			},
		],
	},
	{
		displayName: 'Also Delete Children',
		name: 'alsoDeleteChildren',
		type: 'boolean',
		default: true,
		description:
			"Whether to delete child documents too. If disabled, children are moved to the deleted document's parent.",
		displayOptions: { show: { resource: ['document'], operation: ['delete'] } },
	},
];
