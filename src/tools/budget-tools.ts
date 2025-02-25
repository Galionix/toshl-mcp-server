import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { createBudgetsClient } from '../api/endpoints/budgets.js';
import logger from '../utils/logger.js';

/**
 * Sets up budget tools
 * @returns List of budget tools
 */
export function setupBudgetTools() {
    return [
        {
            name: 'budget_list',
            description: 'List all budgets in Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {},
                required: [],
            },
        },
        {
            name: 'budget_get',
            description: 'Get details of a specific budget in Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Budget ID',
                    },
                },
                required: ['id'],
            },
        },
        {
            name: 'budget_history',
            description: 'Get history of a specific budget in Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Budget ID',
                    },
                },
                required: ['id'],
            },
        },
    ];
}

/**
 * Handles the budget_list tool
 * @returns Tool response
 */
export async function handleBudgetListTool() {
    logger.debug('Handling budget_list tool');

    try {
        const budgetsClient = await createBudgetsClient();
        const budgets = await budgetsClient.listBudgets();

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(budgets, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling budget_list tool', { error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error listing budgets: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles the budget_get tool
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleBudgetGetTool(args: { id: string }) {
    logger.debug('Handling budget_get tool', { args });

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
        const budgetsClient = await createBudgetsClient();
        const budget = await budgetsClient.getBudget(args.id);

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(budget, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling budget_get tool', { args, error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error getting budget: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles the budget_history tool
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleBudgetHistoryTool(args: { id: string }) {
    logger.debug('Handling budget_history tool', { args });

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
        const budgetsClient = await createBudgetsClient();
        const history = await budgetsClient.getBudgetHistory(args.id);

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(history, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling budget_history tool', { args, error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error getting budget history: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles budget tools
 * @param toolName Tool name
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleBudgetTool(toolName: string, args: any) {
    switch (toolName) {
        case 'budget_list':
            return handleBudgetListTool();
        case 'budget_get':
            return handleBudgetGetTool(args as { id: string });
        case 'budget_history':
            return handleBudgetHistoryTool(args as { id: string });
        default:
            throw new McpError(
                ErrorCode.MethodNotFound,
                `Tool not found: ${toolName}`
            );
    }
}
