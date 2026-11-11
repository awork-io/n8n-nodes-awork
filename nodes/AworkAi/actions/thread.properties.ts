import { INodeProperties } from 'n8n-workflow';
import { field, operations } from './helpers';

const threadUrl = '=api/v1/agents/threads/{{$parameter["threadId"]}}';

export const threadProperties: INodeProperties[] = [
	operations(
		'thread',
		[
			{
				name: 'Cancel Run',
				value: 'cancel',
				action: 'Cancel a thread run',
				routing: { request: { method: 'POST', url: `${threadUrl}/cancel` } },
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a thread',
				description: 'Start a thread and submit its first message',
				routing: {
					request: {
						method: 'POST',
						url: '=api/v1/agents/threads',
						body: '={{ { ...$parameter["additionalFields"], ...$parameter["contextFields"], type: $parameter["agentType"], agentId: $parameter["agentType"] === "custom-agent" ? $parameter["agentId"] : undefined, content: $parameter["content"] } }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a thread',
				routing: { request: { method: 'GET', url: threadUrl } },
			},
			{
				name: 'Get Message Status',
				value: 'getstatus',
				action: 'Get message status',
				routing: {
					request: {
						method: 'GET',
						url: `${threadUrl}/messages/{{$parameter["messageId"]}}/status`,
					},
				},
			},
			{
				name: 'Get Messages',
				value: 'getmessages',
				action: 'Get thread messages',
				routing: { request: { method: 'GET', url: `${threadUrl}/messages` } },
			},
			{
				name: 'Send Message',
				value: 'send',
				action: 'Send a thread message',
				description: 'Submit a message for processing and return its acceptance receipt',
				routing: {
					request: {
						method: 'POST',
						url: `${threadUrl}/messages`,
						body: '={{ { ...$parameter["additionalFields"], content: $parameter["content"] } }}',
					},
				},
			},
		],
		'create',
	),
	field('thread', ['get', 'getmessages', 'getstatus', 'send', 'cancel'], 'Thread ID', 'threadId'),
	field('thread', ['getstatus'], 'Message ID', 'messageId', {
		description: 'Accepted message ID returned by Create or Send Message',
	}),
	field('thread', ['create'], 'Agent Type', 'agentType', {
		type: 'options',
		default: 'personal-agent',
		options: [
			// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
			{ name: 'awork Agent', value: 'personal-agent' },
			{ name: 'Custom Agent', value: 'custom-agent' },
		],
	}),
	field('thread', ['create'], 'Agent ID', 'agentId', {
		displayOptions: {
			show: { resource: ['thread'], operation: ['create'], agentType: ['custom-agent'] },
		},
	}),
	field('thread', ['create', 'send'], 'Message', 'content', { typeOptions: { rows: 5 } }),
	{
		displayName: 'Thread Fields',
		name: 'contextFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: { show: { resource: ['thread'], operation: ['create'] } },
		options: [
			{ displayName: 'Document ID', name: 'documentId', type: 'string', default: '' },
			{ displayName: 'Project ID', name: 'projectId', type: 'string', default: '' },
			{ displayName: 'Title', name: 'title', type: 'string', default: '' },
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: { show: { resource: ['thread'], operation: ['create', 'send'] } },
		options: [
			{
				displayName: 'Model Name',
				name: 'modelName',
				type: 'string',
				default: '',
				description: 'Available model name. Supply Model Provider as well.',
			},
			{
				displayName: 'Model Provider',
				name: 'modelProvider',
				type: 'string',
				default: '',
				description: 'Model provider. Supply Model Name as well.',
			},
			{
				displayName: 'Preset Key',
				name: 'presetKey',
				type: 'string',
				default: '',
				description: 'Agent preset key. Overrides model and reasoning settings.',
			},
			{
				displayName: 'Reasoning Level',
				name: 'reasoningLevel',
				type: 'string',
				default: '',
				description: 'Reasoning level supported by the selected model',
			},
		],
	},
	{
		displayName:
			'AI replies arrive later. Use Get Message Status, then Get Messages. Retrying a submission can create a duplicate.',
		name: 'asyncNotice',
		type: 'notice',
		default: '',
		displayOptions: { show: { resource: ['thread'], operation: ['create', 'send'] } },
	},
];
