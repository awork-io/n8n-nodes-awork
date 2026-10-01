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
import { documentResource } from './actions/document/document.resource';
import { documentInputs } from './actions/document/document.input';
import { timeEntryResource } from './actions/timeentry/timeentry.resource';
import { timeEntryInputs } from './actions/timeentry/timeentry.input';
import { documentSpaceResource } from './actions/documentspace/documentspace.resource';
import { documentSpaceInputs } from './actions/documentspace/documentspace.input';
import { commonInputs } from './actions/common.input';

import { absenceResource } from './actions/absence/absence.resource';
import { absenceInputs } from './actions/absence/absence.input';
import { companyContactResource } from './actions/companycontact/companycontact.resource';
import { companyContactInputs } from './actions/companycontact/companycontact.input';
import { checklistItemResource } from './actions/checklistitem/checklistitem.resource';
import { checklistItemInputs } from './actions/checklistitem/checklistitem.input';
import { projectMemberResource } from './actions/projectmember/projectmember.resource';
import { projectMemberInputs } from './actions/projectmember/projectmember.input';
import { commentResource } from './actions/comment/comment.resource';
import { commentInputs } from './actions/comment/comment.input';
import { customFieldResource } from './actions/customfield/customfield.resource';
import { customFieldInputs } from './actions/customfield/customfield.input';
import { typeOfWorkResource } from './actions/typeofwork/typeofwork.resource';
import { typeOfWorkInputs } from './actions/typeofwork/typeofwork.input';
import { tagResource } from './actions/tag/tag.resource';
import { tagInputs } from './actions/tag/tag.input';
import { fileResource } from './actions/file/file.resource';
import { fileInputs } from './actions/file/file.input';

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
					{ name: 'Absence', value: 'absence' },
					{ name: 'Checklist Item', value: 'checklistitem' },
					{ name: 'Comment', value: 'comment' },
					{ name: 'Company', value: 'company' },
					{ name: 'Company Contact', value: 'companycontact' },
					{ name: 'Custom Field', value: 'customfield' },
					{ name: 'Document', value: 'document' },
					{ name: 'Document Space', value: 'documentspace' },
					{ name: 'File', value: 'file' },
					{ name: 'Project', value: 'project' },
					{ name: 'Project Member', value: 'projectmember' },
					{ name: 'Project Task', value: 'projecttask' },
					{ name: 'Tag', value: 'tag' },
					{ name: 'Time Entry', value: 'timeentry' },
					{ name: 'Type of Work', value: 'typeofwork' },
					{ name: 'User', value: 'user' },
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
			documentSpaceResource,
			...documentSpaceInputs,
			timeEntryResource,
			...timeEntryInputs,
			absenceResource,
			...absenceInputs,
			companyContactResource,
			...companyContactInputs,
			checklistItemResource,
			...checklistItemInputs,
			projectMemberResource,
			...projectMemberInputs,
			commentResource,
			...commentInputs,
			customFieldResource,
			...customFieldInputs,
			typeOfWorkResource,
			...typeOfWorkInputs,
			tagResource,
			...tagInputs,
			fileResource,
			...fileInputs,
			// Common inputs such as name, description, type, etc.
			...commonInputs,
			// Optional fields for pagination and filtering
			...commonProperties,
		],
	};
}
