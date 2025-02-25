import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { createTagsClient } from '../api/endpoints/tags.js';
import logger from '../utils/logger.js';

/**
 * Sets up tag tools
 * @returns List of tag tools
 */
export function setupTagTools() {
    return [
        {
            name: 'tag_list',
            description: 'List all tags in Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {},
                required: [],
            },
        },
        {
            name: 'tag_get',
            description: 'Get details of a specific tag in Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Tag ID',
                    },
                },
                required: ['id'],
            },
        },
    ];
}

/**
 * Handles the tag_list tool
 * @returns Tool response
 */
export async function handleTagListTool() {
    logger.debug('Handling tag_list tool');

    try {
        const tagsClient = await createTagsClient();
        const tags = await tagsClient.listTags();

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(tags, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling tag_list tool', { error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error listing tags: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles the tag_get tool
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleTagGetTool(args: { id: string }) {
    logger.debug('Handling tag_get tool', { args });

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
        const tagsClient = await createTagsClient();
        const tag = await tagsClient.getTag(args.id);

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(tag, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling tag_get tool', { args, error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error getting tag: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles tag tools
 * @param toolName Tool name
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleTagTool(toolName: string, args: any) {
    switch (toolName) {
        case 'tag_list':
            return handleTagListTool();
        case 'tag_get':
            return handleTagGetTool(args as { id: string });
        default:
            throw new McpError(
                ErrorCode.MethodNotFound,
                `Tool not found: ${toolName}`
            );
    }
}
