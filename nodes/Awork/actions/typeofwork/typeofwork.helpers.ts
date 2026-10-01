import { IN8nHttpFullResponse, INodeExecutionData } from 'n8n-workflow';

export async function typeOfWorkIconsResponse(
	_items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	if (!Array.isArray(response.body)) return [];
	return response.body
		.filter((icon): icon is string => typeof icon === 'string')
		.map((icon) => ({ json: { icon } }));
}
