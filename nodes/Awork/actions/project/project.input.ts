import { INodeProperties } from 'n8n-workflow';

export const projectInputs: INodeProperties[] =
	[
		{
			displayName: 'Project ID',
			name: 'projectId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'project',
					],
					operation: [
						'get',
					],
				},
			},
			default: '',
			placeholder: 'Enter the project ID',
			required: true,
			description: 'The ID of the project to retrieve',
		},
	];
