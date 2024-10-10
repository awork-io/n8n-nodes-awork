import { INodeProperties } from 'n8n-workflow';
import { aworkApiPagination } from '../../GenericFunctions';

export const projectResource: INodeProperties =
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'project',
			],
		},
	},
	options: [
		{
			name: 'Get All Projects',
			value: 'getall',
			action: 'Get projects',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/projects',
					qs: {
						filterBy: '={{$parameter["filterBy"] || undefined}}',
						orderBy: '={{$parameter["orderBy"] || undefined}}',
					},
				},
				operations: {
					pagination: aworkApiPagination,
				},
				send: {
					paginate: true,
				}
			},
		},
		{
			name: 'Get Project by ID',
			value: 'get',
			action: 'Get project by id',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/projects/{{$parameter["projectId"]}}'
				}
			},
		},
		{
			name: 'Get Task Statues',
			value: 'gettasstatuses',
			action: 'Get task statuses by project id',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/projects/{{$parameter["projectId"]}}/taskstatuses'
				},
			},
		},
	],
	default: 'get',
};
