import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export function operations(
	resource: string,
	options: INodePropertyOptions[],
	defaultValue: string,
): INodeProperties {
	return {
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: [resource] } },
		options,
		default: defaultValue,
	};
}

export function field(
	resource: string,
	operation: string[],
	displayName: string,
	name: string,
	extra: Partial<INodeProperties> = {},
): INodeProperties {
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: [resource], operation } },
		...extra,
	};
}
