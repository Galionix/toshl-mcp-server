import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { createAccountsClient } from '../api/endpoints/accounts.js';
import logger from '../utils/logger.js';

/**
 * Sets up account tools
 * @returns List of account tools
 */
export function setupAccountTools() {
    return [
        {
            name: 'account_list',
            description: 'List all accounts in Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {},
                required: [],
            },
        },
        {
            name: 'account_get',
            description: 'Get details of a specific account in Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Account ID',
                    },
                },
                required: ['id'],
            },
        },
    ];
}

/**
 * Handles the account_list tool
 * @returns Tool response
 */
export async function handleAccountListTool() {
    logger.debug('Handling account_list tool');

    try {
        const accountsClient = await createAccountsClient();
        const accounts = await accountsClient.listAccounts();

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(accounts, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling account_list tool', { error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error listing accounts: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles the account_get tool
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleAccountGetTool(args: { id: string }) {
    logger.debug('Handling account_get tool', { args });

    if (!args.id) {
        return {
            content: [
                {
                    type: 'text',
                    text: 'Missing required parameter: id',
                },
            ],
            isError: true,
        };
    }

    try {
        const accountsClient = await createAccountsClient();
        const account = await accountsClient.getAccount(args.id);

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(account, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling account_get tool', { args, error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error getting account: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles account tools
 * @param toolName Tool name
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleAccountTool(toolName: string, args: any) {
    switch (toolName) {
        case 'account_list':
            return handleAccountListTool();
        case 'account_get':
            return handleAccountGetTool(args as { id: string });
        default:
            throw new McpError(
                ErrorCode.MethodNotFound,
                `Tool not found: ${toolName}`
            );
    }
}
