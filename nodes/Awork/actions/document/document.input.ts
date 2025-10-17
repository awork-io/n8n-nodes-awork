import { INodeProperties } from 'n8n-workflow';

export const documentInputs: INodeProperties[] =
	[
		{
			displayName: 'Document ID',
			name: 'documentId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'document',
					],
					operation: [
						'get',
						'getcontent',
						'delete',
					],
				},
			},
			default: '',
			placeholder: 'Enter the document ID',
			required: true,
			description: 'The ID of the document',
		},
		{
			displayName: 'Document Space ID',
			name: 'documentSpaceId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'document',
					],
					operation: [
						'getdocumentsofdocumentspace',
					],
				},
			},
			default: '',
			placeholder: 'Enter the document space ID',
			required: true,
			description: 'The ID of the document space',
		},
		{
			displayName: 'Document Space ID',
			name: 'documentSpaceId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'document',
					],
					operation: [
						'create',
					],
				},
			},
			default: '',
			placeholder: 'Enter the document space ID',
			description: 'The ID of the document space where the document will be created. Either documentSpaceId or projectId must be provided.',
		},
		{
			displayName: 'Project ID',
			name: 'projectId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'document',
					],
					operation: [
						'create',
					],
				},
			},
			default: '',
			placeholder: 'Enter the project ID',
			description: 'The ID of the project where the document will be created. Either documentSpaceId or projectId must be provided.',
		},
		{
			displayName: 'Project ID',
			name: 'projectId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'document',
					],
					operation: [
						'getdocumentsofproject',
					],
				},
			},
			default: '',
			placeholder: 'Enter the project ID',
			required: true,
			description: 'The ID of the project',
		},
		{
			displayName: 'Document Name',
			name: 'documentName',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'document',
					],
					operation: [
						'create',
					],
				},
			},
			default: '',
			placeholder: 'Enter the document name',
			required: true,
			description: 'The name of the document',
		},
		{
			displayName: 'Document Content',
			name: 'documentContent',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'document',
					],
					operation: [
						'create',
					],
				},
			},
			default: '',
			placeholder: 'Enter the document content (HTML)',
			description: 'The HTML content of the document',
		},
		{
			displayName: 'Emoji',
			name: 'emoji',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'document',
					],
					operation: [
						'create',
					],
				},
			},
			default: '',
			placeholder: 'Enter an emoji (e.g., 📄)',
			description: 'An emoji icon for the document',
		},
		{
			displayName: 'Parent Document ID',
			name: 'parentId',
			type: 'string',
			displayOptions: {
				show: {
					resource: [
						'document',
					],
					operation: [
						'create',
					],
				},
			},
			default: '',
			placeholder: 'Enter the parent document ID',
			description: 'The ID of another document in the same project or document space to nest this document under',
		},
	];
