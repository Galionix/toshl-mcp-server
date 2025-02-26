import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { createEntriesClient } from '../api/endpoints/entries.js';
import logger from '../utils/logger.js';

/**
 * Sets up entry tools
 * @returns List of entry tools
 */
export function setupEntryTools() {
    return [
        {
            name: 'entry_list',
            description: 'List entries in Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {
                    from: {
                        type: 'string',
                        description: 'Start date (YYYY-MM-DD)',
                    },
                    to: {
                        type: 'string',
                        description: 'End date (YYYY-MM-DD)',
                    },
                    type: {
                        type: 'string',
                        description: 'Entry type (expense, income, transaction)',
                    },
                    accounts: {
                        type: 'string',
                        description: 'Comma-separated list of account IDs',
                    },
                    categories: {
                        type: 'string',
                        description: 'Comma-separated list of category IDs',
                    },
                    tags: {
                        type: 'string',
                        description: 'Comma-separated list of tag IDs',
                    },
                    search: {
                        type: 'string',
                        description: 'Search term',
                    },
                },
                required: ['from', 'to'],
            },
        },
        {
            name: 'entry_get',
            description: 'Get details of a specific entry in Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Entry ID',
                    },
                },
                required: ['id'],
            },
        },
        {
            name: 'entry_sums',
            description: 'Get daily sums of entries in Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {
                    from: {
                        type: 'string',
                        description: 'Start date (YYYY-MM-DD)',
                    },
                    to: {
                        type: 'string',
                        description: 'End date (YYYY-MM-DD)',
                    },
                    currency: {
                        type: 'string',
                        description: 'Currency code',
                    },
                    accounts: {
                        type: 'string',
                        description: 'Comma-separated list of account IDs',
                    },
                    categories: {
                        type: 'string',
                        description: 'Comma-separated list of category IDs',
                    },
                    tags: {
                        type: 'string',
                        description: 'Comma-separated list of tag IDs',
                    },
                    range: {
                        type: 'string',
                        description: 'Sum range (day, week, month)',
                    },
                    type: {
                        type: 'string',
                        description: 'Entry type (expense, income)',
                    },
                },
                required: ['from', 'to', 'currency'],
            },
        },
        {
            name: 'entry_timeline',
            description: 'Get timeline of entries in Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {
                    from: {
                        type: 'string',
                        description: 'Start date (YYYY-MM-DD)',
                    },
                    to: {
                        type: 'string',
                        description: 'End date (YYYY-MM-DD)',
                    },
                    accounts: {
                        type: 'string',
                        description: 'Comma-separated list of account IDs',
                    },
                    categories: {
                        type: 'string',
                        description: 'Comma-separated list of category IDs',
                    },
                    tags: {
                        type: 'string',
                        description: 'Comma-separated list of tag IDs',
                    },
                },
                required: ['from', 'to'],
            },
        },
    ];
}

/**
 * Handles the entry_list tool
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleEntryListTool(args: any) {
    logger.debug('Handling entry_list tool', { args });

    if (!args.from || !args.to) {
        return {
            content: [
                {
                    type: 'text',
                    text: 'Missing required parameters: from and to dates',
                },
            ],
            isError: true,
        };
    }

    try {
        const entriesClient = await createEntriesClient();
        const entries = await entriesClient.listEntries(args);

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(entries, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling entry_list tool', { args, error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error listing entries: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles the entry_get tool
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleEntryGetTool(args: { id: string }) {
    logger.debug('Handling entry_get tool', { args });

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
        const entriesClient = await createEntriesClient();
        const entry = await entriesClient.getEntry(args.id);

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(entry, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling entry_get tool', { args, error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error getting entry: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles the entry_sums tool
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleEntrySumsTool(args: any) {
    logger.debug('Handling entry_sums tool', { args });

    if (!args.from || !args.to || !args.currency) {
        return {
            content: [
                {
                    type: 'text',
                    text: 'Missing required parameters: from, to, and currency',
                },
            ],
            isError: true,
        };
    }

    try {
        const entriesClient = await createEntriesClient();
        const sums = await entriesClient.getEntrySums(args);

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(sums, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling entry_sums tool', { args, error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error getting entry sums: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles the entry_timeline tool
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleEntryTimelineTool(args: any) {
    logger.debug('Handling entry_timeline tool', { args });

    if (!args.from || !args.to) {
        return {
            content: [
                {
                    type: 'text',
                    text: 'Missing required parameters: from and to dates',
                },
            ],
            isError: true,
        };
    }

    try {
        const entriesClient = await createEntriesClient();
        const timeline = await entriesClient.getEntryTimeline(args);

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(timeline, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling entry_timeline tool', { args, error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error getting entry timeline: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles entry tools
 * @param toolName Tool name
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleEntryTool(toolName: string, args: any) {
    switch (toolName) {
        case 'entry_list':
            return handleEntryListTool(args);
        case 'entry_get':
            return handleEntryGetTool(args as { id: string });
        case 'entry_sums':
            return handleEntrySumsTool(args);
        case 'entry_timeline':
            return handleEntryTimelineTool(args);
        default:
            throw new McpError(
                ErrorCode.MethodNotFound,
                `Tool not found: ${toolName}`
            );
    }
}
