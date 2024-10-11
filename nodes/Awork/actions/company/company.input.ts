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
	];
