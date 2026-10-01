import { INodeProperties } from 'n8n-workflow';
import { aworkApiPagination } from '../../GenericFunctions';

export const companyResource: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['company'],
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
						name: '={{$parameter["companyName"]}}',
						industry: '={{$parameter["companyIndustry"] || undefined}}',
						description: '={{$parameter["companyDescription"] || undefined}}',
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
				},
			},
		},
		{
			name: 'Get Company by ID',
			value: 'get',
			action: 'Get company by id',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/companies/{{$parameter["companyId"]}}',
				},
			},
		},
		{
			name: 'Update Company',
			value: 'update',
			action: 'Update company',
			routing: {
				request: {
					method: 'PUT',
					url: '=api/v1/companies/{{$parameter["companyId"]}}',
					body: '={{ { ...$parameter["updateFields"], name: $parameter["companyName"] } }}',
				},
			},
		},
		{
			name: 'Delete Company',
			value: 'delete',
			action: 'Delete company',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/companies/{{$parameter["companyId"]}}/delete',
					body: {
						deleteOperation: '={{$parameter["deleteOperation"]}}',
						moveToCompany:
							'={{$parameter["deleteOperation"] === "move" ? $parameter["moveToCompany"] : undefined}}',
					},
				},
			},
		},
	],
	default: 'get',
};
