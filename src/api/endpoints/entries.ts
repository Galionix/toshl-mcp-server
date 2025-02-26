import { ToshlApiClient } from '../toshl-client.js';
import { ToshlEntry, ToshlEntrySum, ToshlTimelineItem } from '../../utils/types.js';
import logger from '../../utils/logger.js';

/**
 * Client for the Toshl Entries API
 */
export class EntriesClient {
    private client: ToshlApiClient;

    constructor(client: ToshlApiClient) {
        this.client = client;
        logger.debug('Entries client initialized');
    }

    /**
     * Gets a list of entries with optional filters
     */
    async listEntries(params?: Record<string, any>): Promise<ToshlEntry[]> {
        logger.debug('Fetching entries list', { params });
        const response = await this.client.get<ToshlEntry[]>('/entries', params);
        return response.data;
    }

    /**
     * Gets a specific entry by ID
     */
    async getEntry(id: string): Promise<ToshlEntry> {
        logger.debug('Fetching entry details', { id });
        const response = await this.client.get<ToshlEntry>(`/entries/${id}`);
        return response.data;
    }

    /**
     * Gets daily entry sums
     */
    async getEntrySums(params: Record<string, any>): Promise<ToshlEntrySum[]> {
        logger.debug('Fetching entry sums', { params });
        const response = await this.client.get<ToshlEntrySum[]>('/entries/sums', params);
        return response.data;
    }

    /**
     * Gets entries timeline
     */
    async getEntryTimeline(params: Record<string, any>): Promise<ToshlTimelineItem[]> {
        logger.debug('Fetching entry timeline', { params });
        const response = await this.client.get<ToshlTimelineItem[]>('/entries/timeline', params);
        return response.data;
    }
}

/**
 * Creates an entries client using the default Toshl API client
 */
export async function createEntriesClient(client?: ToshlApiClient): Promise<EntriesClient> {
    if (!client) {
        const { default: defaultClient } = await import('../toshl-client.js');
        return new EntriesClient(defaultClient);
    }
    return new EntriesClient(client);
}
