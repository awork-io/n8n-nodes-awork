import { INodeProperties } from 'n8n-workflow';

export const fileInputs: INodeProperties[] = [
	{
		displayName: 'Parent Resource',
		name: 'parentType',
		type: 'options',
		default: 'tasks',
		options: [
			{ name: 'Company', value: 'companies' },
			{ name: 'Document', value: 'documents' },
			{ name: 'Project', value: 'projects' },
			{ name: 'Task', value: 'tasks' },
			{ name: 'User', value: 'users' },
		],
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['upload', 'uploadurl', 'get', 'getall', 'update', 'delete', 'download'],
			},
		},
	},
	{
		displayName: 'Parent ID',
		name: 'entityId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['upload', 'uploadurl', 'get', 'getall', 'update', 'delete', 'download'],
			},
		},
	},
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: { resource: ['file'], operation: ['get', 'update', 'delete', 'download'] },
		},
	},
	{
		displayName: 'Input Binary Field',
		name: 'inputBinaryProperty',
		type: 'string',
		default: 'data',
		required: true,
		description: 'Name of the incoming binary field containing the file to upload',
		displayOptions: { show: { resource: ['file'], operation: ['upload'] } },
	},
	{
		displayName: 'Output Binary Field',
		name: 'outputBinaryProperty',
		type: 'string',
		default: 'data',
		required: true,
		description: 'Name of the binary field that receives the downloaded file',
		displayOptions: { show: { resource: ['file'], operation: ['download'] } },
	},
	{
		displayName: 'File URL',
		name: 'fileUrl',
		type: 'string',
		default: '',
		required: true,
		description: 'Public URL of the file for awork to download',
		displayOptions: { show: { resource: ['file'], operation: ['uploadurl'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			{ displayName: 'Name', name: 'name', type: 'string', default: '' },
		],
		displayOptions: { show: { resource: ['file'], operation: ['uploadurl'] } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			{ displayName: 'Name', name: 'name', type: 'string', default: '' },
		],
		displayOptions: { show: { resource: ['file'], operation: ['update'] } },
	},
];
