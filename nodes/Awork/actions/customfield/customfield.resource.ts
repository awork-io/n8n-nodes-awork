import { INodeProperties } from 'n8n-workflow';
import { customFieldValuesResponse } from './customfield.helpers';

export const customFieldResource: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['customfield'] } },
	options: [
		{
			name: 'Get Custom Field Definitions',
			value: 'getdefinitions',
			action: 'Get custom field definitions',
			routing: { request: { method: 'GET', url: '=api/v1/customfielddefinitions' } },
		},
		{
			name: 'Get Custom Field Values',
			value: 'getvalues',
			action: 'Get custom field values',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}',
				},
				output: {
					postReceive: [customFieldValuesResponse],
				},
			},
		},
		{
			name: 'Get Project Custom Field Definitions',
			value: 'getprojectdefinitions',
			action: 'Get project custom field definitions',
			routing: {
				request: {
					method: 'GET',
					url: '=api/v1/projects/{{$parameter["projectId"]}}/customfielddefinitions',
				},
			},
		},
		{
			name: 'Set Custom Field Value',
			value: 'setvalue',
			action: 'Set custom field value',
			routing: {
				request: {
					method: 'POST',
					url: '=api/v1/{{$parameter["parentType"]}}/{{$parameter["entityId"]}}/setcustomfields',
					body: '={{[{ customFieldDefinitionId: $parameter["customFieldDefinitionId"], [$parameter["valueType"]]: $parameter["clearValue"] ? null : $parameter[$parameter["valueType"]] }]}}',
				},
			},
		},
	],
	default: 'getdefinitions',
};
