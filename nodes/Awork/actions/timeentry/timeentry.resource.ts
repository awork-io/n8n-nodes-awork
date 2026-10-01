import { INodeProperties } from 'n8n-workflow';
import { aworkApiPagination } from '../../GenericFunctions';

export const timeEntryResource: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['timeentry'] } },
	options: [
		{
			name: 'Create Time Entry',
			value: 'create',
			action: 'Create a time entry',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/timeentries',
					body: '={{ { ...$parameter.additionalFields, userId: $parameter.userId, typeOfWorkId: $parameter.typeOfWorkId, timezone: $parameter.timezone, startDateUtc: $parameter.startDateUtc, startTimeUtc: $parameter.startTimeUtc } }}',
				},
			},
		},
		{
			name: 'Delete Time Entry',
			value: 'delete',
			action: 'Delete a time entry',
			routing: {
				request: { method: 'DELETE', url: '=api/v1/timeentries/{{$parameter["timeEntryId"]}}' },
			},
		},
		{
			name: 'Get Time Entry',
			value: 'get',
			action: 'Get a time entry',
			routing: {
				request: { method: 'GET', url: '=api/v1/timeentries/{{$parameter["timeEntryId"]}}' },
			},
		},
		{
			name: 'Get Many Time Entries',
			value: 'getall',
			action: 'Get many time entries',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/timeentries',
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
			name: 'Get Time Entries of Project',
			value: 'gettimeentriesofproject',
			action: 'Get time entries of a project',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/projects/{{$parameter["projectId"]}}/timeentries',
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
			name: 'Get Time Entries of Task',
			value: 'gettimeentriesoftask',
			action: 'Get time entries of a task',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/tasks/{{$parameter["taskId"]}}/timeentries',
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
			name: 'Update Time Entry',
			value: 'update',
			action: 'Update a time entry',
			description: 'Update a time entry using UTC date and time fields',
			routing: {
				request: {
					method: 'PUT',
					url: '=api/v1/timeentries/{{$parameter["timeEntryId"]}}',
					body: '={{ { ...$parameter.updateFields, typeOfWorkId: $parameter.typeOfWorkId, timezone: $parameter.timezone } }}',
				},
			},
		},
	],
	default: 'getall',
};
