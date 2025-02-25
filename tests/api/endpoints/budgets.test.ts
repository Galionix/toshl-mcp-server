import { BudgetsClient, createBudgetsClient } from '../../../src/api/endpoints/budgets.js';
import { createTestClient } from '../../utils/test-helpers.js';

describe('BudgetsClient', () => {
    let client: BudgetsClient;

    beforeAll(async () => {
        const apiClient = createTestClient();
        client = await createBudgetsClient(apiClient);
    });

    test('listBudgets should return budgets with status 200', async () => {
        const budgets = await client.listBudgets();

        // Verify the response
        expect(Array.isArray(budgets)).toBe(true);

        // If there are budgets, verify their structure
        if (budgets.length > 0) {
            const budget = budgets[0];
            expect(budget.id).toBeDefined();
            expect(budget.name).toBeDefined();
            expect(budget.amount).toBeDefined();
            expect(budget.currency).toBeDefined();
            expect(budget.from).toBeDefined();
            expect(budget.to).toBeDefined();
        }
    });

    test('getBudget should return budget with status 200', async () => {
        // First get the list of budgets to find a valid ID
        const budgets = await client.listBudgets();

        // Skip the test if there are no budgets
        if (budgets.length === 0) {
            console.warn('Skipping getBudget test: No budgets available');
            return;
        }

        // Get the first budget ID
        const budgetId = budgets[0].id;

        // Get the budget details
        const budget = await client.getBudget(budgetId);

        // Verify the response
        expect(budget.id).toBe(budgetId);
        expect(budget.name).toBeDefined();
        expect(budget.amount).toBeDefined();
        expect(budget.currency).toBeDefined();
        expect(budget.from).toBeDefined();
        expect(budget.to).toBeDefined();
    });

    test('getBudgetHistory should return budget history with status 200', async () => {
        // First get the list of budgets to find a valid ID
        const budgets = await client.listBudgets();

        // Skip the test if there are no budgets
        if (budgets.length === 0) {
            console.warn('Skipping getBudgetHistory test: No budgets available');
            return;
        }

        // Get the first budget ID
        const budgetId = budgets[0].id;

        // Get the budget history
        const history = await client.getBudgetHistory(budgetId);

        // Verify the response
        expect(Array.isArray(history)).toBe(true);
    });
});
