const assert = require('node:assert/strict');
const { test } = require('node:test');
const { NodeHelpers } = require('n8n-workflow');
const { properties, resources, evaluate, visible } = require('./helpers');
const { aworkApiPagination } = require('../dist/nodes/Awork/GenericFunctions');
const {
	documentMultipartRequest,
} = require('../dist/nodes/Awork/actions/document/document.helpers');
const { paths } = require('./fixtures/awork-routes.json');

test('every declared HTTP method and path exists in the OpenAPI contract', () => {
	const normalize = (path) => path.replace(/\{[^}]+\}/g, '{id}');
	for (const resourceProperty of resources) {
		const resource = resourceProperty.displayOptions.show.resource[0];
		for (const option of resourceProperty.options) {
			const route = option.routing.request;
			const parameterNames = [
				...route.url.matchAll(/\$parameter(?:\["([^"]+)"\]|\.([a-zA-Z]+))/g),
			].map((match) => match[1] || match[2]);
			const parentSelector = properties.find(
				(p) => p.name === 'parentType' && p.displayOptions.show.resource.includes(resource),
			);
			const parentTypes = parentSelector ? parentSelector.options.map((o) => o.value) : [undefined];
			for (const parentType of parentTypes) {
				if (
					option.displayOptions?.show?.parentType &&
					!option.displayOptions.show.parentType.includes(parentType)
				)
					continue;
				const parameters = Object.fromEntries(parameterNames.map((name) => [name, `{${name}}`]));
				if (parentType) parameters.parentType = parentType;
				const request = evaluate(resource, option.value, parameters);
				const path = request.url.replace(/^\/?api\/v1/, '');
				const contractPath = Object.keys(paths).find((p) => normalize(p) === normalize(path));
				assert.ok(
					paths[contractPath]?.includes(request.method.toLowerCase()),
					`${resource}/${option.value}: ${request.method} ${path}`,
				);
				for (const name of parameterNames)
					assert.ok(
						visible(name, resource, option.value, parameters),
						`${resource}/${option.value} exposes ${name}`,
					);
				if (option.routing.send?.paginate) {
					for (const name of ['returnAll', 'filterBy', 'orderBy'])
						assert.ok(
							visible(name, resource, option.value, parameters),
							`${resource}/${option.value} exposes ${name}`,
						);
					assert.equal(option.routing.operations.pagination, aworkApiPagination);
				}
			}
		}
	}
});

test('time entry creation sends required UTC fields and preserves explicit false, zero and empty note', () => {
	const required = {
		userId: 'user',
		typeOfWorkId: 'work',
		timezone: 'Europe/London',
		startDateUtc: '2026-10-01',
		startTimeUtc: '09:00:00',
	};
	assert.deepEqual(
		evaluate('timeentry', 'create', { ...required, additionalFields: {} }).body,
		required,
	);
	const optional = { isBillable: false, isBilled: false, duration: 0, note: '' };
	assert.deepEqual(
		evaluate('timeentry', 'create', { ...required, additionalFields: optional }).body,
		{ ...required, ...optional },
	);
});

test('updates send selected fields without filling optional defaults', () => {
	for (const [resource, required, updateFields, expectedRequired] of [
		[
			'timeentry',
			{ typeOfWorkId: 'work', timezone: 'Europe/London' },
			{ duration: 0, isBillable: false, note: '' },
			{ typeOfWorkId: 'work', timezone: 'Europe/London' },
		],
		['project', { projectName: 'Project' }, { description: '' }, { name: 'Project' }],
		['projecttask', { taskName: 'Task' }, { description: '' }, { name: 'Task' }],
		['company', { companyName: 'Company' }, { description: '' }, { name: 'Company' }],
		['document', {}, { name: 'Document', isPrivate: false }, {}],
		['documentspace', {}, { name: 'Space', order: 0 }, {}],
	]) {
		const body = evaluate(resource, 'update', { ...required, updateFields }).body;
		assert.deepEqual(
			body,
			{ ...updateFields, ...expectedRequired },
			`${resource} preserves values and omits unselected fields`,
		);
	}
});

test('list expressions omit unset filters and preserve supplied filters', () => {
	for (const resource of ['timeentry', 'document', 'documentspace']) {
		assert.deepEqual(evaluate(resource, 'getall', { filterBy: '', orderBy: '' }).qs, {
			filterBy: undefined,
			orderBy: undefined,
		});
		assert.deepEqual(
			evaluate(resource, 'getall', { filterBy: 'name eq "Example"', orderBy: 'name asc' }).qs,
			{ filterBy: 'name eq "Example"', orderBy: 'name asc' },
		);
	}
});

test('pagination fetches successive pages until empty and keeps existing filters', async () => {
	const calls = [];
	const request = { options: { qs: { filterBy: 'duration gt 0' } } };
	const pages = [[{ json: { id: 'one' } }], [{ json: { id: 'two' } }], []];
	const result = await aworkApiPagination.call(
		{
			getNodeParameter: () => true,
			makeRoutingRequest: async (data) => {
				calls.push({ ...data.options.qs });
				return pages[calls.length - 1];
			},
			logger: { info() {}, warn() {} },
		},
		request,
	);
	assert.deepEqual(
		result.map((item) => item.json.id),
		['one', 'two'],
	);
	assert.deepEqual(
		calls,
		[1, 2, 3].map((page) => ({ page, filterBy: 'duration gt 0' })),
	);
});

