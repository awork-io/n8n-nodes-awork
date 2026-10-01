import { INodeProperties } from 'n8n-workflow';

export const checklistItemResource: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['checklistitem'] } },
	options: [
		{
			name: 'Create Checklist Item',
			value: 'create',
			action: 'Create checklist item',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/tasks/{{$parameter["taskId"]}}/checklistitems',
					body: '={{ { ...$parameter["additionalFields"], name: $parameter["checklistName"] } }}',
				},
			},
		},
		{
			name: 'Delete Checklist Item',
			value: 'delete',
			action: 'Delete checklist item',
			routing: {
				request: {
					method: 'DELETE',
					url: '=api/v1/tasks/{{$parameter["taskId"]}}/checklistitems/{{$parameter["checklistItemId"]}}',
				},
			},
		},
		{
			name: 'Get Checklist Item',
			value: 'get',
			action: 'Get checklist item',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/tasks/{{$parameter["taskId"]}}/checklistitems/{{$parameter["checklistItemId"]}}',
				},
			},
		},
		{
			name: 'Get Many Checklist Items',
			value: 'getall',
			action: 'Get many checklist items',
			routing: {
				request: { method: 'GET', url: '=api/v1/tasks/{{$parameter["taskId"]}}/checklistitems' },
			},
		},
		{
			name: 'Update Checklist Item',
			value: 'update',
			action: 'Update checklist item',
			routing: {
				request: {
					method: 'PUT',
					url: '=api/v1/tasks/{{$parameter["taskId"]}}/checklistitems/{{$parameter["checklistItemId"]}}',
					body: '={{ { ...$parameter["updateFields"], name: $parameter["checklistName"] } }}',
				},
			},
		},
	],
	default: 'getall',
};
