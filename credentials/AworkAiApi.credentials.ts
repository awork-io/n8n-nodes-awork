import { INodeProperties } from 'n8n-workflow';
import { AworkApi } from './AworkApi.credentials';

export class AworkAiApi extends AworkApi {
	name = 'aworkAiApi';
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-display-name-miscased
	displayName = 'awork AI API';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'API key for your awork AI workspace',
		},
	];
	test = {
		request: {
			baseURL: 'https://api.awork-ai.com',
			url: '/api/v1/users/me',
		},
	};
}
