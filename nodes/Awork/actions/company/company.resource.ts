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
			name: 'Create Company',
			value: 'create',
			action: 'Create a company',
			description: 'Create a company by sending company details',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/companies',
					body: {
						name: '={{$parameter["name"]}}',
						street: '={{$parameter["street"] || undefined}}',
						city: '={{$parameter["city"] || undefined}}',
						zip: '={{$parameter["zip"] || undefined}}',
						country: '={{$parameter["country"] || undefined}}',
						website: '={{$parameter["website"] || undefined}}',
						phone: '={{$parameter["phone"] || undefined}}',
						email: '={{$parameter["email"] || undefined}}',
						industry: '={{$parameter["industry"] || undefined}}',
						status: '={{$parameter["status"] || undefined}}',
						tags: '={{$parameter["tags"] || undefined}}',
						customFields: '={{$parameter["customFields"] || undefined}}',
					},
				},
			},
		},
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
