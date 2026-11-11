const assert = require('node:assert/strict');
const { existsSync } = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const { AworkTrigger } = require('../dist/nodes/Awork/AworkTrigger.node');
const { AworkAiTrigger } = require('../dist/nodes/AworkAi/AworkAiTrigger.node');
const { paths } = require('./fixtures/awork-ai-routes.json');

const trigger = new AworkAiTrigger();
const hooks = trigger.webhookMethods.default;
const webhookUrl = 'https://automation.example/webhook/awork-ai';

function context({
	data = {},
	events = ['project_added'],
	url = webhookUrl,
	handler = async () => ({ id: 'hook' }),
} = {}) {
	const calls = [];
	const ctx = {
		getWorkflowStaticData: () => data,
		getNodeParameter: () => events,
		getNodeWebhookUrl: () => url,
		getWorkflow: () => ({ name: 'AI workflow' }),
		getNode: () => ({ name: 'awork AI Trigger' }),
		helpers: {
			async httpRequestWithAuthentication(credential, options) {
				assert.equal(this, ctx);
				assert.equal(credential, 'aworkAiApi');
				const pathname = new URL(options.url).pathname.replace('/api/v1', '');
				const contractPath =
					pathname.startsWith('/webhooks/') && pathname !== '/webhooks/eventtypes'
						? '/webhooks/{webhookId}'
						: pathname;
				assert.equal(new URL(options.url).origin, 'https://api.awork-ai.com');
				assert.ok(
					paths[contractPath].includes(options.method.toLowerCase()),
					`${options.method} ${contractPath}`,
				);
				calls.push(options);
				return handler(options);
			},
		},
	};
	return { ctx, calls, data };
}

test('awork AI Trigger is a separately packaged trigger with AI credentials and branding', () => {
	const pkg = require('../package.json');
	assert.ok(pkg.n8n.nodes.includes('dist/nodes/AworkAi/AworkAiTrigger.node.js'));
	assert.equal(trigger.description.name, 'aworkAiTrigger');
	assert.equal(trigger.description.displayName, 'awork AI Trigger');
	assert.deepEqual(trigger.description.inputs, []);
	assert.deepEqual(trigger.description.outputs, ['main']);
	assert.deepEqual(trigger.description.credentials, [{ name: 'aworkAiApi', required: true }]);
	assert.ok(
		existsSync(path.resolve(__dirname, '../dist/nodes/AworkAi', trigger.description.icon.slice(5))),
	);
	assert.ok(existsSync(path.resolve(__dirname, '../dist/nodes/AworkAi/AworkAiTrigger.node.json')));
	assert.equal(trigger.webhook, AworkTrigger.prototype.webhook);
	const before = new AworkTrigger().description;
	new AworkAiTrigger();
	assert.deepEqual(new AworkTrigger().description, before);
	assert.ok(
		before.properties
			.find((p) => p.name === 'events')
			.options.some((o) => o.value === 'task_added'),
	);
});

test('event discovery filters PM events and includes new agent event types returned by the API', async () => {
	const legacy = new AworkTrigger().description.properties
		.find((p) => p.name === 'events')
		.options.map((o) => o.value);
	const upcoming = ['agent_run_completed', 'thread_message_added'];
	const { ctx, calls } = context({
		handler: async () => [...legacy, ...upcoming, 'agent_run_completed'],
	});
	const options = await trigger.methods.loadOptions.getEvents.call(ctx);
	assert.deepEqual(
		options.map((o) => o.value).sort(),
		[
			'agent_run_completed',
			'project_added',
			'project_comment_added',
			'project_deleted',
			'projectmember_added',
			'projectmember_deleted',
			'project_status_changed',
			'project_type_changed',
			'project_updated',
			'thread_message_added',
			'user_activation_changed',
			'user_added',
			'user_deleted',
			'user_status_changed',
			'user_updated',
		].sort(),
	);
	assert.deepEqual(
		options.map((o) => o.name),
		options.map((o) => o.name).sort((a, b) => a.localeCompare(b)),
	);
	assert.ok(options.some((o) => o.name === 'Project Member Added'));
	assert.equal(calls[0].url, 'https://api.awork-ai.com/api/v1/webhooks/eventtypes');
	assert.equal(
		trigger.description.properties.find((p) => p.name === 'events').typeOptions.loadOptionsMethod,
		'getEvents',
	);
});

test('event discovery surfaces API failures', async () => {
	const failure = new Error('Permission denied');
	const { ctx } = context({
		handler: async () => {
			throw failure;
		},
	});
	await assert.rejects(
		trigger.methods.loadOptions.getEvents.call(ctx),
		(error) => error === failure,
	);
});

test('activation creates a webhook with selected events and stores its ID', async () => {
	const { ctx, calls, data } = context({
		events: ['project_added', 'agent_run_completed', 'project_added'],
	});
	assert.equal(await hooks.checkExists.call(ctx), false);
	assert.equal(calls.length, 0);
	assert.equal(await hooks.create.call(ctx), true);
	assert.deepEqual(calls[0], {
		method: 'POST',
		url: 'https://api.awork-ai.com/api/v1/webhooks',
		json: true,
		body: {
			name: 'n8n: AI workflow - project_added,agent_run_completed',
			uri: webhookUrl,
			events: 'project_added,agent_run_completed',
			isActive: true,
			authenticationType: 'none',
		},
	});
	assert.deepEqual(data, {
		webhookId: 'hook',
		webhookEvents: ['project_added', 'agent_run_completed'],
	});
});

