import { INodeProperties } from 'n8n-workflow';
import { aworkApiPagination } from '../../GenericFunctions';

export const commentResource: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['comment'] } },
	options: [
		{
			name: 'Create Comment',
			value: 'create',
			action: 'Create comment',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/comments',
					body: '={{ { ...$parameter["additionalFields"], message: $parameter["commentMessage"] } }}',
				},
			},
		},
		{
			name: 'Delete Comment',
			value: 'delete',
			action: 'Delete comment',
			routing: {
				request: {
					method: 'DELETE',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/comments/{{$parameter["commentId"]}}',
				},
			},
		},
		{
			name: 'Get Comment',
			value: 'get',
			action: 'Get comment',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/comments/{{$parameter["commentId"]}}',
				},
			},
		},
		{
			name: 'Get Many Comments',
			value: 'getall',
			action: 'Get many comments',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/comments',
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
			name: 'Set Comment Resolved',
			value: 'setresolved',
			action: 'Set comment resolved',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/documents/{{$parameter["entityId"]}}/comments/{{$parameter["commentId"]}}/setresolved',
					body: { isResolved: '={{$parameter["isResolved"]}}' },
				},
			},
			displayOptions: { show: { parentType: ['documents'] } },
		},
		{
			name: 'Update Comment',
			value: 'update',
			action: 'Update comment',
			routing: {
				request: {
					method: 'PUT',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/comments/{{$parameter["commentId"]}}',
					body: '={{ { ...$parameter["updateFields"], message: $parameter["commentMessage"] } }}',
				},
			},
		},
	],
	default: 'getall',
};
