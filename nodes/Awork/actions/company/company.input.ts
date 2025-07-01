import { INodeProperties } from 'n8n-workflow';

export const companyInputs: INodeProperties[] =
	[
		{
			displayName: 'Company ID',
			name: 'companyId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'company',
					],
					operation: [
						'get',
					],
				},
			},
			default: '',
			placeholder: 'Enter the company ID',
			required: true,
			description: 'The ID of the company to retrieve',
		},
		{
			displayName: 'Company Name',
			name: 'companyName',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'company',
					],
					operation: [
						'post',
					],
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
					resource: [
						'company',
					],
					operation: [
						'post',
					],
				},
			},
			default: '',
			description: 'The description of the company'
		},
		{
			displayName: 'Company Industry',
			name: 'companyIndustry',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'company',
					],
					operation: [
						'post',
					],
				},
			},
			default: '',
			description: 'The industry of the company'
		},
	];
