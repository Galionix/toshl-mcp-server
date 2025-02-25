import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { createBudgetsClient } from '../api/endpoints/budgets.js';
import logger from '../utils/logger.js';

/**
 * Sets up budget resources
 * @param server MCP server
 * @param uri Resource URI
 * @returns Resource response
 */
export async function setupBudgetResources(server: Server, uri: string) {
    logger.debug('Setting up budget resources', { uri });

    // Create budgets client
    const budgetsClient = await createBudgetsClient();

    try {
        // Handle list budgets
        if (uri === 'toshl://budgets/list') {
            const budgets = await budgetsClient.listBudgets();

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(budgets, null, 2),
                    },
                ],
            };
        }

        // Handle get budget history
        const historyMatch = uri.match(/^toshl:\/\/budgets\/([^\/]+)\/history$/);
        if (historyMatch) {
            const budgetId = historyMatch[1];
            const history = await budgetsClient.getBudgetHistory(budgetId);

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(history, null, 2),
                    },
                ],
            };
        }

        // Handle get budget by ID
        const budgetMatch = uri.match(/^toshl:\/\/budgets\/([^\/]+)$/);
        if (budgetMatch) {
            const budgetId = budgetMatch[1];
            const budget = await budgetsClient.getBudget(budgetId);

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(budget, null, 2),
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
        logger.error('Error handling budget resource', { uri, error });
        throw new McpError(
            ErrorCode.InternalError,
            `Error handling budget resource: ${(error as Error).message}`
        );
    }
}
