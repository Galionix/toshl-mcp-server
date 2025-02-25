import NodeCache from 'node-cache';
import { CacheConfig } from './types.js';
import logger from './logger.js';

/**
 * Cache implementation using node-cache
 */
export class Cache {
    private cache: NodeCache;
    private config: CacheConfig;

    /**
     * Creates a new cache instance
     * @param config Cache configuration
     */
    constructor(config: CacheConfig) {
        this.config = config;
        this.cache = new NodeCache({
            stdTTL: config.ttl,
            checkperiod: Math.floor(config.ttl / 10), // Check for expired keys at 1/10 of the TTL
            useClones: false // Don't clone objects (for performance)
        });

        logger.debug('Cache initialized', { config });
    }

    /**
     * Gets a value from the cache
     * @param key The cache key
     * @returns The cached value or undefined if not found
     */
    get<T>(key: string): T | undefined {
        if (!this.config.enabled) {
            return undefined;
        }

        const value = this.cache.get<T>(key);
        logger.debug(`Cache ${value !== undefined ? 'hit' : 'miss'}`, { key });
        return value;
    }

    /**
     * Sets a value in the cache
     * @param key The cache key
     * @param value The value to cache
     * @param ttl Optional TTL in seconds (overrides the default)
     * @returns true if the value was set successfully
     */
    set<T>(key: string, value: T, ttl?: number): boolean {
        if (!this.config.enabled) {
            return false;
        }

        const result = this.cache.set(key, value, ttl);
        logger.debug('Cache set', { key, ttl });
        return result;
    }

    /**
     * Deletes a value from the cache
     * @param key The cache key
     * @returns true if the value was deleted successfully
     */
    delete(key: string): boolean {
        if (!this.config.enabled) {
            return false;
        }

        const result = this.cache.del(key);
        logger.debug('Cache delete', { key, success: result > 0 });
        return result > 0;
    }

    /**
     * Clears the entire cache
     */
    clear(): void {
        this.cache.flushAll();
        logger.debug('Cache cleared');
    }

    /**
     * Gets cache statistics
     * @returns Cache statistics
     */
    getStats() {
        return this.cache.getStats();
    }
}

/**
 * Creates a cache instance from environment variables
 * @returns A configured cache instance
 */
export function createCache(): Cache {
    const config: CacheConfig = {
        enabled: process.env.CACHE_ENABLED !== 'false',
        ttl: parseInt(process.env.CACHE_TTL || '3600', 10)
    };

    return new Cache(config);
}

// Create a default cache instance
const cache = createCache();

export default cache;
