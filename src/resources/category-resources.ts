import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { createCategoriesClient } from '../api/endpoints/categories.js';
import logger from '../utils/logger.js';

/**
 * Sets up category resources
 * @param server MCP server
 * @param uri Resource URI
 * @returns Resource response
 */
export async function setupCategoryResources(server: Server, uri: string) {
    logger.debug('Setting up category resources', { uri });

    // Create categories client
    const categoriesClient = await createCategoriesClient();

    try {
        // Handle list categories
        if (uri === 'toshl://categories/list') {
            const categories = await categoriesClient.listCategories();

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(categories, null, 2),
                    },
                ],
            };
        }

        // Handle get category by ID
        const categoryMatch = uri.match(/^toshl:\/\/categories\/([^\/]+)$/);
        if (categoryMatch) {
            const categoryId = categoryMatch[1];
            const category = await categoriesClient.getCategory(categoryId);

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(category, null, 2),
                    },
                ],
            };
        }

        // If we get here, the URI is not supported
        throw new McpError(
            ErrorCode.NotFound,
            `Resource not found: ${uri}`
        );
    } catch (error) {
        // If it's already an MCP error, rethrow it
        if (error instanceof McpError) {
            throw error;
        }

        // Otherwise, wrap it in an MCP error
        logger.error('Error handling category resource', { uri, error });
        throw new McpError(
            ErrorCode.InternalError,
            `Error handling category resource: ${(error as Error).message}`
        );
    }
}