test('pagination stops after first page when Return All is false', async () => {
	let calls = 0;
	const result = await aworkApiPagination.call(
		{
			getNodeParameter: () => false,
			makeRoutingRequest: async () => {
				calls++;
				return [{ json: { id: 'one' } }];
			},
			logger: { info() {}, warn() {} },
		},
		{ options: {} },
	);
	assert.equal(calls, 1);
	assert.equal(result.length, 1);
});

test('document content is uploaded as a UTF-8 multipart file with a matching boundary', async () => {
	for (const format of ['html', 'markdown']) {
		const request = evaluate('document', 'updatecontent', {
			documentId: 'doc',
			documentContent: 'Hello 🐙\nSecond line',
			contentFormat: format,
		});
		const result = await documentMultipartRequest.call(
			{},
			{ ...request, headers: { Accept: 'application/json', 'Content-Type': 'application/json' } },
		);
		const boundary = result.headers['Content-Type'].split('boundary=')[1];
		assert.equal(typeof result.body, 'string');
		assert.equal(result.headers.Accept, 'application/json');
		const body = result.body.toString('utf8');
		assert.ok(body.startsWith(`--${boundary}\r\n`));
		assert.ok(body.endsWith(`--${boundary}--\r\n`));
		assert.ok(
			body.includes(`name="content"; filename="document.${format === 'html' ? 'html' : 'md'}"`),
		);
		assert.ok(body.includes('Hello 🐙\nSecond line'));
		assert.ok(body.includes(`name="contentFormat"\r\n\r\n${format}\r\n`));
		const form = await new Request('https://example.invalid', {
			method: 'POST',
			headers: result.headers,
			body: result.body,
		}).formData();
		assert.equal(await form.get('content').text(), 'Hello 🐙\nSecond line');
		assert.equal(form.get('contentFormat'), format);
	}
});

test('document creation multipart preserves optional false and zero, and omits absent fields', async () => {
	const request = evaluate('document', 'create', {
		documentName: 'Notes',
		documentContent: '',
		contentFormat: 'html',
		additionalFields: { isPrivate: false, order: 0 },
	});
	const result = await documentMultipartRequest.call({}, request);
	const form = await new Request('https://example.invalid', {
		method: 'POST',
		headers: result.headers,
		body: result.body,
	}).formData();
	assert.equal(form.get('name'), 'Notes');
	assert.equal(await form.get('content').text(), '');
	assert.equal(form.get('isPrivate'), 'false');
	assert.equal(form.get('order'), '0');
	assert.equal(form.get('projectId'), null);
	assert.equal(form.get('documentSpaceId'), null);
});

test('delete operations preserve related objects by default and honor explicit deletion choices', () => {
	const defaultValue = (name, resource, value) =>
		properties.find(
			(property) =>
				property.name === name &&
				NodeHelpers.displayParameter({ resource, operation: value }, property),
		).default;
	for (const [resource, idName] of [
		['project', 'projectId'],
		['projecttask', 'taskId'],
	]) {
		assert.equal(defaultValue('deleteTimeTrackings', resource, 'delete'), false);
		const request = evaluate(resource, 'delete', {
			[idName]: 'entity',
			deleteTimeTrackings: false,
		});
		assert.equal(request.method, 'POST');
		assert.equal(request.body.deleteTimeTrackings, false);
		assert.equal(
			evaluate(resource, 'delete', { [idName]: 'entity', deleteTimeTrackings: true }).body
				.deleteTimeTrackings,
			true,
		);
		if (resource === 'projecttask') assert.deepEqual(request.body.taskIds, ['entity']);
	}
	assert.equal(defaultValue('deleteOperation', 'company', 'delete'), 'delete-only-company');
	assert.deepEqual(
		evaluate('company', 'delete', {
			companyId: 'company',
			deleteOperation: 'move',
			moveToCompany: 'target',
		}).body,
		{ deleteOperation: 'move', moveToCompany: 'target' },
	);
	assert.equal(defaultValue('deleteTasks', 'project', 'deletetasklist'), false);
	assert.equal(defaultValue('deleteTimes', 'project', 'deletetasklist'), false);
	assert.deepEqual(
		evaluate('project', 'deletetasklist', {
			projectId: 'project',
			taskListId: 'list',
			deleteTasks: false,
			deleteTimes: false,
		}).body,
		{ deleteTasks: false, deleteTimes: false },
	);
	assert.equal(defaultValue('alsoDeleteChildren', 'document', 'delete'), true);
	assert.deepEqual(
		evaluate('document', 'delete', { documentId: 'doc', alsoDeleteChildren: false }).qs,
		{ alsoDeleteChildren: false },
	);
});
