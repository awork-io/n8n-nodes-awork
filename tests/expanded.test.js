const assert = require('node:assert/strict');
const { test } = require('node:test');
const { NodeHelpers } = require('n8n-workflow');
const { properties, resources, operation, evaluate, visible } = require('./helpers');
const {
	customFieldValuesResponse,
} = require('../dist/nodes/Awork/actions/customfield/customfield.helpers');
const {
	fileUploadRequest,
	fileDownloadResponse,
} = require('../dist/nodes/Awork/actions/file/file.helpers');
const {
	typeOfWorkIconsResponse,
} = require('../dist/nodes/Awork/actions/typeofwork/typeofwork.helpers');
const id = '123e4567-e89b-12d3-a456-426614174000';

test('custom fields expose reads and value writes without schema or linking operations', () => {
	assert.ok(!properties.find((p) => p.name === 'resource').options.some((o) => o.value === 'team'));
	const options = resources.find((p) =>
		p.displayOptions.show.resource.includes('customfield'),
	).options;
	assert.deepEqual(options.map((o) => o.value).sort(), [
		'getdefinitions',
		'getprojectdefinitions',
		'getvalues',
		'setvalue',
	]);
	for (const parentType of ['projects', 'tasks']) {
		for (const [valueType, value] of [
			['textValue', ''],
			['numberValue', 0],
			['booleanValue', false],
			['dateValue', '2026-10-01T12:00:00Z'],
			['userIdValue', id],
			['clientIdValue', id],
			['selectionOptionIdValue', id],
		]) {
			const parameters = {
				parentType,
				entityId: id,
				customFieldDefinitionId: id,
				valueType,
				clearValue: false,
				[valueType]: value,
			};
			const request = evaluate('customfield', 'setvalue', parameters);
			assert.equal(request.url, `api/v1/${parentType}/${id}/setcustomfields`);
			assert.deepEqual(request.body, [{ customFieldDefinitionId: id, [valueType]: value }]);
			assert.ok(visible(valueType, 'customfield', 'setvalue', parameters));
			assert.ok(
				!visible(valueType, 'customfield', 'setvalue', { ...parameters, clearValue: true }),
			);
			assert.deepEqual(
				evaluate('customfield', 'setvalue', { ...parameters, clearValue: true }).body,
				[{ customFieldDefinitionId: id, [valueType]: null }],
			);
		}
	}
});

test('custom value reads output individual values and return no items for empty fields', async () => {
	const fields = [
		{ customFieldDefinitionId: id, numberValue: 0 },
		{ customFieldDefinitionId: id, booleanValue: false },
	];
	const input = [{ json: { name: 'Project', customFields: fields }, pairedItem: { item: 2 } }];
	assert.equal(
		operation('customfield', 'getvalues').routing.output.postReceive[0],
		customFieldValuesResponse,
	);
	assert.deepEqual(
		await customFieldValuesResponse(input),
		fields.map((json) => ({ json, pairedItem: { item: 2 } })),
	);
	for (const customFields of [null, undefined, []])
		assert.deepEqual(await customFieldValuesResponse([{ json: { customFields } }]), []);
});

test('comment CRUD routes work for each parent and preserve optional visibility and replies', () => {
	for (const parentType of ['projects', 'tasks', 'documents']) {
		const parameters = { parentType, entityId: id, commentId: id, commentMessage: 'Hello team' };
		assert.deepEqual(
			evaluate('comment', 'create', {
				...parameters,
				additionalFields: { isHiddenForConnectUsers: false, inReplyToCommentId: id },
			}).body,
			{ message: 'Hello team', isHiddenForConnectUsers: false, inReplyToCommentId: id },
		);
		const updated = evaluate('comment', 'update', {
			...parameters,
			updateFields: { isHiddenForConnectUsers: false },
		});
		assert.equal(updated.method, 'PUT');
		assert.deepEqual(updated.body, { message: 'Hello team', isHiddenForConnectUsers: false });
		assert.ok(!Object.hasOwn(updated.body, 'inReplyToCommentId'));
		const resolved = operation('comment', 'setresolved');
		assert.equal(
			NodeHelpers.displayParameter({ parentType }, resolved),
			parentType === 'documents',
		);
	}
	assert.deepEqual(
		evaluate('comment', 'setresolved', { entityId: id, commentId: id, isResolved: false }).body,
		{ isResolved: false },
	);
});

test('project membership sends role and responsibility only for add/update', () => {
	for (const value of ['add', 'update']) {
		const request = evaluate('projectmember', value, {
			projectId: id,
			userId: id,
			projectRoleId: id,
			isResponsible: false,
		});
		assert.equal(request.method, 'POST');
		assert.deepEqual(request.body, { userId: id, projectRoleId: id, isResponsible: false });
	}
	assert.deepEqual(evaluate('projectmember', 'remove', { projectId: id, userId: id }).body, {
		userId: id,
	});
	assert.ok(visible('returnAll', 'projectmember', 'getroles'));
	assert.equal(evaluate('projectmember', 'getroles', {}).qs.includeMembers, false);
	assert.ok(!visible('returnAll', 'projectmember', 'getmembers'));
});

