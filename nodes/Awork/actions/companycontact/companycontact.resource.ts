import { INodeProperties } from 'n8n-workflow';
import { aworkApiPagination } from '../../GenericFunctions';

export const companyContactResource: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['companycontact'] } },
	options: [
		{
			name: 'Create Company Contact',
			value: 'create',
			action: 'Create company contact',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/companies/{{$parameter["companyId"]}}/contactinfo',
					body: '={{ { ...$parameter["additionalFields"], type: $parameter["contactType"], value: $parameter["contactValue"], isAddress: $parameter["contactType"] === "address", subType: $parameter["contactType"] === "custom" ? undefined : $parameter["subType"], label: $parameter["contactType"] === "custom" ? $parameter["contactLabel"] : undefined } }}',
				},
			},
		},
		{
			name: 'Delete Company Contact',
			value: 'delete',
			action: 'Delete company contact',
			routing: {
				request: {
					method: 'DELETE',
					url: '=api/v1/companies/{{$parameter["companyId"]}}/contactinfo/{{$parameter["contactInfoId"]}}',
				},
			},
		},
		{
			name: 'Get Company Contact',
			value: 'get',
			action: 'Get company contact',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/companies/{{$parameter["companyId"]}}/contactinfo/{{$parameter["contactInfoId"]}}',
				},
			},
		},
		{
			name: 'Get Many Company Contacts',
			value: 'getall',
			action: 'Get many company contacts',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/companies/{{$parameter["companyId"]}}/contactinfo',
					qs: {
						filterBy: '={{$parameter["filterBy"] || undefined}}',
						orderBy: '={{$parameter["orderBy"] || undefined}}',
					},
				},
				operations: { pagination: aworkApiPagination },
				send: { paginate: true },
			},
		},
		{
			name: 'Update Company Contact',
			value: 'update',
			action: 'Update company contact',
			routing: {
				request: {
					method: 'PUT',
					url: '=api/v1/companies/{{$parameter["companyId"]}}/contactinfo/{{$parameter["contactInfoId"]}}',
					body: '={{ { ...$parameter["additionalFields"], type: $parameter["contactType"], value: $parameter["contactValue"], isAddress: $parameter["contactType"] === "address", subType: $parameter["contactType"] === "custom" ? undefined : $parameter["subType"], label: $parameter["contactType"] === "custom" ? $parameter["contactLabel"] : undefined } }}',
				},
			},
		},
	],
	default: 'getall',
};
