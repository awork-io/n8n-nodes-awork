import { INodeProperties } from 'n8n-workflow';
import { aworkApiPagination } from '../../GenericFunctions';

export const userResource: INodeProperties =
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'user',
			],
		},
	},
	options: [
		{
			name: 'Get All Users',
			value: 'getall',
			action: 'Get users',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/users',
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
			name: 'Get User by ID',
			value: 'get',
			action: 'Get user by id',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/users/{{$parameter["userId"]}}'
				}
			},
		},
	],
	default: 'get',
};
