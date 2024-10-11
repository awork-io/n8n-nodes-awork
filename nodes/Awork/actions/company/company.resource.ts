import { INodeProperties } from 'n8n-workflow';
import { aworkApiPagination } from '../../GenericFunctions';

export const companyResource: INodeProperties =
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'company',
			],
		},
	},
	options: [
		{
			name: 'Get All Companies',
			value: 'getall',
			action: 'Get companies',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/companies',
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
			name: 'Get Company by ID',
			value: 'get',
			action: 'Get company by id',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/companies/{{$parameter["companyId"]}}'
				}
			},
		},
	],
	default: 'get',
};
