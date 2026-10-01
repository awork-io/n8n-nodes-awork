import { INodeProperties } from 'n8n-workflow';

export const companyContactInputs: INodeProperties[] = [
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['companycontact'],
				operation: ['create', 'update', 'get', 'getall', 'delete'],
			},
		},
	},
	{
		displayName: 'Contact Info ID',
		name: 'contactInfoId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: { resource: ['companycontact'], operation: ['get', 'update', 'delete'] },
		},
	},
	{
		displayName: 'Contact Type',
		name: 'contactType',
		type: 'options',
		default: 'email',
		options: [
			{ name: 'Address', value: 'address' },
			{ name: 'Custom', value: 'custom' },
			{ name: 'Email', value: 'email' },
			{ name: 'Phone', value: 'phone' },
			{ name: 'URL', value: 'url' },
		],
		displayOptions: { show: { resource: ['companycontact'], operation: ['create', 'update'] } },
	},
	{
		displayName: 'Contact Value',
		name: 'contactValue',
		type: 'string',
		default: '',
		description:
			'Email, phone number, URL, or custom value. For addresses, use the address fields.',
		displayOptions: { show: { resource: ['companycontact'], operation: ['create', 'update'] } },
	},
	{
		displayName: 'Label',
		name: 'contactLabel',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['companycontact'],
				operation: ['create', 'update'],
				contactType: ['custom'],
			},
		},
	},
	{
		displayName: 'Subtype',
		name: 'subType',
		type: 'options',
		default: 'central',
		required: true,
		options: [
			{ name: 'Central', value: 'central' },
			{ name: 'Other', value: 'other' },
		],
		displayOptions: {
			show: {
				resource: ['companycontact'],
				operation: ['create', 'update'],
				contactType: ['phone'],
			},
		},
	},
	{
		displayName: 'Subtype',
		name: 'subType',
		type: 'options',
		default: 'central',
		required: true,
		options: [
			{ name: 'Central', value: 'central' },
			{ name: 'Invoice', value: 'invoice' },
			{ name: 'Other', value: 'other' },
		],
		displayOptions: {
			show: {
				resource: ['companycontact'],
				operation: ['create', 'update'],
				contactType: ['email', 'address'],
			},
		},
	},
	{
		displayName: 'Subtype',
		name: 'subType',
		type: 'options',
		default: 'primary',
		required: true,
		options: [
			{ name: 'Primary', value: 'primary' },
			{ name: 'Other', value: 'other' },
		],
		displayOptions: {
			show: { resource: ['companycontact'], operation: ['create', 'update'], contactType: ['url'] },
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Address Line 1',
				name: 'addressLine1',
				type: 'string',
				default: '',
				description: 'First line of the postal address',
			},
			{
				displayName: 'Address Line 2',
				name: 'addressLine2',
				type: 'string',
				default: '',
				description: 'Second line of the postal address',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'City of the postal address',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'Two-letter ISO country code, for example DE',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'State or region',
			},
			{
				displayName: 'Zip Code',
				name: 'zipCode',
				type: 'string',
				default: '',
				description: 'Postal code',
			},
		],
		displayOptions: { show: { resource: ['companycontact'], operation: ['create', 'update'] } },
	},
];
