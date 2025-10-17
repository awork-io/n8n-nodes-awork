import { INodeProperties } from 'n8n-workflow';
import { aworkApiPagination } from '../../GenericFunctions';

export const documentResource: INodeProperties =
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'document',
			],
		},
	},
	options: [
		{
			name: 'Get All Documents',
			value: 'getall',
			action: 'Get all documents',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/documents',
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
			name: 'Get Document by ID',
			value: 'get',
			action: 'Get document by id',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/documents/{{$parameter["documentId"]}}'
				}
			},
		},
		{
			name: 'Get Document Content',
			value: 'getcontent',
			action: 'Get document content',
			description: 'Get the HTML content of a document',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/documents/{{$parameter["documentId"]}}/content'
				}
			},
		},
		{
			name: 'Get Documents of Document Space',
			value: 'getdocumentsofdocumentspace',
			action: 'Get documents of a document space',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/documentspaces/{{$parameter["documentSpaceId"]}}/documents',
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
			name: 'Get Documents of Project',
			value: 'getdocumentsofproject',
			action: 'Get documents of a project',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/projects/{{$parameter["projectId"]}}/documents',
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
			name: 'Create Document',
			value: 'create',
			action: 'Create a document',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/documents',
					body: {
						name: '={{$parameter["documentName"]}}',
						content: '={{$parameter["documentContent"]}}',
						documentSpaceId: '={{$parameter["documentSpaceId"] || undefined}}',
						projectId: '={{$parameter["projectId"] || undefined}}',
						emoji: '={{$parameter["emoji"] || undefined}}',
						parentId: '={{$parameter["parentId"] || undefined}}',
					}
				},
			},
		},
		{
			name: 'Delete Document',
			value: 'delete',
			action: 'Delete a document',
			routing: {
				request: {
					method: 'DELETE',
					url: '=api/v1/documents/{{$parameter["documentId"]}}'
				}
			},
		},
	],
	default: 'getall',
};