test('contact type controls subtype, labels, and address fields with normalized defaults', () => {
	const cases = [
		{ contactType: 'email', subType: 'invoice', contactValue: 'billing@example.com' },
		{ contactType: 'url', subType: 'primary', contactValue: 'https://example.com' },
		{ contactType: 'phone', subType: 'central', contactValue: '+49 12345' },
		{ contactType: 'custom', contactLabel: 'Contact person', contactValue: 'Alex' },
		{
			contactType: 'address',
			subType: 'central',
			additionalFields: {
				addressLine1: 'Main Street 1',
				zipCode: '10119',
				city: 'Berlin',
				country: 'DE',
			},
		},
	];
	for (const value of ['create', 'update'])
		for (const fields of cases) {
			const params = NodeHelpers.getNodeParameters(
				properties,
				{
					resource: 'companycontact',
					operation: value,
					companyId: id,
					contactInfoId: id,
					...fields,
				},
				true,
				false,
				null,
				null,
			);
			const body = evaluate('companycontact', value, params).body;
			assert.equal(body.type, fields.contactType);
			assert.equal(body.isAddress, fields.contactType === 'address');
			assert.equal(body.subType, fields.subType);
			assert.equal(body.label, fields.contactLabel);
			if (fields.contactType === 'address')
				for (const [key, val] of Object.entries(fields.additionalFields))
					assert.equal(body[key], val);
			assert.equal(
				visible('subType', 'companycontact', value, fields),
				fields.contactType !== 'custom',
			);
			assert.equal(
				visible('contactLabel', 'companycontact', value, fields),
				fields.contactType === 'custom',
			);
		}
});

test('checklists and absences preserve explicit false, zero, and selected fields', () => {
	for (const value of ['create', 'update']) {
		const selected = value === 'create' ? 'additionalFields' : 'updateFields';
		assert.deepEqual(
			evaluate('checklistitem', value, {
				taskId: id,
				checklistItemId: id,
				checklistName: 'Review',
				[selected]: { isDone: false, order: 0 },
			}).body,
			{ name: 'Review', isDone: false, order: 0 },
		);
		const required = { userId: id, startOn: '2026-10-01T00:00:00Z', endOn: '2026-10-02T00:00:00Z' };
		const optional = {
			isHalfDayOnStart: false,
			isHalfDayOnEnd: false,
			externalProvider: 'HR System',
			description: '',
		};
		assert.deepEqual(
			evaluate('absence', value, { absenceId: id, ...required, [selected]: optional }).body,
			{ ...required, ...optional },
		);
	}
	assert.ok(!visible('returnAll', 'checklistitem', 'getall'));
});

test('tags use batch assignment bodies and object bodies for global changes', () => {
	for (const parentType of ['projects', 'tasks', 'companies', 'users']) {
		const parameters = { parentType, entityId: id, tagName: 'Design', tagColor: 'purple' };
		assert.deepEqual(evaluate('tag', 'add', parameters).body, [
			{ name: 'Design', color: 'purple' },
		]);
		assert.deepEqual(evaluate('tag', 'remove', parameters).body, [{ name: 'Design' }]);
		assert.deepEqual(evaluate('tag', 'delete', parameters).body, { name: 'Design' });
		assert.deepEqual(
			evaluate('tag', 'update', { ...parameters, oldTagName: 'Creative', shouldMerge: false }).body,
			{ oldTagName: 'Creative', newTag: { name: 'Design', color: 'purple' }, shouldMerge: false },
		);
	}
});

test('type of work operations retain optional empty text, replacement IDs, and archive choices', async () => {
	for (const value of ['create', 'update']) {
		const selected = value === 'create' ? 'additionalFields' : 'updateFields';
		assert.deepEqual(
			evaluate('typeofwork', value, {
				typeOfWorkId: id,
				workName: 'Design',
				[selected]: { description: '', icon: 'palette' },
			}).body,
			{ name: 'Design', description: '', icon: 'palette' },
		);
	}
	assert.deepEqual(
		evaluate('typeofwork', 'delete', { typeOfWorkId: id, replacementTypeOfWorkId: id }).body,
		{ typeOfWorkId: id },
	);
	assert.deepEqual(
		evaluate('typeofwork', 'setarchived', { typeOfWorkId: id, isArchived: false }).body,
		{ isArchived: false },
	);
	assert.deepEqual(
		await typeOfWorkIconsResponse([], { body: ['palette', 'code'], headers: {}, statusCode: 200 }),
		[{ json: { icon: 'palette' } }, { json: { icon: 'code' } }],
	);
});

