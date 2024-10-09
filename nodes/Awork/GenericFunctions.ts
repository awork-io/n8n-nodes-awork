import { DeclarativeRestApiSettings, IExecutePaginationFunctions, IExecuteSingleFunctions, IN8nHttpFullResponse, INodeExecutionData, jsonStringify } from "n8n-workflow";

export async function aworkApiPagination(
	this: IExecutePaginationFunctions,
	requestData: DeclarativeRestApiSettings.ResultOptions,
): Promise<INodeExecutionData[]> {
	let items: INodeExecutionData[] = [];
	let page = 1;

	// Fetch the returnAll parameter to determine pagination behavior
	const returnAll = this.getNodeParameter('returnAll', true) as boolean;

	// Initialize query parameters if not already set
	requestData.options.qs = requestData.options.qs || {};

	do {
		requestData.options.qs.page = page;

		// Fetch the data for the current page
		const responseData: INodeExecutionData[] = await this.makeRoutingRequest(requestData);

		// Stop if no more data is returned
		if (!responseData || responseData.length === 0) {
			break;
		}

		// Add fetched data to the items array
		items = items.concat(responseData);

		// If returnAll is false, fetch only the first page
		if (!returnAll) {
			break;
		}

		// Increment the page number to fetch the next set of data
		page += 1;

	} while (true);

	// Log the number of fetched items
	this.logger.info(`Fetched ${items.length} items`);

	return items;
}
