import { INodeProperties } from 'n8n-workflow';

export const projectMemberInputs: INodeProperties[] = [
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: { resource: ['projectmember'], operation: ['add', 'update', 'remove', 'getmembers'] },
		},
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: { resource: ['projectmember'], operation: ['add', 'update', 'remove'] },
		},
	},
	{
		displayName: 'Project Role ID',
		name: 'projectRoleId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['projectmember'], operation: ['add', 'update'] } },
	},
	{
		displayName: 'Responsible',
		name: 'isResponsible',
		type: 'boolean',
		default: false,
		description: 'Whether this member is responsible for the project',
		displayOptions: { show: { resource: ['projectmember'], operation: ['add', 'update'] } },
	},
];
