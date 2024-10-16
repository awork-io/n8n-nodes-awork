import { INodeProperties } from 'n8n-workflow';

export const projectInputs: INodeProperties[] =
	[
		{
			displayName: 'Project ID',
			name: 'projectId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'project',
					],
					operation: [
						'get',
						'gettaskstatuses',
						'postprojectstatus',
						'changeprojectstatus',
						'posttaskstatus'
					],
				},
			},
			default: '',
			placeholder: 'Enter the project ID',
			required: true
		},
		{
			displayName: 'Project Name',
			name: 'projectName',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'project',
					],
					operation: [
						'post',
					],
				},
			},
			default: '',
			placeholder: 'Enter the project name',
			description: 'The name of the project',
			required: true,
		},
		{
			displayName: 'Project Description',
			name: 'projectDescription',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'project',
					],
					operation: [
						'post',
					],
				},
			},
			default: '',
			description: 'The description of the project'
		},
		{
			displayName: 'Start Date',
			name: 'startDate',
			type: 'dateTime',
			displayOptions: {
				show: {
					resource: [
						'project',
					],
					operation: [
						'post',
					],
				},
			},
			default: '',
			description: 'The start date for the project'
		},
		{
			displayName: 'Due Date',
			name: 'dueDate',
			type: 'dateTime',
			displayOptions: {
				show: {
					resource: [
						'project',
					],
					operation: [
						'post',
					],
				},
			},
			default: '',
			description: 'The due date for the project'
		},
		{
			displayName: 'Project Type ID',
			name: 'projectTypeId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'project',
					],
					operation: [
						'post',
					],
				},
			},
			default: undefined,
			description: 'The project type ID for the project',
			required: true,
		},
		{
			displayName: 'Project Status ID',
			name: 'projectStatusId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'project',
					],
					operation: [
						'post',
					],
				},
			},
			default: undefined,
			description: 'The project status ID for the project',
			required: true,
		},
		{
			displayName: 'Status Name',
			name: 'statusName',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'project',
					],
					operation: [
						'postprojectstatus',
						'posttaskstatus',
					],
				},
			},
			default: 'Not Started',
			required: true,
		},
		{
			displayName: 'Status Type',
			name: 'statusType',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'project',
					],
					operation: [
						'postprojectstatus',
						'posttaskstatus',
					],
				},
			},
			default: '',
			required: true,
		},
		{
			displayName: 'Task Status Icon',
			name: 'taskStatusIcon',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'project',
					],
					operation: [
						'posttaskstatus',
					],
				},
			},
			default: 'arrow_forward',
			required: true,
		},
		{
			displayName: 'Project Status ID',
			name: 'projectStatusId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'project',
					],
					operation: [
						'changeprojectstatus',
					],
				},
			},
			default: undefined,
			required: true,
		},
	];
