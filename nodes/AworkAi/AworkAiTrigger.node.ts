import { ILoadOptionsFunctions, INodePropertyOptions, INodeTypeDescription } from 'n8n-workflow';
import { AworkTrigger } from '../Awork/AworkTrigger.node';
import { aworkAiApiUrl, aworkAiWebhookMethods, supportsAiEvent } from './trigger.helpers';

export class AworkAiTrigger extends AworkTrigger {
	description: INodeTypeDescription = {
		displayName: 'awork AI Trigger',
		name: 'aworkAiTrigger',
		icon: 'file:aworkAi.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Starts the workflow when awork AI events occur',
		defaults: { name: 'awork AI Trigger' },
		inputs: [],
		outputs: ['main'],
		credentials: [{ name: 'aworkAiApi', required: true }],
		webhooks: [
			{ name: 'default', httpMethod: 'POST', responseMode: 'onReceived', path: 'webhook' },
		],
		properties: [
			{
				displayName: 'Admin credentials are required to set up webhooks in awork AI.',
				name: 'notice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Event Names or IDs',
				name: 'events',
				type: 'multiOptions',
				typeOptions: { loadOptionsMethod: 'getEvents' },
				required: true,
				default: [],
				description:
					'Events to listen to. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
		],
	};

	methods = {
		loadOptions: {
			async getEvents(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const events: string[] = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'aworkAiApi',
					{
						method: 'GET',
						url: `${aworkAiApiUrl}/webhooks/eventtypes`,
						json: true,
					},
				);
				return [...new Set(events)]
					.filter(supportsAiEvent)
					.map((event) => ({
						name: event
							.split('_')
							.map((part) =>
								part === 'projectmember'
									? 'Project Member'
									: part === 'ai'
										? 'AI'
										: part.charAt(0).toUpperCase() + part.slice(1),
							)
							.join(' '),
						value: event,
					}))
					.sort((a, b) => a.name.localeCompare(b.name));
			},
		},
	};

	webhookMethods = aworkAiWebhookMethods;
}
