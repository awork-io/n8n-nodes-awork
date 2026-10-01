import { INodeProperties } from 'n8n-workflow';

export const commentInputs: INodeProperties[] = [
	{
		displayName: 'Parent Resource',
		name: 'parentType',
		type: 'options',
		default: 'tasks',
		options: [
			{ name: 'Document', value: 'documents' },
			{ name: 'Project', value: 'projects' },
			{ name: 'Task', value: 'tasks' },
		],
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['create', 'get', 'getall', 'update', 'delete', 'setresolved'],
			},
		},
	},
	{
		displayName: 'Parent ID',
		name: 'entityId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID of the project, task, or document that owns the comment',
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['create', 'update', 'get', 'getall', 'delete', 'setresolved'],
			},
		},
	},
	{
		displayName: 'Comment ID',
		name: 'commentId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: { resource: ['comment'], operation: ['get', 'update', 'delete', 'setresolved'] },
		},
	},
	{
		displayName: 'Message',
		name: 'commentMessage',
		type: 'string',
		default: '',
		required: true,
		typeOptions: { rows: 4 },
		displayOptions: { show: { resource: ['comment'], operation: ['create', 'update'] } },
	},
	{
		displayName: 'Resolved',
		name: 'isResolved',
		type: 'boolean',
		default: true,
		description: 'Whether the document comment is resolved',
		displayOptions: { show: { resource: ['comment'], operation: ['setresolved'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Author User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'Author of the comment. Defaults to the authenticated user.',
			},
			{
				displayName: 'Hidden for Connect Users',
				name: 'isHiddenForConnectUsers',
				type: 'boolean',
				default: false,
				description: 'Whether the comment is hidden for Connect users',
			},
			{
				displayName: 'Reply to Comment ID',
				name: 'inReplyToCommentId',
				type: 'string',
				default: '',
			},
		],
		displayOptions: { show: { resource: ['comment'], operation: ['create'] } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Author User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'Author of the comment. Defaults to the authenticated user.',
			},
			{
				displayName: 'Hidden for Connect Users',
				name: 'isHiddenForConnectUsers',
				type: 'boolean',
				default: false,
				description: 'Whether the comment is hidden for Connect users',
			},
		],
		displayOptions: { show: { resource: ['comment'], operation: ['update'] } },
	},
];
