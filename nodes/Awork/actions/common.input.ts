import { INodeProperties } from 'n8n-workflow';

export const commonInputs: INodeProperties[] =
	[
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'projecttask',
					],
					operation: [
						'posttypeofwork',
					],
				},
			},
			default: '',
			description: 'The name of this entity',
			required: true,
		},
		{
			displayName: 'Description',
			name: 'description',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'projecttask',
					],
					operation: [
						'posttypeofwork',
					],
				},
			},
			default: '',
			description: 'The description of this entity',
		},
		{
			displayName: 'Type',
			name: 'type',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
					],
					operation: [
					],
				},
			},
			default: '',
			description: 'The type of this entity',
			required: true,
		},
		{
			displayName: 'Icon',
			name: 'icon',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'projecttask',
					],
					operation: [
						'posttypeofwork',
					],
				},
			},
			default: 'arrow_forward',
			description: 'The icon of this entity',
			required: true,
		},
	];
