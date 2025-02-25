import logger from '../utils/logger.js';

/**
 * Authentication types supported by the Toshl API
 */
export enum AuthType {
    BASIC = 'basic',
    OAUTH = 'oauth'
}

/**
 * Authentication configuration
 */
export interface AuthConfig {
    type: AuthType;
    token?: string;
    username?: string;
    password?: string;
}

/**
 * Authentication provider for Toshl API
 */
export class AuthProvider {
    private config: AuthConfig;

    /**
     * Creates a new authentication provider
     * @param config Authentication configuration
     */
    constructor(config: AuthConfig) {
        this.config = config;
        logger.debug('Auth provider initialized', { type: config.type });
    }

    /**
     * Gets the authentication headers for API requests
     * @returns Headers object with authentication
     */
    getAuthHeaders(): Record<string, string> {
        switch (this.config.type) {
            case AuthType.BASIC:
                if (this.config.token) {
                    return {
                        'Authorization': `Basic ${Buffer.from(`${this.config.token}:`).toString('base64')}`
                    };
                }
                throw new Error('Missing token for basic authentication');

            case AuthType.OAUTH:
                if (!this.config.token) {
                    throw new Error('Missing token for OAuth authentication');
                }
                return {
                    'Authorization': `Bearer ${this.config.token}`
                };

            default:
                throw new Error(`Unsupported authentication type: ${this.config.type}`);
        }
    }

    /**
     * Checks if authentication is configured
     * @returns true if authentication is configured
     */
    isConfigured(): boolean {
        switch (this.config.type) {
            case AuthType.BASIC:
                return !!this.config.token;
            case AuthType.OAUTH:
                return !!this.config.token;
            default:
                return false;
        }
    }
}

/**
 * Creates an authentication provider from environment variables
 * @returns Configured authentication provider
 */
export function createAuthProvider(): AuthProvider {
    const token = process.env.TOSHL_API_TOKEN;

    // For now, we only support basic authentication with a token
    const config: AuthConfig = {
        type: AuthType.BASIC,
        token
    };

    return new AuthProvider(config);
}
