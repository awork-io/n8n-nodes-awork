import { IDataObject, IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';

/** Upload content as a UTF-8 file, as required by the document API's binary form field. */
export async function documentMultipartRequest(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const fields = requestOptions.body as IDataObject;
	const boundary = `awork-${globalThis.crypto.randomUUID()}`;
	const parts: string[] = [];
	const fieldNames = [
		'name',
		'documentSpaceId',
		'parentId',
		'projectId',
		'taskId',
		'emoji',
		'isPrivate',
		'order',
		'workspaceAccessLevel',
		'isHiddenForConnectUsers',
		'content',
		'contentFormat',
	];
	for (const name of fieldNames) {
		const value = fields[name];
		if (value === undefined || value === null) continue;
		const fileHeader =
			name === 'content'
				? `; filename="document.${fields.contentFormat === 'markdown' ? 'md' : 'html'}"\r\nContent-Type: ${fields.contentFormat === 'markdown' ? 'text/markdown' : 'text/html'}; charset=utf-8`
				: '';
		parts.push(
			`--${boundary}\r\nContent-Disposition: form-data; name="${name}"${fileHeader}\r\n\r\n${String(value)}\r\n`,
		);
	}
	parts.push(`--${boundary}--\r\n`);
	requestOptions.body = parts.join('');
	requestOptions.headers = {
		...requestOptions.headers,
		'Content-Type': `multipart/form-data; boundary=${boundary}`,
	};
	return requestOptions;
}
