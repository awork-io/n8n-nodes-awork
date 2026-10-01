import { INodeProperties } from 'n8n-workflow';

export const customFieldInputs: INodeProperties[] = [
	{
		displayName: 'Parent Resource',
		name: 'parentType',
		type: 'options',
		default: 'tasks',
		options: [
			{ name: 'Project', value: 'projects' },
			{ name: 'Task', value: 'tasks' },
		],
		displayOptions: { show: { resource: ['customfield'], operation: ['getvalues', 'setvalue'] } },
	},
	{
		displayName: 'Parent ID',
		name: 'entityId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['customfield'], operation: ['getvalues', 'setvalue'] } },
	},
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['customfield'], operation: ['getprojectdefinitions'] } },
	},
	{
		displayName: 'Custom Field Definition ID',
		name: 'customFieldDefinitionId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['customfield'], operation: ['setvalue'] } },
	},
	{
		displayName: 'Value Type',
		name: 'valueType',
		type: 'options',
		default: 'textValue',
		options: [
			{ name: 'Boolean', value: 'booleanValue' },
			{ name: 'Client', value: 'clientIdValue' },
			{ name: 'Date / Date and Time', value: 'dateValue' },
			{ name: 'Number', value: 'numberValue' },
			{ name: 'Selection', value: 'selectionOptionIdValue' },
			{ name: 'Text / Link', value: 'textValue' },
			{ name: 'User', value: 'userIdValue' },
		],
		displayOptions: { show: { resource: ['customfield'], operation: ['setvalue'] } },
	},
	{
		displayName: 'Clear Value',
		name: 'clearValue',
		type: 'boolean',
		default: false,
		description: 'Whether to clear the selected custom field value',
		displayOptions: { show: { resource: ['customfield'], operation: ['setvalue'] } },
	},
	{
		displayName: 'Boolean Value',
		name: 'booleanValue',
		type: 'boolean',
		default: false,
		required: true,
		description: 'Whether the custom field is enabled',
		displayOptions: {
			show: {
				resource: ['customfield'],
				operation: ['setvalue'],
				valueType: ['booleanValue'],
				clearValue: [false],
			},
		},
	},
	{
		displayName: 'Client ID',
		name: 'clientIdValue',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['customfield'],
				operation: ['setvalue'],
				valueType: ['clientIdValue'],
				clearValue: [false],
			},
		},
	},
	{
		displayName: 'Date Value',
		name: 'dateValue',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['customfield'],
				operation: ['setvalue'],
				valueType: ['dateValue'],
				clearValue: [false],
			},
		},
	},
	{
		displayName: 'Number Value',
		name: 'numberValue',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['customfield'],
				operation: ['setvalue'],
				valueType: ['numberValue'],
				clearValue: [false],
			},
		},
	},
	{
		displayName: 'Selection Option ID',
		name: 'selectionOptionIdValue',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['customfield'],
				operation: ['setvalue'],
				valueType: ['selectionOptionIdValue'],
				clearValue: [false],
			},
		},
	},
	{
		displayName: 'Text Value',
		name: 'textValue',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['customfield'],
				operation: ['setvalue'],
				valueType: ['textValue'],
				clearValue: [false],
			},
		},
	},
	{
		displayName: 'User ID',
		name: 'userIdValue',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['customfield'],
				operation: ['setvalue'],
				valueType: ['userIdValue'],
				clearValue: [false],
			},
		},
	},
];
