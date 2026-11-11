import { INodeProperties } from 'n8n-workflow';
import { field, operations } from './helpers';

const schedulesUrl = '=api/v1/agents/{{$parameter["agentId"]}}/schedules';
const scheduleUrl = `${schedulesUrl}/{{$parameter["scheduleId"]}}`;
const body =
	'={{ { ...$parameter["additionalFields"], name: $parameter["scheduleName"], cronRule: $parameter["cronRule"] } }}';

export const scheduleProperties: INodeProperties[] = [
	operations(
		'schedule',
		[
			{
				name: 'Create',
				value: 'create',
				action: 'Create a schedule',
				routing: { request: { method: 'POST', url: schedulesUrl, body } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a schedule',
				routing: { request: { method: 'DELETE', url: scheduleUrl } },
			},
			{
				name: 'Get Many',
				value: 'getall',
				action: 'Get many schedules',
				routing: { request: { method: 'GET', url: schedulesUrl } },
			},
			{
				name: 'Get My Schedules',
				value: 'getmine',
				action: 'Get my schedules',
				routing: { request: { method: 'GET', url: '=api/v1/agents/schedules/me' } },
			},
			{
				name: 'Run',
				value: 'run',
				action: 'Run a schedule',
				routing: { request: { method: 'POST', url: `${scheduleUrl}/run` } },
			},
			{
				name: 'Set Enabled',
				value: 'setenabled',
				action: 'Enable or disable a schedule',
				routing: {
					request: {
						method: 'POST',
						url: `${scheduleUrl}/setenabled`,
						body: { isEnabled: '={{$parameter["isEnabled"]}}' },
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a schedule',
				description: 'Replace schedule settings. Supply current optional values to retain them.',
				routing: { request: { method: 'PUT', url: scheduleUrl, body } },
			},
		],
		'getmine',
	),
	field(
		'schedule',
		['getall', 'create', 'update', 'delete', 'run', 'setenabled'],
		'Agent ID',
		'agentId',
	),
	field('schedule', ['update', 'delete', 'run', 'setenabled'], 'Schedule ID', 'scheduleId'),
	field('schedule', ['create', 'update'], 'Name', 'scheduleName'),
	field('schedule', ['create', 'update'], 'Cron Rule', 'cronRule', {
		placeholder: 'e.g. 0 9 * * 1',
		description: 'Recurring schedule in cron format',
	}),
	field('schedule', ['setenabled'], 'Enabled', 'isEnabled', {
		type: 'boolean',
		default: true,
		description: 'Whether the schedule is enabled',
	}),
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: { show: { resource: ['schedule'], operation: ['create', 'update'] } },
		options: [
			{
				displayName: 'Enabled',
				name: 'isEnabled',
				type: 'boolean',
				default: true,
				description: 'Whether the schedule is enabled',
			},
			{ displayName: 'Project ID', name: 'projectId', type: 'string', default: '' },
			{
				displayName: 'Prompt',
				name: 'prompt',
				type: 'string',
				default: '',
				typeOptions: { rows: 5 },
			},
			{
				displayName: 'Recurrence Interval',
				name: 'recurrenceInterval',
				type: 'number',
				default: 1,
				typeOptions: { minValue: 1, maxValue: 99 },
				description: 'Number of matching cron occurrences between runs',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: 'Europe/Berlin',
				description: 'IANA timezone used to evaluate the cron rule',
			},
		],
	},
];
