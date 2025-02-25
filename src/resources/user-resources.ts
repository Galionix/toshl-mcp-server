import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { createMeClient } from '../api/endpoints/me.js';
import logger from '../utils/logger.js';

/**
 * Sets up user resources
 * @param server MCP server
 * @param uri Resource URI
 * @returns Resource response
 */
export async function setupUserResources(server: Server, uri: string) {
    logger.debug('Setting up user resources', { uri });

    // Create me client
    const meClient = await createMeClient();

    try {
        // Handle get user profile
        if (uri === 'toshl://me') {
            const profile = await meClient.getProfile();

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(profile, null, 2),
                    },
                ],
            };
        }

        // Handle get account summary
        if (uri === 'toshl://me/summary') {
            const summary = await meClient.getSummary();

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(summary, null, 2),
                    },
                ],
            };
        }

        // Handle get payment types
        if (uri === 'toshl://me/payments/types') {
            const paymentTypes = await meClient.getPaymentTypes();

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(paymentTypes, null, 2),
                    },
                ],
            };
        }

        // Handle get payments
        if (uri === 'toshl://me/payments') {
            const payments = await meClient.getPayments();

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(payments, null, 2),
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
        logger.error('Error handling user resource', { uri, error });
        throw new McpError(
            ErrorCode.InternalError,
            `Error handling user resource: ${(error as Error).message}`
        );
    }
}
