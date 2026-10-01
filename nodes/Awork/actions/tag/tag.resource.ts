import { INodeProperties } from 'n8n-workflow';

export const tagResource: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['tag'] } },
	options: [
		{
			name: 'Add Tag to Entity',
			value: 'add',
			action: 'Add tag to entity',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/addtags',
					body: [
						{
							name: '={{$parameter["tagName"]}}',
							color: '={{$parameter["tagColor"] || undefined}}',
						},
					],
				},
			},
		},
		{
			name: 'Delete Tag Globally',
			value: 'delete',
			action: 'Delete tag globally',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/{{$parameter["parentType"]}}/deletetags',
					body: { name: '={{$parameter["tagName"]}}' },
				},
			},
		},
		{
			name: 'Get Tags in Use',
			value: 'gettags',
			action: 'Get tags in use',
			routing: { request: { method: 'GET', url: '=api/v1/{{$parameter["parentType"]}}/tags' } },
		},
		{
			name: 'Get Tags of Entity',
			value: 'getentitytags',
			action: 'Get tags of entity',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/tags',
				},
			},
		},
		{
			name: 'Remove Tag From Entity',
			value: 'remove',
			action: 'Remove tag from entity',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/deletetags',
					body: [{ name: '={{$parameter["tagName"]}}' }],
				},
			},
		},
		{
			name: 'Update Tag Globally',
			value: 'update',
			action: 'Update tag globally',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/{{$parameter["parentType"]}}/updatetags',
					body: {
						oldTagName: '={{$parameter["oldTagName"]}}',
						newTag: {
							name: '={{$parameter["tagName"]}}',
							color: '={{$parameter["tagColor"] || undefined}}',
						},
						shouldMerge: '={{$parameter["shouldMerge"]}}',
					},
				},
			},
		},
	],
	default: 'gettags',
};
