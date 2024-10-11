import { DeclarativeRestApiSettings, IExecutePaginationFunctions, INodeExecutionData } from "n8n-workflow";

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

		try {
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

		} catch (error) {
			// If we hit a rate limit (HTTP 429), handle backoff based on headers
			if (error.response && error.response.status === 429) {
				const rateLimitReset = parseInt(error.response.headers['ratelimit-reset'], 10);
				const resetDelay = rateLimitReset ? rateLimitReset * 1000 : 60000; // Default to 60 seconds if header is missing

				// Log a message and wait for the specified time before retrying
				this.logger.warn(`Rate limited. Waiting for ${resetDelay / 1000} seconds before retrying...`);
				await new Promise(resolve => setTimeout(resolve, resetDelay));

				// Retry the current request after the backoff
				continue;
			} else {
				// If the error is not related to rate limits, throw it
				throw error;
			}
		}

	} while (true);

	// Log the number of fetched items
	this.logger.info(`Fetched ${items.length} items`);

	return items;
}
