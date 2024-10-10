import { INodeProperties } from 'n8n-workflow';

export const userResource: INodeProperties =
{
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
        show: {
            resource: [
                'user',
            ],
        },
    },
    options: [
        {
            name: 'Get All Users',
            value: 'getall',
            action: 'Get users',
            routing: {
                request: {
                    method: 'GET',
                    url: '=api/v1/users',
                    qs: {
                        filterBy: '={{$parameter["filterBy"] || undefined}}',
                    },
                }
            },
        },
    ],
    default: 'getall',
};
