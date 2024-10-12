import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { commonProperties } from './common.properties';
import { projectResource } from './actions/project/project.resource';
import { projectInputs } from './actions/project/project.input';
import { taskResource } from './actions/task/task.resource';
import { taskInputs } from './actions/task/task.input';
import { userResource } from './actions/user/user.resource';
import { userInputs } from './actions/user/user.input';
import { companyResource } from './actions/company/company.resource';
import { companyInputs } from './actions/company/company.input';

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
		defaults: {
			name: 'awork',
		},
		inputs: ['main'],
		outputs: ['main'],
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
					{
						name: 'Company',
						value: 'company',
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
			// Optional fields for pagination and filtering
			...commonProperties
		],
	};
}
