import { INodeProperties } from 'n8n-workflow';
import { aworkApiPagination } from '../../GenericFunctions';

export const projectMemberResource: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['projectmember'] } },
	options: [
		{
			name: 'Add Project Member',
			value: 'add',
			action: 'Add project member',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/projects/{{$parameter["projectId"]}}/addprojectmember',
					body: {
						userId: '={{$parameter["userId"]}}',
						projectRoleId: '={{$parameter["projectRoleId"]}}',
						isResponsible: '={{$parameter["isResponsible"]}}',
					},
				},
			},
		},
		{
			name: 'Get Project Members',
			value: 'getmembers',
			action: 'Get project members',
			routing: {
				request: { method: 'GET', url: '=api/v1/projects/{{$parameter["projectId"]}}/members' },
			},
		},
		{
			name: 'Get Project Roles',
			value: 'getroles',
			action: 'Get project roles',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/projectroles',
					qs: {
						includeMembers: false,
						filterBy: '={{$parameter["filterBy"] || undefined}}',
						orderBy: '={{$parameter["orderBy"] || undefined}}',
					},
				},
				operations: { pagination: aworkApiPagination },
				send: { paginate: true },
			},
		},
		{
			name: 'Remove Project Member',
			value: 'remove',
			action: 'Remove project member',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/projects/{{$parameter["projectId"]}}/removeprojectmember',
					body: { userId: '={{$parameter["userId"]}}' },
				},
			},
		},
		{
			name: 'Update Project Member',
			value: 'update',
			action: 'Update project member',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/projects/{{$parameter["projectId"]}}/updateprojectmember',
					body: {
						userId: '={{$parameter["userId"]}}',
						projectRoleId: '={{$parameter["projectRoleId"]}}',
						isResponsible: '={{$parameter["isResponsible"]}}',
					},
				},
			},
		},
	],
	default: 'getmembers',
};
