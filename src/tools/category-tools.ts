import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { createCategoriesClient } from '../api/endpoints/categories.js';
import logger from '../utils/logger.js';

/**
 * Sets up category tools
 * @returns List of category tools
 */
export function setupCategoryTools() {
    return [
        {
            name: 'category_list',
            description: 'List all categories in Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {},
                required: [],
            },
        },
        {
            name: 'category_get',
            description: 'Get details of a specific category in Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Category ID',
                    },
                },
                required: ['id'],
            },
        },
    ];
}

/**
 * Handles the category_list tool
 * @returns Tool response
 */
export async function handleCategoryListTool() {
    logger.debug('Handling category_list tool');

    try {
        const categoriesClient = await createCategoriesClient();
        const categories = await categoriesClient.listCategories();

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(categories, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling category_list tool', { error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error listing categories: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles the category_get tool
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleCategoryGetTool(args: { id: string }) {
    logger.debug('Handling category_get tool', { args });

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
        const categoriesClient = await createCategoriesClient();
        const category = await categoriesClient.getCategory(args.id);

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(category, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling category_get tool', { args, error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error getting category: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles category tools
 * @param toolName Tool name
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleCategoryTool(toolName: string, args: any) {
    switch (toolName) {
        case 'category_list':
            return handleCategoryListTool();
        case 'category_get':
            return handleCategoryGetTool(args as { id: string });
        default:
            throw new McpError(
                ErrorCode.MethodNotFound,
                `Tool not found: ${toolName}`
            );
    }
}
