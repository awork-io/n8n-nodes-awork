import { DeclarativeRestApiSettings, IExecutePaginationFunctions, INodeExecutionData } from "n8n-workflow";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function aworkApiPagination(
	this: IExecutePaginationFunctions,
	requestData: DeclarativeRestApiSettings.ResultOptions,
): Promise<INodeExecutionData[]> {
	let items: INodeExecutionData[] = [];
	let page = 1;

	const returnAll = this.getNodeParameter('returnAll', true) as boolean;

	requestData.options.qs = requestData.options.qs || {};

	do {
		requestData.options.qs.page = page;

		try {
			const responseData: INodeExecutionData[] = await this.makeRoutingRequest(requestData);

			if (!responseData || responseData.length === 0) {
				break;
			}

			items = items.concat(responseData);

			if (!returnAll) {
				break;
			}

			page += 1;

		} catch (error) {
			if (error.response && error.response.status === 429) {
				const rateLimitReset = parseInt(error.response.headers['ratelimit-reset'], 10);
				const resetDelay = rateLimitReset ? rateLimitReset * 1000 : 60000;

				this.logger.warn(`Rate limited. Waiting for ${resetDelay / 1000} seconds before retrying...`);
				await sleep(resetDelay);

				continue;
			} else {
				throw error;
			}
		}

	} while (true);

	this.logger.info(`Fetched ${items.length} items`);

	return items;
}
