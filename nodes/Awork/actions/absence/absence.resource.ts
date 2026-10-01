import { INodeProperties } from 'n8n-workflow';
import { aworkApiPagination } from '../../GenericFunctions';

export const absenceResource: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['absence'] } },
	options: [
		{
			name: 'Create Absence',
			value: 'create',
			action: 'Create absence',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/absences',
					body: '={{ { ...$parameter["additionalFields"], userId: $parameter["userId"], startOn: $parameter["startOn"], endOn: $parameter["endOn"] } }}',
				},
			},
		},
		{
			name: 'Delete Absence',
			value: 'delete',
			action: 'Delete absence',
			routing: {
				request: { method: 'DELETE', url: '=api/v1/absences/{{$parameter["absenceId"]}}' },
			},
		},
		{
			name: 'Get Absence',
			value: 'get',
			action: 'Get absence',
			routing: { request: { method: 'GET', url: '=api/v1/absences/{{$parameter["absenceId"]}}' } },
		},
		{
			name: 'Get Many Absences',
			value: 'getall',
			action: 'Get many absences',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/absences',
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
			name: 'Update Absence',
			value: 'update',
			action: 'Update absence',
			routing: {
				request: {
					method: 'PUT',
					url: '=api/v1/absences/{{$parameter["absenceId"]}}',
					body: '={{ { ...$parameter["updateFields"], userId: $parameter["userId"], startOn: $parameter["startOn"], endOn: $parameter["endOn"] } }}',
				},
			},
		},
	],
	default: 'getall',
};
