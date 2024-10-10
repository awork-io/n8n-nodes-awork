import { INodeProperties } from 'n8n-workflow';

export const userInputs: INodeProperties[] =
	[
		{
			displayName: 'GitHub User Name',
			name: 'gitHubUserName',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'user',
					],
					operation: [
						'getall',
					],
				},
			},
			default: '',
			description: 'The GitHub user name'
		}
	];
