import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { createEntriesClient } from '../api/endpoints/entries.js';
import logger from '../utils/logger.js';

/**
 * Sets up entry resources
 * @param server MCP server
 * @param uri Resource URI
 * @returns Resource response
 */
export async function setupEntryResources(server: Server, uri: string) {
    logger.debug('Setting up entry resources', { uri });

    // Create entries client
    const entriesClient = await createEntriesClient();

    try {
        // Handle list entries
        if (uri === 'toshl://entries/list') {
            // Entries require date range parameters
            const today = new Date();
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(today.getMonth() - 1);

            const params = {
                from: oneMonthAgo.toISOString().split('T')[0],
                to: today.toISOString().split('T')[0]
            };

            const entries = await entriesClient.listEntries(params);

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(entries, null, 2),
                    },
                ],
            };
        }

        // Handle get entry by ID
        const entryMatch = uri.match(/^toshl:\/\/entries\/([^\/]+)$/);
        if (entryMatch) {
            const entryId = entryMatch[1];
            const entry = await entriesClient.getEntry(entryId);

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(entry, null, 2),
                    },
                ],
            };
        }

        // Handle entry sums
        if (uri === 'toshl://entries/sums') {
            // Entry sums require date range and currency parameters
            const today = new Date();
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(today.getMonth() - 1);

            const params = {
                from: oneMonthAgo.toISOString().split('T')[0],
                to: today.toISOString().split('T')[0],
                currency: 'USD' // Default currency
            };

            const sums = await entriesClient.getEntrySums(params);

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(sums, null, 2),
                    },
                ],
            };
        }

        // Handle entry timeline
        if (uri === 'toshl://entries/timeline') {
            // Timeline requires date range parameters
            const today = new Date();
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(today.getMonth() - 1);

            const params = {
                from: oneMonthAgo.toISOString().split('T')[0],
                to: today.toISOString().split('T')[0]
            };

            const timeline = await entriesClient.getEntryTimeline(params);

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(timeline, null, 2),
                    },
                ],
            };
        }

        // If we get here, the URI is not supported
        throw new McpError(
            ErrorCode.MethodNotFound,
            `Resource not found: ${uri}`
        );
    } catch (error) {
        // If it's already an MCP error, rethrow it
        if (error instanceof McpError) {
            throw error;
        }

        // Otherwise, wrap it in an MCP error
        logger.error('Error handling entry resource', { uri, error });
        throw new McpError(
            ErrorCode.InternalError,
            `Error handling entry resource: ${(error as Error).message}`
        );
    }
}
