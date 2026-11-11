import { IHookFunctions, NodeOperationError } from 'n8n-workflow';

export const aworkAiApiUrl = 'https://api.awork-ai.com/api/v1';

/** Match the awork AI app's event filtering while allowing new agent events. */
export function supportsAiEvent(event: string): boolean {
	return !['task', 'company_', 'timetracking_', 'absence_'].some((prefix) =>
		event.startsWith(prefix),
	);
}

function selectedEvents(context: IHookFunctions): string[] {
	const events = context.getNodeParameter('events', []);
	if (
		!Array.isArray(events) ||
		!events.length ||
		events.some(
			(event) =>
				typeof event !== 'string' || !event || event.includes(',') || !supportsAiEvent(event),
		)
	) {
		throw new NodeOperationError(context.getNode(), 'Select at least one supported awork AI event');
	}
	return [...new Set(events as string[])];
}

function isNotFound(error: unknown): boolean {
	if (!error || typeof error !== 'object') return false;
	const details = error as {
		httpCode?: string;
		statusCode?: number;
		status?: number;
		response?: { status?: number };
	};
	return [details.httpCode, details.statusCode, details.status, details.response?.status].some(
		(status) => String(status) === '404',
	);
}

function clearWebhook(context: IHookFunctions): void {
	const data = context.getWorkflowStaticData('node');
	delete data.webhookId;
	delete data.webhookEvents;
}

export const aworkAiWebhookMethods = {
	default: {
		async checkExists(this: IHookFunctions): Promise<boolean> {
			const data = this.getWorkflowStaticData('node');
			if (!data.webhookId) return false;
			let webhook: { uri: string; events: string; isActive: boolean };
			try {
				webhook = await this.helpers.httpRequestWithAuthentication.call(this, 'aworkAiApi', {
					method: 'GET',
					url: `${aworkAiApiUrl}/webhooks/${data.webhookId}`,
					json: true,
				});
			} catch (error) {
				if (!isNotFound(error)) throw error;
				clearWebhook(this);
				return false;
			}
			// A copied workflow must not change another workflow's registration.
			if (webhook.uri !== this.getNodeWebhookUrl('default')) {
				clearWebhook(this);
				return false;
			}
			const expected = selectedEvents(this).sort();
			const registered = [...new Set(webhook.events.split(','))].sort();
			return webhook.isActive && JSON.stringify(expected) === JSON.stringify(registered);
		},
		async create(this: IHookFunctions): Promise<boolean> {
			const events = selectedEvents(this);
			const webhookUrl = this.getNodeWebhookUrl('default');
			if (
				!webhookUrl ||
				['localhost', '127.0.0.1', '[::1]'].includes(new URL(webhookUrl).hostname)
			) {
				throw new NodeOperationError(
					this.getNode(),
					'Use a public n8n webhook URL so awork AI can reach it',
				);
			}
			const data = this.getWorkflowStaticData('node');
			const existingId = data.webhookId;
			const response = await this.helpers.httpRequestWithAuthentication.call(this, 'aworkAiApi', {
				method: existingId ? 'PUT' : 'POST',
				url: `${aworkAiApiUrl}/webhooks${existingId ? `/${existingId}` : ''}`,
				body: {
					name: `n8n: ${this.getWorkflow().name} - ${events.join(',')}`,
					uri: webhookUrl,
					events: events.join(','),
					isActive: true,
					authenticationType: 'none',
				},
				json: true,
			});
			if (typeof response.id !== 'string' || !response.id) {
				throw new NodeOperationError(this.getNode(), 'awork AI did not return a webhook ID');
			}
			data.webhookId = response.id;
			data.webhookEvents = events;
			return true;
		},
		async delete(this: IHookFunctions): Promise<boolean> {
			const data = this.getWorkflowStaticData('node');
			if (!data.webhookId) return true;
			try {
				await this.helpers.httpRequestWithAuthentication.call(this, 'aworkAiApi', {
					method: 'DELETE',
					url: `${aworkAiApiUrl}/webhooks/${data.webhookId}`,
					json: true,
				});
			} catch (error) {
				if (!isNotFound(error)) throw error;
			}
			// Keep the ID on failures so deactivation can retry cleanup.
			clearWebhook(this);
			return true;
		},
	},
};
