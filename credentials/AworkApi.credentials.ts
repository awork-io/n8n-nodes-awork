import {
	ICredentialType,
	INodeProperties,
	IAuthenticateGeneric,
} from 'n8n-workflow';

export class AworkApi implements ICredentialType {
	name = 'aworkApi';
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-display-name-miscased
	displayName = 'awork API';
	documentationUrl = 'https://developers.awork.com/authentication';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Enter your awork API Key',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}'
			},
		},
	};
}