test('file upload reads n8n binary storage and preserves arbitrary bytes in multipart form', async () => {
	const bytes = Buffer.from([0, 255, 128, 13, 10, 1]);
	const calls = [];
	const request = await fileUploadRequest.call(
		{
			getNodeParameter: () => 'attachment',
			helpers: {
				assertBinaryData: (name) => {
					calls.push(name);
					return { fileName: 'report.pdf', mimeType: 'application/pdf' };
				},
				getBinaryDataBuffer: async (name) => {
					calls.push(name);
					return bytes;
				},
			},
		},
		{
			url: 'https://example.invalid',
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'x-originating-app': 'n8n' },
		},
	);
	assert.deepEqual(calls, ['attachment', 'attachment']);
	assert.equal(request.json, false);
	assert.equal(request.headers['x-originating-app'], 'n8n');
	const form = await new Request(request.url, {
		method: request.method,
		headers: request.headers,
		body: request.body,
	}).formData();
	const file = form.get('file');
	assert.equal(file.name, 'report.pdf');
	assert.equal(file.type, 'application/pdf');
	assert.deepEqual(Buffer.from(await file.arrayBuffer()), bytes);
});

test('file upload rejects missing binary input before reading storage and sanitizes header metadata', async () => {
	let read = false;
	const missing = new Error('Missing binary field');
	await assert.rejects(
		fileUploadRequest.call(
			{
				getNodeParameter: () => 'data',
				helpers: {
					assertBinaryData: () => {
						throw missing;
					},
					getBinaryDataBuffer: async () => {
						read = true;
					},
				},
			},
			{ url: 'https://example.invalid' },
		),
		(error) => error === missing,
	);
	assert.equal(read, false);
	const request = await fileUploadRequest.call(
		{
			getNodeParameter: () => 'data',
			helpers: {
				assertBinaryData: () => ({
					fileName: 'a"\r\nInjected: yes.pdf',
					mimeType: 'text/plain\r\nInjected: yes',
				}),
				getBinaryDataBuffer: async () => Buffer.alloc(0),
			},
		},
		{ url: 'https://example.invalid' },
	);
	const body = request.body.toString();
	assert.ok(!body.includes('\r\nInjected:'));
	assert.ok(body.includes('Content-Type: application/octet-stream'));
});

test('file downloads keep binary metadata, chosen output field, and item pairing', async () => {
	const request = evaluate('file', 'download', {
		parentType: 'projects',
		entityId: id,
		fileId: id,
	});
	assert.equal(request.encoding, 'arraybuffer');
	assert.equal(request.json, false);
	assert.equal(operation('file', 'download').routing.output.postReceive[0], fileDownloadResponse);
	const bytes = Buffer.from([255, 0, 128]);
	const result = await fileDownloadResponse.call(
		{
			getNodeParameter: (name) => (name === 'outputBinaryProperty' ? 'attachment' : id),
			helpers: {
				prepareBinaryData: async (content, fileName, mimeType) => {
					assert.deepEqual(content, bytes);
					assert.equal(fileName, 'report.pdf');
					assert.equal(mimeType, 'application/pdf');
					return { data: 'stored-reference', fileName, mimeType };
				},
			},
		},
		[{ json: {}, pairedItem: { item: 3 } }],
		{
			body: bytes,
			statusCode: 200,
			headers: {
				'content-disposition': 'attachment; filename="report.pdf"',
				'content-type': 'application/pdf',
			},
		},
	);
	assert.deepEqual(result, [
		{
			json: { fileId: id },
			pairedItem: { item: 3 },
			binary: {
				attachment: {
					data: 'stored-reference',
					fileName: 'report.pdf',
					mimeType: 'application/pdf',
				},
			},
		},
	]);
	assert.equal(
		NodeHelpers.displayParameter({ parentType: 'companies' }, operation('file', 'getall')),
		false,
	);
});

test('file metadata and URL uploads send selected fields with empty descriptions', () => {
	assert.deepEqual(
		evaluate('file', 'uploadurl', {
			parentType: 'tasks',
			entityId: id,
			fileUrl: 'https://example.com/report.pdf',
			additionalFields: { name: 'Report', description: '' },
		}).body,
		{ url: 'https://example.com/report.pdf', name: 'Report', description: '' },
	);
	assert.deepEqual(
		evaluate('file', 'update', {
			parentType: 'tasks',
			entityId: id,
			fileId: id,
			updateFields: { description: '' },
		}).body,
		{ description: '' },
	);
});

test('file downloads prefer UTF-8 filenames and tolerate malformed optional filename headers', async () => {
	for (const [encoded, expected] of [
		['Gr%C3%BC%C3%9Fe.pdf', 'Grüße.pdf'],
		['%ZZ', 'fallback.pdf'],
	]) {
		await fileDownloadResponse.call(
			{
				getNodeParameter: () => 'data',
				helpers: {
					prepareBinaryData: async (_bytes, fileName) => {
						assert.equal(fileName, expected);
						return { data: '', mimeType: 'application/pdf' };
					},
				},
			},
			[{ json: {} }],
			{
				body: Buffer.alloc(0),
				statusCode: 200,
				headers: {
					'content-disposition': `attachment; filename="fallback.pdf"; filename*=UTF-8''${encoded}`,
				},
			},
		);
	}
});
