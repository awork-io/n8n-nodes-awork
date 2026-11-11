import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { Awork } from '../Awork/Awork.node';

// Explicit allowlists keep new PM operations out of the AI node until reviewed.
const capabilities: Record<string, string[]> = {
	project: [
		'getall',
		'get',
		'getprojectstatuses',
		'getprojectstatusesofproject',
		'post',
		'postprojectstatus',
		'changeprojectstatus',
		'update',
		'delete',
	],
	document: [
		'getall',
		'get',
		'getcontent',
		'getdocumentsofdocumentspace',
		'getdocumentsofproject',
		'create',
		'update',
		'updatecontent',
		'delete',
	],
	documentspace: ['create', 'delete', 'get', 'getall', 'update'],
	file: ['delete', 'download', 'get', 'getall', 'update', 'upload', 'uploadurl'],
	user: ['getall', 'get'],
};

const excludedFields = new Set([
	'taskId',
	'taskStatusIcon',
	'taskListId',
	'taskListName',
	'taskListUpdateFields',
	'deleteTasks',
	'deleteTimes',
	'deleteTimeTrackings',
	'projectTemplateId',
	'isBillableByDefault',
	'deductNonBillableHours',
	'timeBudget',
]);

/** Copy descriptions while retaining routing callbacks and keeping awork untouched. */
function copy<T>(value: T): T {
	if (Array.isArray(value)) return value.map(copy) as T;
	if (value !== null && typeof value === 'object') {
		return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, copy(entry)])) as T;
	}
	return value;
}

export function sharedProperties(): INodeProperties[] {
	const properties: INodeProperties[] = [];
	for (const original of new Awork().description.properties) {
		const resources = original.displayOptions?.show?.resource;
		if (!resources || excludedFields.has(original.name)) continue;
		const supported = resources.filter(
			(resource) => typeof resource === 'string' && resource in capabilities,
		) as string[];
		if (!supported.length) continue;
		const property = copy(original);
		property.displayOptions!.show!.resource = supported;
		const operations = [...new Set(supported.flatMap((resource) => capabilities[resource]))];
		if (property.displayOptions!.show!.operation) {
			const shown = property.displayOptions!.show!.operation!.filter((operation) =>
				operations.includes(String(operation)),
			);
			if (!shown.length) continue;
			property.displayOptions!.show!.operation = shown;
		}
		if (property.name === 'operation') {
			property.options = (property.options as INodePropertyOptions[]).filter((option) =>
				operations.includes(String(option.value)),
			);
			if (!operations.includes(String(property.default))) property.default = 'getall';
			if (supported.includes('project')) {
				for (const option of property.options as INodePropertyOptions[]) {
					const request = option.routing!.request!;
					if (option.value === 'delete') request.qs = { deleteTimeTrackings: false };
					if (option.value === 'post') {
						delete (request.body as Record<string, unknown>).projectTemplateId;
					}
				}
			}
		} else if (property.type === 'collection') {
			property.options = (property.options as INodeProperties[]).filter(
				(field) => !excludedFields.has(field.name),
			);
		} else if (property.name === 'parentType') {
			property.options = (property.options as INodePropertyOptions[]).filter((option) =>
				['documents', 'projects', 'users'].includes(String(option.value)),
			);
			property.default = 'projects';
		}
		if (property.name === 'documentSpaceId' && property.required !== true) {
			property.description =
				'The document space where the document will be created. Leave empty for a project or private document.';
		}
		if (
			property.name === 'projectId' &&
			supported.includes('document') &&
			property.required !== true
		) {
			property.description =
				'The project where the document will be created. Leave empty for a document space or private document.';
		}
		properties.push(property);
	}
	return properties;
}
