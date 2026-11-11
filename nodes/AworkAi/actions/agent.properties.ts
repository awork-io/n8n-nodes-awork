import { INodeProperties } from 'n8n-workflow';
import { field, operations } from './helpers';

export const agentProperties: INodeProperties[] = [
	operations(
		'agent',
		[
			{
				name: 'Create',
				value: 'create',
				action: 'Create an agent',
				routing: {
					request: {
						method: 'POST',
						url: '=api/v1/agents',
						body: '={{ { ...$parameter["additionalFields"], name: $parameter["agentName"] } }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an agent',
				routing: { request: { method: 'GET', url: '=api/v1/agents/{{$parameter["agentId"]}}' } },
			},
			{
				name: 'Get Many',
				value: 'getall',
				action: 'Get many agents',
				routing: { request: { method: 'GET', url: '=api/v1/agents' } },
			},
		],
		'getall',
	),
	field('agent', ['get'], 'Agent ID', 'agentId'),
	field('agent', ['create'], 'Name', 'agentName'),
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: { show: { resource: ['agent'], operation: ['create'] } },
		options: [
			{
				// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
				displayName: 'awork Access Enabled',
				name: 'aworkAccessEnabled',
				type: 'boolean',
				default: false,
				description: 'Whether the agent can use awork tools',
			},
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			{ displayName: 'Model Name', name: 'modelName', type: 'string', default: '' },
			{ displayName: 'Model Provider', name: 'modelProvider', type: 'string', default: '' },
			{ displayName: 'Preset Key', name: 'presetKey', type: 'string', default: '' },
			{ displayName: 'Reasoning Level', name: 'reasoningLevel', type: 'string', default: '' },
			{
				displayName: 'System Prompt',
				name: 'systemPrompt',
				type: 'string',
				default: '',
				typeOptions: { rows: 5 },
			},
			{
				displayName: 'Web Search Enabled',
				name: 'webSearchEnabled',
				type: 'boolean',
				default: false,
				description: 'Whether the agent can search the web',
			},
		],
	},
];