test('existing hooks compare their destination, active state, and selected events', async () => {
	for (const [registered, expected] of [
		[{ uri: webhookUrl, events: 'user_added,project_added', isActive: true }, true],
		[{ uri: webhookUrl, events: 'project_added', isActive: true }, false],
		[{ uri: webhookUrl, events: 'user_added,project_added', isActive: false }, false],
	]) {
		const { ctx, data } = context({
			data: { webhookId: 'hook' },
			events: ['project_added', 'user_added'],
			handler: async () => registered,
		});
		assert.equal(await hooks.checkExists.call(ctx), expected);
		assert.equal(data.webhookId, 'hook');
	}
	const { ctx, data } = context({
		data: { webhookId: 'foreign-hook' },
		handler: async () => ({
			uri: 'https://another.example/webhook',
			events: 'project_added',
			isActive: true,
		}),
	});
	assert.equal(await hooks.checkExists.call(ctx), false);
	assert.deepEqual(data, {});
});

test('changed event selections update the registered hook rather than leaving an orphan', async () => {
	const { ctx, calls, data } = context({
		data: { webhookId: 'hook' },
		events: ['agent_run_completed'],
		handler: async (options) =>
			options.method === 'GET'
				? { uri: webhookUrl, events: 'project_added', isActive: true }
				: { id: 'hook' },
	});
	assert.equal(await hooks.checkExists.call(ctx), false);
	assert.equal(await hooks.create.call(ctx), true);
	assert.equal(calls[1].method, 'PUT');
	assert.equal(calls[1].url, 'https://api.awork-ai.com/api/v1/webhooks/hook');
	assert.equal(calls[1].body.events, 'agent_run_completed');
	assert.deepEqual(data.webhookEvents, ['agent_run_completed']);
});

test('missing hooks clear stale state for all supported n8n 404 error shapes', async () => {
	for (const status of [
		{ httpCode: '404' },
		{ statusCode: 404 },
		{ status: 404 },
		{ response: { status: 404 } },
	]) {
		const { ctx, data } = context({
			data: { webhookId: 'gone', webhookEvents: ['project_added'] },
			handler: async () => {
				throw Object.assign(new Error('Not found'), status);
			},
		});
		assert.equal(await hooks.checkExists.call(ctx), false);
		assert.deepEqual(data, {});
	}
});

test('deactivation removes the hook and clears state only on success or 404', async () => {
	for (const failure of [undefined, Object.assign(new Error('Not found'), { httpCode: '404' })]) {
		const { ctx, calls, data } = context({
			data: { webhookId: 'hook', webhookEvents: ['project_added'] },
			handler: async () => {
				if (failure) throw failure;
			},
		});
		assert.equal(await hooks.delete.call(ctx), true);
		assert.equal(calls[0].method, 'DELETE');
		assert.deepEqual(data, {});
		assert.equal(await hooks.delete.call(ctx), true);
		assert.equal(calls.length, 1);
	}
	const failure = Object.assign(new Error('Unavailable'), { statusCode: 503 });
	const { ctx, data } = context({
		data: { webhookId: 'hook', webhookEvents: ['project_added'] },
		handler: async () => {
			throw failure;
		},
	});
	await assert.rejects(hooks.delete.call(ctx), (error) => error === failure);
	assert.equal(data.webhookId, 'hook');
});

test('activation rejects empty or unsupported selections and local callback URLs before an API request', async () => {
	for (const events of [
		[],
		['task_added'],
		['company_added'],
		['timetracking_added'],
		['absence_added'],
		['project_added,task_added'],
		'project_added',
	]) {
		const { ctx, calls } = context({ events });
		await assert.rejects(hooks.create.call(ctx), /Select at least one supported/);
		assert.equal(calls.length, 0);
	}
	for (const url of [
		undefined,
		'http://localhost:5678/webhook',
		'http://127.0.0.1/webhook',
		'http://[::1]/webhook',
	]) {
		const { ctx, calls } = context({ url: url || '' });
		await assert.rejects(hooks.create.call(ctx), /public n8n webhook URL/);
		assert.equal(calls.length, 0);
	}
});

test('API failures do not produce a successful activation or discard cleanup state', async () => {
	const failure = Object.assign(new Error('Permission denied'), { statusCode: 403 });
	for (const method of ['checkExists', 'create']) {
		const { ctx, data } = context({
			data: { webhookId: 'hook' },
			handler: async () => {
				throw failure;
			},
		});
		await assert.rejects(hooks[method].call(ctx), (error) => error === failure);
		assert.equal(data.webhookId, 'hook');
	}
});

test('incoming agent events retain the original body, headers, and query output format', async () => {
	const body = { eventType: 'agent_run_completed', entity: { id: 'agent' } };
	const headers = { 'content-type': 'application/json' };
	const query = { source: 'awork-ai' };
	const result = await trigger.webhook.call({
		getBodyData: () => body,
		getHeaderData: () => headers,
		getQueryData: () => query,
		helpers: { returnJsonArray: (items) => items.map((json) => ({ json })) },
	});
	assert.deepEqual(result.workflowData, [[{ json: { body, headers, query } }]]);
	assert.equal(result.webhookResponse.statusCode, 200);
});
