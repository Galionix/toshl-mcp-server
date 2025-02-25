import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { createAccountsClient } from '../api/endpoints/accounts.js';
import logger from '../utils/logger.js';

/**
 * Sets up account resources
 * @param server MCP server
 * @param uri Resource URI
 * @returns Resource response
 */
export async function setupAccountResources(server: Server, uri: string) {
    logger.debug('Setting up account resources', { uri });

    // Create accounts client
    const accountsClient = await createAccountsClient();

    try {
        // Handle list accounts
        if (uri === 'toshl://accounts/list') {
            const accounts = await accountsClient.listAccounts();

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(accounts, null, 2),
                    },
                ],
            };
        }

        // Handle get account by ID
        const accountMatch = uri.match(/^toshl:\/\/accounts\/([^\/]+)$/);
        if (accountMatch) {
            const accountId = accountMatch[1];
            const account = await accountsClient.getAccount(accountId);

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(account, null, 2),
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
        logger.error('Error handling account resource', { uri, error });
        throw new McpError(
            ErrorCode.InternalError,
            `Error handling account resource: ${(error as Error).message}`
        );
    }
}
