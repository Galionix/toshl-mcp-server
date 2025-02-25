import { ToshlApiClient } from '../toshl-client.js';
import { ToshlBudget } from '../../utils/types.js';
import logger from '../../utils/logger.js';

/**
 * Client for the Toshl Budgets API
 */
export class BudgetsClient {
    private client: ToshlApiClient;

    /**
     * Creates a new budgets client
     * @param client The Toshl API client
     */
    constructor(client: ToshlApiClient) {
        this.client = client;
        logger.debug('Budgets client initialized');
    }

    /**
     * Gets a list of all budgets
     * @returns List of budgets
     */
    async listBudgets(): Promise<ToshlBudget[]> {
        logger.debug('Fetching budgets list');

        const response = await this.client.get<ToshlBudget[]>('/budgets');
        return response.data;
    }

    /**
     * Gets a specific budget by ID
     * @param id Budget ID
     * @returns Budget details
     */
    async getBudget(id: string): Promise<ToshlBudget> {
        logger.debug('Fetching budget details', { id });

        const response = await this.client.get<ToshlBudget>(`/budgets/${id}`);
        return response.data;
    }

    /**
     * Gets the history of a specific budget
     * @param id Budget ID
     * @returns Budget history
     */
    async getBudgetHistory(id: string): Promise<any[]> {
        logger.debug('Fetching budget history', { id });

        const response = await this.client.get<any[]>(`/budgets/${id}/history`);
        return response.data;
    }
}

/**
 * Creates a budgets client using the default Toshl API client
 * @param client Optional custom Toshl API client
 * @returns Budgets client
 */
export async function createBudgetsClient(client?: ToshlApiClient): Promise<BudgetsClient> {
    // If no client is provided, import the default one
    if (!client) {
        // Using dynamic import to avoid circular dependency
        const { default: defaultClient } = await import('../toshl-client.js');
        return new BudgetsClient(defaultClient);
    }

    return new BudgetsClient(client);
}
