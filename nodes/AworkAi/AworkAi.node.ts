import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { sharedProperties } from './shared.properties';
import { agentProperties } from './actions/agent.properties';
import { threadProperties } from './actions/thread.properties';
import { scheduleProperties } from './actions/schedule.properties';

export class AworkAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'awork AI',
		name: 'aworkAi',
		icon: 'file:aworkAi.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Automate agents, threads, and shared workspace resources in awork AI',
		usableAsTool: true,
		defaults: { name: 'awork AI' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'aworkAiApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.awork-ai.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'x-originating-app': 'n8n',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Agent', value: 'agent' },
					{ name: 'Document', value: 'document' },
					{ name: 'Document Space', value: 'documentspace' },
					{ name: 'File', value: 'file' },
					{ name: 'Project', value: 'project' },
					{ name: 'Schedule', value: 'schedule' },
					{ name: 'Thread', value: 'thread' },
					{ name: 'User', value: 'user' },
				],
				default: 'thread',
			},
			...agentProperties,
			...threadProperties,
			...scheduleProperties,
			...sharedProperties(),
		],
	};
}
