import { Buffer } from 'buffer';
import { randomUUID } from 'crypto';
import {
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	IN8nHttpFullResponse,
	NodeOperationError,
} from 'n8n-workflow';

/** Keep binary bytes intact and use n8n's storage helper for filesystem/S3-backed inputs. */
export async function fileUploadRequest(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const propertyName = this.getNodeParameter('inputBinaryProperty') as string;
	const binary = this.helpers.assertBinaryData(propertyName);
	const content = await this.helpers.getBinaryDataBuffer(propertyName);
	const boundary = `awork-${randomUUID()}`;
	// Prevent input metadata from introducing extra multipart headers.
	const fileName = (binary.fileName || 'upload').replace(/[\r\n"\\]/g, '_');
	const mimeType = /^[\w.+-]+\/[\w.+-]+$/.test(binary.mimeType)
		? binary.mimeType
		: 'application/octet-stream';
	const header = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: ${mimeType}\r\n\r\n`;
	requestOptions.body = Buffer.concat([
		Buffer.from(header, 'utf8'),
		content,
		Buffer.from(`\r\n--${boundary}--\r\n`, 'utf8'),
	]);
	requestOptions.headers = {
		...requestOptions.headers,
		'Content-Type': `multipart/form-data; boundary=${boundary}`,
	};
	requestOptions.json = false;
	return requestOptions;
}

/** Return an n8n binary item with the API's filename and MIME type. */
export async function fileDownloadResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	if (!Buffer.isBuffer(response.body)) {
		throw new NodeOperationError(this.getNode(), 'Expected a binary file response');
	}
	const disposition = response.headers['content-disposition'];
	let fileName =
		typeof disposition === 'string' ? disposition.match(/filename="([^"]+)"/i)?.[1] : undefined;
	const encodedName =
		typeof disposition === 'string'
			? disposition.match(/filename\*=UTF-8''([^;\s]+)/i)?.[1]
			: undefined;
	if (encodedName) {
		try {
			fileName = decodeURIComponent(encodedName);
		} catch {
			// A malformed optional filename must not prevent downloading the file.
		}
	}
	const contentType = response.headers['content-type'];
	const mimeType = typeof contentType === 'string' ? contentType.split(';')[0] : undefined;
	const binary = await this.helpers.prepareBinaryData(response.body, fileName, mimeType);
	const propertyName = this.getNodeParameter('outputBinaryProperty') as string;
	return items.map((item) => ({
		...item,
		json: { fileId: this.getNodeParameter('fileId') as string },
		binary: { [propertyName]: binary },
	}));
}
