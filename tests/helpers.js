const assert = require('node:assert/strict');
const { Workflow, NodeHelpers } = require('n8n-workflow');
const { Awork } = require('../dist/nodes/Awork/Awork.node');

const awork = new Awork();
const properties = awork.description.properties;
const resources = properties.filter((property) => property.name === 'operation');
function operation(resource, value) {
	const options = resources.find((property) =>
		property.displayOptions.show.resource.includes(resource),
	);
	const selected = options.options.find((option) => option.value === value);
	assert.ok(selected, `${resource}/${value} exists`);
	return selected;
}
function evaluate(resource, value, parameters = {}) {
	const workflow = new Workflow({
		nodes: [{ name: 'awork', type: 'awork', typeVersion: 1, position: [0, 0], parameters: {} }],
		connections: {},
		active: false,
		nodeTypes: { getByNameAndVersion: () => awork },
	});
	// Supply execution parameters directly, so missing optional fields stay absent.
	workflow.nodes.awork.parameters = { resource, operation: value, ...parameters };
	return workflow.expression.getParameterValue(
		operation(resource, value).routing.request,
		null,
		0,
		0,
		'awork',
		[{ json: {} }],
		'manual',
		{},
	);
}
function visible(name, resource, operationValue, parameters = {}) {
	return properties.some(
		(property) =>
			property.name === name &&
			NodeHelpers.displayParameter(
				{ resource, operation: operationValue, returnAll: false, ...parameters },
				property,
			),
	);
}

module.exports = { properties, resources, operation, evaluate, visible };
