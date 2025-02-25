import { ToshlApiClient } from '../toshl-client.js';
import { ToshlUser } from '../../utils/types.js';
import logger from '../../utils/logger.js';

/**
 * Client for the Toshl Me API
 */
export class MeClient {
    private client: ToshlApiClient;

    /**
     * Creates a new me client
     * @param client The Toshl API client
     */
    constructor(client: ToshlApiClient) {
        this.client = client;
        logger.debug('Me client initialized');
    }

    /**
     * Gets the user profile
     * @returns User profile
     */
    async getProfile(): Promise<ToshlUser> {
        logger.debug('Fetching user profile');

        const response = await this.client.get<ToshlUser>('/me');
        return response.data;
    }

    /**
     * Gets the user's account summary
     * @returns Account summary
     */
    async getSummary(): Promise<any> {
        logger.debug('Fetching account summary');

        const response = await this.client.get<any>('/me/summary');
        return response.data;
    }

    /**
     * Gets the user's payment types
     * @returns Payment types
     */
    async getPaymentTypes(): Promise<any[]> {
        logger.debug('Fetching payment types');

        const response = await this.client.get<any[]>('/me/payments/types');
        return response.data;
    }

    /**
     * Gets the user's payments
     * @returns Payments
     */
    async getPayments(): Promise<any[]> {
        logger.debug('Fetching payments');

        const response = await this.client.get<any[]>('/me/payments');
        return response.data;
    }
}

/**
 * Creates a me client using the default Toshl API client
 * @param client Optional custom Toshl API client
 * @returns Me client
 */
export async function createMeClient(client?: ToshlApiClient): Promise<MeClient> {
    // If no client is provided, import the default one
    if (!client) {
        // Using dynamic import to avoid circular dependency
        const { default: defaultClient } = await import('../toshl-client.js');
        return new MeClient(defaultClient);
    }

    return new MeClient(client);
}
