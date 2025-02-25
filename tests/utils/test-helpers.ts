import dotenv from 'dotenv';
import { ToshlApiClient } from '../../src/api/toshl-client.js';
import { AuthProvider, AuthType } from '../../src/api/auth.js';
import { ApiClientConfig } from '../../src/utils/types.js';

// Load environment variables
dotenv.config();

/**
 * Checks if required environment variables are set
 * @throws Error if any required variables are missing
 */
export function checkRequiredEnvVars() {
    const requiredVars = ['TOSHL_API_TOKEN'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
}

/**
 * Creates a test API client with real credentials
 * @returns Configured ToshlApiClient
 */
export function createTestClient(): ToshlApiClient {
    checkRequiredEnvVars();

    const config: ApiClientConfig = {
        baseUrl: process.env.TOSHL_API_BASE_URL || 'https://api.toshl.com',
        token: process.env.TOSHL_API_TOKEN || '',
        timeout: 5000
    };

    const authProvider = new AuthProvider({
        type: AuthType.BASIC,
        token: config.token
    });

    return new ToshlApiClient(config, authProvider);
}
