import { ToshlApiClient } from '../toshl-client.js';
import { ToshlPlanning } from '../../utils/types.js';
import logger from '../../utils/logger.js';

/**
 * Client for the Toshl Planning API
 */
export class PlanningClient {
    private client: ToshlApiClient;

    /**
     * Creates a new planning client
     * @param client The Toshl API client
     */
    constructor(client: ToshlApiClient) {
        this.client = client;
        logger.debug('Planning client initialized');
    }

    /**
     * Gets planning information
     * @returns Planning information
     */
    async getPlanning(): Promise<ToshlPlanning> {
        logger.debug('Fetching planning information');

        const response = await this.client.get<ToshlPlanning>('/planning');
        return response.data;
    }

    /**
     * Gets specific planning information by ID
     * @param id Planning ID
     * @returns Planning details
     */
    async getPlanningById(id: string): Promise<ToshlPlanning> {
        logger.debug('Fetching planning details', { id });

        const response = await this.client.get<ToshlPlanning>(`/planning/${id}`);
        return response.data;
    }
}

/**
 * Creates a planning client using the default Toshl API client
 * @param client Optional custom Toshl API client
 * @returns Planning client
 */
export async function createPlanningClient(client?: ToshlApiClient): Promise<PlanningClient> {
    // If no client is provided, import the default one
    if (!client) {
        // Using dynamic import to avoid circular dependency
        const { default: defaultClient } = await import('../toshl-client.js');
        return new PlanningClient(defaultClient);
    }

    return new PlanningClient(client);
}
