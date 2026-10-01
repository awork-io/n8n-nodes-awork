import { INodeProperties } from 'n8n-workflow';
import { aworkApiPagination } from '../../GenericFunctions';
import { fileUploadRequest, fileDownloadResponse } from './file.helpers';

export const fileResource: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['file'] } },
	options: [
		{
			name: 'Delete File',
			value: 'delete',
			action: 'Delete file',
			routing: {
				request: {
					method: 'DELETE',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/files/{{$parameter["fileId"]}}',
				},
			},
		},
		{
			name: 'Download File',
			value: 'download',
			action: 'Download file',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/files/{{$parameter["fileId"]}}/download',
					encoding: 'arraybuffer',
					json: false,
				},
				output: { postReceive: [fileDownloadResponse] },
			},
		},
		{
			name: 'Get File',
			value: 'get',
			action: 'Get file',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/files/{{$parameter["fileId"]}}',
				},
			},
		},
		{
			name: 'Get Many Files',
			value: 'getall',
			// The API has no company file-list endpoint.
			displayOptions: { show: { parentType: ['documents', 'projects', 'tasks', 'users'] } },
			action: 'Get many files',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/files',
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
			name: 'Update File',
			value: 'update',
			action: 'Update file',
			routing: {
				request: {
					method: 'PUT',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/files/{{$parameter["fileId"]}}',
					body: '={{$parameter["updateFields"]}}',
				},
			},
		},
		{
			name: 'Upload File',
			value: 'upload',
			action: 'Upload file',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/files',
				},
				send: { preSend: [fileUploadRequest] },
			},
		},
		{
			name: 'Upload File From URL',
			value: 'uploadurl',
			action: 'Upload file from url',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/files/byurl',
					body: '={{ { ...$parameter["additionalFields"], url: $parameter["fileUrl"] } }}',
				},
			},
		},
	],
	default: 'getall',
};
