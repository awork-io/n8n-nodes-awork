import { INodeProperties } from 'n8n-workflow';

export const companyInputs: INodeProperties[] = [
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['company'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		placeholder: 'Enter the company ID',
		required: true,
		description: 'The ID of the company',
	},
	{
		displayName: 'Company Name',
		name: 'companyName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['company'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		placeholder: 'Enter the company name',
		description: 'The name of the company',
		required: true,
	},
	{
		displayName: 'Company Description',
		name: 'companyDescription',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['company'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The description of the company',
	},
	{
		displayName: 'Company Industry',
		name: 'companyIndustry',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['company'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The industry of the company',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		default: {},
		displayOptions: { show: { resource: ['company'], operation: ['update'] } },
		placeholder: 'Add Field',
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			{ displayName: 'Industry', name: 'industry', type: 'string', default: '' },
		],
	},
	{
		displayName: 'Delete Operation',
		name: 'deleteOperation',
		type: 'options',
		default: 'delete-only-company',
		displayOptions: { show: { resource: ['company'], operation: ['delete'] } },
		options: [
			{ name: 'Delete Only Company', value: 'delete-only-company' },
			{ name: 'Delete All Except Time Entries', value: 'delete-all-without-timeentries' },
			{ name: 'Delete All', value: 'delete-all' },
			{ name: 'Move Related Objects', value: 'move' },
		],
	},
	{
		displayName: 'Move to Company ID',
		name: 'moveToCompany',
		type: 'string',
		default: '',
		displayOptions: {
			show: { resource: ['company'], operation: ['delete'], deleteOperation: ['move'] },
		},
		required: true,
	},
];
