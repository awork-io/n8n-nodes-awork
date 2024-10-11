import { INodeProperties } from 'n8n-workflow';

export const userInputs: INodeProperties[] =
	[
		{
			displayName: 'User ID',
			name: 'userId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'user',
					],
					operation: [
						'get',
					],
				},
			},
			default: '',
			placeholder: 'Enter the user ID',
			required: true,
			description: 'The ID of the user to retrieve',
		},
	];
