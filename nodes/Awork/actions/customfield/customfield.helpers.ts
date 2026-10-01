import { IDataObject, INodeExecutionData } from 'n8n-workflow';

/** Entities with no custom values can return null instead of an empty array. */
export async function customFieldValuesResponse(
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	return items.flatMap((item) => {
		const fields = item.json.customFields;
		if (!Array.isArray(fields)) return [];
		return fields
			.filter(
				(value): value is IDataObject =>
					value !== null && typeof value === 'object' && !Array.isArray(value),
			)
			.map((json) => ({ ...item, json }));
	});
}
