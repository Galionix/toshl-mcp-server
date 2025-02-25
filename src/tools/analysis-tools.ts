import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { createAccountsClient } from '../api/endpoints/accounts.js';
import { createCategoriesClient } from '../api/endpoints/categories.js';
import { createBudgetsClient } from '../api/endpoints/budgets.js';
import logger from '../utils/logger.js';

/**
 * Sets up analysis tools
 * @returns List of analysis tools
 */
export function setupAnalysisTools() {
    return [
        {
            name: 'analyze_spending_by_category',
            description: 'Analyze spending patterns by category',
            inputSchema: {
                type: 'object',
                properties: {},
                required: [],
            },
        },
        {
            name: 'analyze_budget_performance',
            description: 'Analyze budget adherence',
            inputSchema: {
                type: 'object',
                properties: {},
                required: [],
            },
        },
        {
            name: 'analyze_account_balance',
            description: 'Analyze account balances',
            inputSchema: {
                type: 'object',
                properties: {},
                required: [],
            },
        },
    ];
}

/**
 * Handles the analyze_spending_by_category tool
 * @returns Tool response
 */
export async function handleAnalyzeSpendingByCategoryTool() {
    logger.debug('Handling analyze_spending_by_category tool');

    try {
        const categoriesClient = await createCategoriesClient();
        const categories = await categoriesClient.listCategories();

        // In a real implementation, we would analyze spending patterns by category
        // For now, we just return the categories
        const analysis = {
            message: 'Spending analysis by category',
            categories: categories.map(category => ({
                id: category.id,
                name: category.name,
                type: category.type,
                // In a real implementation, we would include spending data here
            })),
        };

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(analysis, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling analyze_spending_by_category tool', { error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error analyzing spending by category: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles the analyze_budget_performance tool
 * @returns Tool response
 */
export async function handleAnalyzeBudgetPerformanceTool() {
    logger.debug('Handling analyze_budget_performance tool');

    try {
        const budgetsClient = await createBudgetsClient();
        const budgets = await budgetsClient.listBudgets();

        // In a real implementation, we would analyze budget performance
        // For now, we just return the budgets
        const analysis = {
            message: 'Budget performance analysis',
            budgets: budgets.map(budget => ({
                id: budget.id,
                name: budget.name,
                amount: budget.amount,
                // In a real implementation, we would include performance data here
            })),
        };

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(analysis, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling analyze_budget_performance tool', { error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error analyzing budget performance: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles the analyze_account_balance tool
 * @returns Tool response
 */
export async function handleAnalyzeAccountBalanceTool() {
    logger.debug('Handling analyze_account_balance tool');

    try {
        const accountsClient = await createAccountsClient();
        const accounts = await accountsClient.listAccounts();

        // In a real implementation, we would analyze account balances
        // For now, we just return the accounts
        const analysis = {
            message: 'Account balance analysis',
            accounts: accounts.map(account => ({
                id: account.id,
                name: account.name,
                balance: account.balance,
                // In a real implementation, we would include balance analysis here
            })),
            totalBalance: accounts.reduce((sum, account) => sum + account.balance, 0),
        };

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(analysis, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling analyze_account_balance tool', { error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error analyzing account balances: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles analysis tools
 * @param toolName Tool name
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleAnalysisTool(toolName: string, args: any) {
    switch (toolName) {
        case 'analyze_spending_by_category':
            return handleAnalyzeSpendingByCategoryTool();
        case 'analyze_budget_performance':
            return handleAnalyzeBudgetPerformanceTool();
        case 'analyze_account_balance':
            return handleAnalyzeAccountBalanceTool();
        default:
            throw new McpError(
                ErrorCode.MethodNotFound,
                `Tool not found: ${toolName}`
            );
    }
}
