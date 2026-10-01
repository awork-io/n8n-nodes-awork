import { INodeProperties } from 'n8n-workflow';

export const tagInputs: INodeProperties[] = [
	{
		displayName: 'Parent Resource',
		name: 'parentType',
		type: 'options',
		default: 'tasks',
		options: [
			{ name: 'Company', value: 'companies' },
			{ name: 'Project', value: 'projects' },
			{ name: 'Task', value: 'tasks' },
			{ name: 'User', value: 'users' },
		],
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['gettags', 'getentitytags', 'add', 'remove', 'update', 'delete'],
			},
		},
	},
	{
		displayName: 'Parent ID',
		name: 'entityId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['tag'], operation: ['getentitytags', 'add', 'remove'] } },
	},
	{
		displayName: 'Tag Name',
		name: 'tagName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: { resource: ['tag'], operation: ['add', 'remove', 'update', 'delete'] },
		},
	},
	{
		displayName: 'Old Tag Name',
		name: 'oldTagName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['tag'], operation: ['update'] } },
	},
	{
		displayName: 'Tag Color',
		name: 'tagColor',
		type: 'options',
		default: '',
		options: [
			{ name: 'Arctic', value: 'arctic' },
			{ name: 'Azure', value: 'azure' },
			{ name: 'Blue', value: 'blue' },
			{ name: 'Coral', value: 'coral' },
			{ name: 'Default', value: '' },
			{ name: 'Green', value: 'green' },
			{ name: 'Purple', value: 'purple' },
			{ name: 'Red', value: 'red' },
			{ name: 'Teal', value: 'teal' },
			{ name: 'Violet', value: 'violet' },
			{ name: 'Yellow', value: 'yellow' },
		],
		displayOptions: { show: { resource: ['tag'], operation: ['add', 'update'] } },
	},
	{
		displayName: 'Merge Existing Tags',
		name: 'shouldMerge',
		type: 'boolean',
		default: false,
		description: 'Whether to merge with a tag of the new name if it already exists',
		displayOptions: { show: { resource: ['tag'], operation: ['update'] } },
	},
];
