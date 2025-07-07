import { IDataObject, IHookFunctions, IHttpRequestMethods, INodeType, INodeTypeDescription, IHttpRequestOptions, IWebhookFunctions, IWebhookResponseData, NodeOperationError, NodeConnectionType } from 'n8n-workflow';
export class AworkTrigger implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details
		displayName: 'awork Trigger',
		name: 'aworkTrigger',
		icon: 'file:awork.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Starts the workflow when awork events occur',
		defaults: {
			name: 'awork Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'aworkApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		// Operations the node supports
		properties: [
			{
				displayName:
					'Admin credentials are required to set up webhooks in awork.',
				name: 'notice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'Absence Added',
						value: 'absence_added',
						description: 'Triggered when an absence has been added',
					},
					{
						name: 'Absence Deleted',
						value: 'absence_deleted',
						description: 'Triggered when an absence has been deleted',
					},
					{
						name: 'Absence Updated',
						value: 'absence_updated',
						description: 'Triggered when an absence has been updated',
					},
					{
						name: 'Company Added',
						value: 'company_added',
						description: 'Triggered when a company has been added',
					},
					{
						name: 'Company Deleted',
						value: 'company_deleted',
						description: 'Triggered when a company has been deleted',
					},
					{
						name: 'Company Type Changed',
						value: 'company_type_changed',
						description: 'Triggered when the type of a company has been changed',
					},
					{
						name: 'Company Updated',
						value: 'company_updated',
						description: 'Triggered when a company has been updated',
					},
					{
						name: 'Project Added',
						value: 'project_added',
						description: 'Triggered when a project has been added',
					},
					{
						name: 'Project Comment Added',
						value: 'project_comment_added',
						description: 'Triggered when a comment has been added to a project',
					},
					{
						name: 'Project Deleted',
						value: 'project_deleted',
						description: 'Triggered when a project has been deleted',
					},
					{
						name: 'Project Member Added',
						value: 'projectmember_added',
						description: 'Triggered when a member has been added to a project',
					},
					{
						name: 'Project Member Deleted',
						value: 'projectmember_deleted',
						description: 'Triggered when a member has been deleted from a project',
					},
					{
						name: 'Project Status Changed',
						value: 'project_status_changed',
						description: 'Triggered when the status of a project has been changed',
					},
					{
						name: 'Project Type Changed',
						value: 'project_type_changed',
						description: 'Triggered when the type of a project has been changed',
					},
					{
						name: 'Project Updated',
						value: 'project_updated',
						description: 'Triggered when a project has been updated',
					},
					{
						name: 'Task Added',
						value: 'task_added',
						description: 'Triggered when a task has been added',
					},
					{
						name: 'Task Assignment Added',
						value: 'taskassignment_added',
						description: 'Triggered when a task assignment has been added',
					},
					{
						name: 'Task Assignment Deleted',
						value: 'taskassignment_deleted',
						description: 'Triggered when a task assignment has been deleted',
					},
					{
						name: 'Task Comment Added',
						value: 'task_comment_added',
						description: 'Triggered when a comment has been added to a task',
					},
					{
						name: 'Task Deleted',
						value: 'task_deleted',
						description: 'Triggered when a task has been deleted',
					},
					{
						name: 'Task List Added',
						value: 'tasklist_added',
						description: 'Triggered when a task list has been added',
					},
					{
						name: 'Task List Deleted',
						value: 'tasklist_deleted',
						description: 'Triggered when a task list has been deleted',
					},
					{
						name: 'Task List Updated',
						value: 'tasklist_updated',
						description: 'Triggered when a task list has been updated',
					},
					{
						name: 'Task Status Changed',
						value: 'task_status_changed',
						description: 'Triggered when the status of a task has been changed',
					},
					{
						name: 'Task Type Changed',
						value: 'task_type_changed',
						description: 'Triggered when the type of a task has been changed',
					},
					{
						name: 'Task Updated',
						value: 'task_updated',
						description: 'Triggered when a task has been updated',
					},
					{
						name: 'Time Tracking Added',
						value: 'timetracking_added',
						description: 'Triggered when a time tracking entry has been added',
					},
					{
						name: 'Time Tracking Deleted',
						value: 'timetracking_deleted',
						description: 'Triggered when a time tracking entry has been deleted',
					},
					{
						name: 'Time Tracking Type Changed',
						value: 'timetracking_type_changed',
						description: 'Triggered when the type of a time tracking entry has been changed',
					},
					{
						name: 'Time Tracking Updated',
						value: 'timetracking_updated',
						description: 'Triggered when a time tracking entry has been updated',
					},
					{
						name: 'User Activation Changed',
						value: 'user_activation_changed',
						description: 'Triggered when a user\'s activation status has been changed',
					},
					{
						name: 'User Added',
						value: 'user_added',
						description: 'Triggered when a user has been added',
					},
					{
						name: 'User Deleted',
						value: 'user_deleted',
						description: 'Triggered when a user has been deleted',
					},
					{
						name: 'User Status Changed',
						value: 'user_status_changed',
						description: 'Triggered when a user\'s status has been changed',
					},
					{
						name: 'User Updated',
						value: 'user_updated',
						description: 'Triggered when a user has been updated',
					},
				],
				required: true,
				default: [],
				description: 'The events to listen to',
			}
		]
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId === undefined) {
					// No webhook id is set so no webhook can exist
					this.logger.debug('No webhook defined');
					return false;
				}

				const options: IHttpRequestOptions = {
					method: 'GET' as IHttpRequestMethods,
					url: `https://api.awork.com/api/v1/webhooks/${webhookData.webhookId}`,
					json: true,
				};

				try {
					await this.helpers.requestWithAuthentication!.call(this, 'aworkApi', options);
				} catch (error) {
					if (error.status === 404) {
						// Webhook does not exist
						delete webhookData.webhookId;
						delete webhookData.webhookEvents;

						this.logger.debug('No existing webhook found');
						return false;
					}

					throw error;
				}

				// If it did not error then the webhook exists
				this.logger.debug('Existing webhook found');
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const workflow = this.getWorkflow();
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const events = this.getNodeParameter('events', []) as string[];

				if (webhookUrl.includes('//localhost')) {
					throw new NodeOperationError(
						this.getNode(),
						'The webhook will not work on "localhost". Please either set up n8n on a custom domain or start with "--tunnel"!',
					);
				}

				const webhookData = this.getWorkflowStaticData('node');

				this.logger.info('Creating webhook');
				const eventString = Array.isArray(events) ? events.join(',') : events

				const body = {
					name: `n8n: ${workflow.name} - ${eventString}`,
					uri: webhookUrl,
					events: eventString,
					isActive: true,
					authenticationType: 'none',
				};

				const options: IHttpRequestOptions = {
					method: 'POST' as IHttpRequestMethods,
					url: 'https://api.awork.com/api/v1/webhooks',
					headers: {
						'Content-Type': 'application/json',
					},
					body,
					json: true,
				};

				try {
					const responseData = await this.helpers.requestWithAuthentication!.call(this, 'aworkApi', options);
					this.logger.debug('Webhook created');
					this.logger.debug(JSON.stringify(responseData))

					webhookData.webhookId = responseData.id as string;
					webhookData.webhookEvents = responseData.events as string[];

					return true;
				} catch (error) {
					// Log error and return false if creation fails
					this.logger.error('Error creating webhook:', error);
					return false;
				}
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				this.logger.debug('Deleting webhook');

				const options: IHttpRequestOptions = {
					method: 'DELETE' as IHttpRequestMethods,
					url: `https://api.awork.com/api/v1/webhooks/${webhookData.webhookId}`,
					json: true,
				};

				// Remove from the static workflow data so that it is clear
				// that no webhooks are registered anymore
				delete webhookData.webhookId;
				delete webhookData.webhookEvents;

				try {
					await this.helpers.requestWithAuthentication!.call(this, 'aworkApi', options);
					this.logger.info('Webhook deleted');
					return true;
				} catch (error) {
					this.logger.debug(JSON.stringify(error));
					if (error.status === 404) {
						// Webhook no longer exists, just return true
						return true
					}

					// Log error and return false if deletion fails
					this.logger.error('Error deleting webhook:', error);
					return false;
				}
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();

		const returnData: IDataObject[] = [];

		returnData.push({
			body: bodyData,
			headers: this.getHeaderData(),
			query: this.getQueryData(),
		});

		return {
			workflowData: [this.helpers.returnJsonArray(returnData)],
			webhookResponse: {
				statusCode: 200,
				body: {
					data: 'received',
				},
			},
		};
	}
}
