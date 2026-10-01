import { INodeProperties } from 'n8n-workflow';
import { aworkApiPagination } from '../../GenericFunctions';

export const documentSpaceResource: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['documentspace'] } },
	options: [
		{
			name: 'Create Document Space',
			value: 'create',
			action: 'Create a document space',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/documentspaces',
					body: '={{ { ...$parameter["additionalFields"], name: $parameter["documentSpaceName"] } }}',
				},
			},
		},
		{
			name: 'Delete Document Space',
			value: 'delete',
			action: 'Delete a document space',
			routing: {
				request: {
					method: 'DELETE',
					url: '=api/v1/documentspaces/{{$parameter["documentSpaceId"]}}',
				},
			},
		},
		{
			name: 'Get Document Space',
			value: 'get',
			action: 'Get a document space',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/documentspaces/{{$parameter["documentSpaceId"]}}',
				},
			},
		},
		{
			name: 'Get Many Document Spaces',
			value: 'getall',
			action: 'Get many document spaces',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/documentspaces',
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
			name: 'Update Document Space',
			value: 'update',
			action: 'Update a document space',
			routing: {
				request: {
					method: 'PUT',
					url: '=api/v1/documentspaces/{{$parameter["documentSpaceId"]}}',
					body: '={{$parameter["updateFields"]}}',
				},
			},
		},
	],
	default: 'getall',
};
