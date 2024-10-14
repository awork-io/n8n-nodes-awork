import { INodeProperties } from 'n8n-workflow';

export const commonProperties: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: [
					'user',
					'company',
					'project',
					'projecttask',
				],
				operation: [
					'getall',
					'gettasksofproject',
					'gettypesofwork',
					'gettaskstatuses',
					'getprojectstatuses',
					'gettasklistsofproject',
				],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit'
	},
	{
		displayName: 'Filter By',
		name: 'filterBy',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'user',
					'company',
					'project',
					'projecttask'
				],
				operation: [
					'getall',
					'gettasksofproject',
					'gettypesofwork',
					'gettaskstatuses',
					'getprojectstatuses',
					'gettasklistsofproject',
				],
			},
		},
		default: '',
		placeholder: 'e.g., duration gt 5',
		description: 'Filter the results by specific criteria. See https://developers.awork.com/filtering for details.'
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'user',
					'company',
					'project',
					'projecttask',
				],
				operation: [
					'getall',
					'gettasksofproject',
					'gettypesofwork',
					'gettaskstatuses',
					'getprojectstatuses',
					'gettasklistsofproject',
				],
			},
		},
		default: '',
		placeholder: 'e.g., FirstName asc',
		description: 'Order the results by a specific field and direction. See https://developers.awork.com/ordering for details.'
	},
];
