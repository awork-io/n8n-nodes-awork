const assert = require('node:assert/strict');
const { existsSync } = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const { Workflow, NodeHelpers } = require('n8n-workflow');
const { Awork } = require('../dist/nodes/Awork/Awork.node');
const { AworkAi } = require('../dist/nodes/AworkAi/AworkAi.node');
const { AworkAiApi } = require('../dist/credentials/AworkAiApi.credentials');
const { AworkApi } = require('../dist/credentials/AworkApi.credentials');
const aiContract = require('./fixtures/awork-ai-routes.json');
const sharedContract = require('./fixtures/awork-routes.json');
const { aworkApiPagination } = require('../dist/nodes/Awork/GenericFunctions');
const {
	documentMultipartRequest,
} = require('../dist/nodes/Awork/actions/document/document.helpers');
const {
	fileUploadRequest,
	fileDownloadResponse,
} = require('../dist/nodes/Awork/actions/file/file.helpers');

const node = new AworkAi();
const properties = node.description.properties;
const resources = properties.filter((property) => property.name === 'operation');
function operation(resource, value) {
	const property = resources.find((property) =>
		property.displayOptions.show.resource.includes(resource),
	);
	const option = property.options.find((option) => option.value === value);
	assert.ok(option, `${resource}/${value} exists`);
	return option;
}
function evaluate(resource, value, parameters = {}) {
	const workflow = new Workflow({
		nodes: [
			{ name: 'awork AI', type: 'aworkAi', typeVersion: 1, position: [0, 0], parameters: {} },
		],
		connections: {},
		active: false,
		nodeTypes: { getByNameAndVersion: () => node },
	});
	workflow.nodes['awork AI'].parameters = { resource, operation: value, ...parameters };
	return workflow.expression.getParameterValue(
		operation(resource, value).routing.request,
		null,
		0,
		0,
		'awork AI',
		[{ json: {} }],
		'manual',
		{},
	);
}

test('awork AI registers separate credentials, the AI API host, and a packaged icon', () => {
	const pkg = require('../package.json');
	for (const file of [...pkg.n8n.nodes, ...pkg.n8n.credentials])
		assert.ok(existsSync(path.resolve(__dirname, '..', file)), file);
	assert.ok(pkg.n8n.nodes.includes('dist/nodes/AworkAi/AworkAi.node.js'));
	assert.ok(pkg.n8n.credentials.includes('dist/credentials/AworkAiApi.credentials.js'));
	assert.equal(node.description.name, 'aworkAi');
	assert.equal(node.description.displayName, 'awork AI');
	assert.deepEqual(node.description.credentials, [{ name: 'aworkAiApi', required: true }]);
	assert.equal(node.description.requestDefaults.baseURL, 'https://api.awork-ai.com');
	assert.ok(
		existsSync(path.resolve(__dirname, '../dist/nodes/AworkAi', node.description.icon.slice(5))),
	);
	const credential = new AworkAiApi();
	assert.equal(credential.name, 'aworkAiApi');
	assert.deepEqual(credential.authenticate, new AworkApi().authenticate);
	assert.deepEqual(credential.test.request, {
		baseURL: 'https://api.awork-ai.com',
		url: '/api/v1/users/me',
	});
	assert.equal(new AworkApi().test.request.baseURL, 'https://api.awork.com');
});

test('AI capability filtering preserves the awork definition and shared request callbacks', () => {
	const before = new Awork().description;
	new AworkAi();
	new AworkAi();
	assert.deepEqual(new Awork().description, before);
	assert.equal(operation('project', 'getall').routing.operations.pagination, aworkApiPagination);
	assert.equal(operation('document', 'create').routing.send.preSend[0], documentMultipartRequest);
	assert.equal(operation('file', 'upload').routing.send.preSend[0], fileUploadRequest);
	assert.equal(operation('file', 'download').routing.output.postReceive[0], fileDownloadResponse);
});

test('every AI node route matches a documented HTTP method and exposes its path parameters', () => {
	const normalize = (url) => url.replace(/\{[^}]+\}/g, '{id}');
	const paths = { ...sharedContract.paths, ...aiContract.paths };
	for (const property of resources) {
		const resource = property.displayOptions.show.resource[0];
		for (const option of property.options) {
			const parameters = {};
			for (const match of option.routing.request.url.matchAll(/\$parameter\["([^"]+)"\]/g))
				parameters[match[1]] = `{${match[1]}}`;
			const parents = resource === 'file' ? ['projects', 'documents', 'users'] : [undefined];
			for (const parentType of parents) {
				if (parentType) parameters.parentType = parentType;
				const request = evaluate(resource, option.value, parameters);
				const url = request.url.replace(/^\/?api\/v1/, '');
				const contractPath = Object.keys(paths).find(
					(candidate) => normalize(candidate) === normalize(url),
				);
				assert.ok(
					paths[contractPath]?.includes(request.method.toLowerCase()),
					`${resource}/${option.value}: ${request.method} ${url}`,
				);
				for (const name of Object.keys(parameters)) {
					assert.ok(
						properties.some(
							(p) =>
								p.name === name &&
								NodeHelpers.displayParameter(
									{ resource, operation: option.value, ...parameters },
									p,
								),
						),
						`${resource}/${option.value} exposes ${name}`,
					);
				}
			}
		}
	}
});

