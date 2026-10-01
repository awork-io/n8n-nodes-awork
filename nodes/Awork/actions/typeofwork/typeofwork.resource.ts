import { INodeProperties } from 'n8n-workflow';
import { typeOfWorkIconsResponse } from './typeofwork.helpers';
import { aworkApiPagination } from '../../GenericFunctions';

export const typeOfWorkResource: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['typeofwork'] } },
	options: [
		{
			name: 'Create Type of Work',
			value: 'create',
			action: 'Create type of work',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/typeofwork',
					body: '={{ { ...$parameter["additionalFields"], name: $parameter["workName"] } }}',
				},
			},
		},
		{
			name: 'Delete Type of Work',
			value: 'delete',
			action: 'Delete type of work',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/typeofwork/{{$parameter["typeOfWorkId"]}}/delete',
					body: { typeOfWorkId: '={{$parameter["replacementTypeOfWorkId"] || undefined}}' },
				},
			},
		},
		{
			name: 'Get Many Types of Work',
			value: 'getall',
			action: 'Get many types of work',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/typeofwork',
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
			name: 'Get Type of Work',
			value: 'get',
			action: 'Get type of work',
			routing: {
				request: { method: 'GET', url: '=api/v1/typeofwork/{{$parameter["typeOfWorkId"]}}' },
			},
		},
		{
			name: 'Get Type of Work Icons',
			value: 'geticons',
			action: 'Get type of work icons',
			routing: {
				request: { method: 'GET', url: '=api/v1/typeofwork/icons' },
				output: { postReceive: [typeOfWorkIconsResponse] },
			},
		},
		{
			name: 'Set Type of Work Archived',
			value: 'setarchived',
			action: 'Set type of work archived',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/typeofwork/{{$parameter["typeOfWorkId"]}}/setarchived',
					body: { isArchived: '={{$parameter["isArchived"]}}' },
				},
			},
		},
		{
			name: 'Update Type of Work',
			value: 'update',
			action: 'Update type of work',
			routing: {
				request: {
					method: 'PUT',
					url: '=api/v1/typeofwork/{{$parameter["typeOfWorkId"]}}',
					body: '={{ { ...$parameter["updateFields"], name: $parameter["workName"] } }}',
				},
			},
		},
	],
	default: 'getall',
};
