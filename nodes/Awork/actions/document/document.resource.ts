import { INodeProperties } from 'n8n-workflow';
import { documentMultipartRequest } from './document.helpers';
import { aworkApiPagination } from '../../GenericFunctions';

export const documentResource: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['document'],
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
				},
			},
		},
		{
			name: 'Get Document by ID',
			value: 'get',
			action: 'Get document by id',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/documents/{{$parameter["documentId"]}}',
				},
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
					url: '=api/v1/documents/{{$parameter["documentId"]}}/content',
				},
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
				},
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
				},
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
					body: '={{ { ...$parameter["additionalFields"], name: $parameter["documentName"], content: $parameter["documentContent"], contentFormat: $parameter["contentFormat"] || "html", documentSpaceId: $parameter["documentSpaceId"] || undefined, projectId: $parameter["projectId"] || undefined, emoji: $parameter["emoji"] || undefined, parentId: $parameter["parentId"] || undefined } }}',
				},
				send: { preSend: [documentMultipartRequest] },
			},
		},
		{
			name: 'Update Document',
			value: 'update',
			action: 'Update a document',
			description: 'Update document metadata and location',
			routing: {
				request: {
					method: 'PUT',
					url: '=api/v1/documents/{{$parameter["documentId"]}}',
					body: '={{$parameter["updateFields"]}}',
				},
			},
		},
		{
			name: 'Update Document Content',
			value: 'updatecontent',
			action: 'Update document content',
			description: 'Replace document content with HTML or Markdown',
			routing: {
				request: {
					method: 'PUT',
					url: '=api/v1/documents/{{$parameter["documentId"]}}/content',
					body: {
						content: '={{$parameter["documentContent"]}}',
						contentFormat: '={{$parameter["contentFormat"] || "html"}}',
					},
				},
				send: { preSend: [documentMultipartRequest] },
			},
		},
		{
			name: 'Delete Document',
			value: 'delete',
			action: 'Delete a document',
			routing: {
				request: {
					method: 'DELETE',
					url: '=api/v1/documents/{{$parameter["documentId"]}}',
					qs: { alsoDeleteChildren: '={{$parameter["alsoDeleteChildren"]}}' },
				},
			},
		},
	],
	default: 'getall',
};
