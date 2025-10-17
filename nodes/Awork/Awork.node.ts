import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { commonProperties } from './common.properties';
import { projectResource } from './actions/project/project.resource';
import { projectInputs } from './actions/project/project.input';
import { taskResource } from './actions/task/task.resource';
import { taskInputs } from './actions/task/task.input';
import { userResource } from './actions/user/user.resource';
import { userInputs } from './actions/user/user.input';
import { companyResource } from './actions/company/company.resource';
import { companyInputs } from './actions/company/company.input';
import { documentResource } from './actions/document/document.resource';
import { documentInputs } from './actions/document/document.input';
import { commonInputs } from './actions/common.input';

export class Awork implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details
		displayName: 'awork',
		name: 'awork',
		icon: 'file:awork.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Automate your workflows with the awork API',
		usableAsTool: true,
		defaults: {
			name: 'awork',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'aworkApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.awork.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'x-originating-app': 'n8n',
			},
		},
		// Operations the node supports
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Company',
						value: 'company',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Project Task',
						value: 'projecttask',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'project',
			},
			// Operations for the Project resource
			projectResource,
			...projectInputs,
			// Operations for the Project Task resource
			taskResource,
			...taskInputs,
			// Operations for the User resource
			userResource,
			...userInputs,
			// Operations for the Company resource
			companyResource,
			...companyInputs,
			// Operations for the Document resource
			documentResource,
			...documentInputs,
			// Common inputs such as name, description, type, etc.
			...commonInputs,
			// Optional fields for pagination and filtering
			...commonProperties
		],
	};
}