test('AI controls omit PM resources, task parents, and task or billing fields at every level', () => {
	assert.deepEqual(
		properties.find((p) => p.name === 'resource').options.map((o) => o.value),
		['agent', 'document', 'documentspace', 'file', 'project', 'schedule', 'thread', 'user'],
	);
	function inspect(entries) {
		for (const entry of entries) {
			assert.doesNotMatch(
				`${entry.displayName || ''} ${entry.name || ''} ${entry.description || ''}`,
				/\btask|time entr|billable|timeBudget|projectTemplate/i,
			);
			if (entry.options) inspect(entry.options);
		}
	}
	inspect(properties);
	const parent = properties.find((p) => p.name === 'parentType');
	assert.equal(parent.default, 'projects');
	assert.deepEqual(
		parent.options.map((o) => o.value),
		['documents', 'projects', 'users'],
	);
	assert.deepEqual(
		evaluate('project', 'delete', { projectId: 'project', deleteTimeTrackings: true }).qs,
		{ deleteTimeTrackings: false },
	);
});

test('threads select personal or custom agents and preserve explicit model and context fields', () => {
	const personal = evaluate('thread', 'create', {
		agentType: 'personal-agent',
		agentId: 'stale-custom-id',
		content: 'Hello',
		additionalFields: {},
		contextFields: {},
	});
	assert.equal(personal.body.type, 'personal-agent');
	assert.equal(personal.body.agentId, undefined);
	const fields = {
		modelProvider: 'openai',
		modelName: 'workspace-model',
		reasoningLevel: 'medium',
	};
	const context = { title: 'Report', projectId: 'project', documentId: 'document' };
	const custom = evaluate('thread', 'create', {
		agentType: 'custom-agent',
		agentId: 'agent',
		content: 'Summarize',
		additionalFields: fields,
		contextFields: context,
	});
	assert.deepEqual(custom.body, {
		...fields,
		...context,
		type: 'custom-agent',
		agentId: 'agent',
		content: 'Summarize',
	});
	assert.deepEqual(
		evaluate('thread', 'send', {
			threadId: 'thread',
			content: 'Continue',
			additionalFields: fields,
		}).body,
		{ ...fields, content: 'Continue' },
	);
	assert.equal(
		evaluate('thread', 'getstatus', { threadId: 'thread', messageId: 'accepted-message' }).url,
		'api/v1/agents/threads/thread/messages/accepted-message/status',
	);
	assert.equal(
		evaluate('thread', 'getmessages', { threadId: 'thread' }).url,
		'api/v1/agents/threads/thread/messages',
	);
});

test('AI writes satisfy documented required fields without sending unselected optional defaults', () => {
	const cases = [
		['agent', 'create', 'CreateAgentRequestModel', { agentName: 'Agent', additionalFields: {} }],
		[
			'thread',
			'create',
			'AiThreadCreateRequestModel',
			{ agentType: 'personal-agent', content: 'Hello', additionalFields: {}, contextFields: {} },
		],
		[
			'thread',
			'send',
			'AgentThreadMessageRequestModel',
			{ threadId: 'thread', content: 'Hello', additionalFields: {} },
		],
		[
			'schedule',
			'create',
			'CreateAgentScheduleRequestModel',
			{ agentId: 'agent', scheduleName: 'Report', cronRule: '0 9 * * 1', additionalFields: {} },
		],
		[
			'schedule',
			'update',
			'UpdateAgentScheduleRequestModel',
			{
				agentId: 'agent',
				scheduleId: 'schedule',
				scheduleName: 'Report',
				cronRule: '0 9 * * 1',
				additionalFields: {},
			},
		],
		[
			'schedule',
			'setenabled',
			'SetAgentScheduleEnabledRequestModel',
			{ agentId: 'agent', scheduleId: 'schedule', isEnabled: false },
		],
	];
	for (const [resource, value, form, parameters] of cases) {
		const body = evaluate(resource, value, parameters).body;
		for (const key of aiContract.forms[form].required)
			assert.notEqual(body[key], undefined, `${resource}/${value}: ${key}`);
		for (const [key, value] of Object.entries(body))
			if (value !== undefined)
				assert.ok(aiContract.forms[form].properties.includes(key), `${resource}/${value}: ${key}`);
		assert.equal(body.taskId, undefined);
	}
	assert.deepEqual(
		evaluate('schedule', 'create', {
			agentId: 'agent',
			scheduleName: 'Report',
			cronRule: '0 9 * * 1',
			additionalFields: {},
		}).body,
		{ name: 'Report', cronRule: '0 9 * * 1' },
	);
	assert.deepEqual(
		evaluate('schedule', 'setenabled', {
			agentId: 'agent',
			scheduleId: 'schedule',
			isEnabled: false,
		}).body,
		{ isEnabled: false },
	);
	const optional = {
		isEnabled: false,
		prompt: '',
		recurrenceInterval: 2,
		timezone: 'Europe/Berlin',
		projectId: 'project',
	};
	assert.deepEqual(
		evaluate('schedule', 'update', {
			agentId: 'agent',
			scheduleId: 'schedule',
			scheduleName: 'Report',
			cronRule: '0 9 * * 1',
			additionalFields: optional,
		}).body,
		{ ...optional, name: 'Report', cronRule: '0 9 * * 1' },
	);
	assert.deepEqual(
		evaluate('agent', 'create', {
			agentName: 'Agent',
			additionalFields: { webSearchEnabled: false, systemPrompt: '' },
		}).body,
		{ name: 'Agent', webSearchEnabled: false, systemPrompt: '' },
	);
});
