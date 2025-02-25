import { AuthProvider, AuthType, createAuthProvider } from '../../src/api/auth.js';
import { checkRequiredEnvVars } from '../utils/test-helpers.js';

describe('AuthProvider', () => {
    beforeAll(() => {
        checkRequiredEnvVars();
    });

    test('getAuthHeaders should return valid Basic auth headers', () => {
        const authProvider = new AuthProvider({
            type: AuthType.BASIC,
            token: process.env.TOSHL_API_TOKEN
        });

        const headers = authProvider.getAuthHeaders();

        // Verify headers
        expect(headers).toHaveProperty('Authorization');
        expect(headers.Authorization).toMatch(/^Basic /);
    });

    test('isConfigured should return true with valid token', () => {
        const authProvider = new AuthProvider({
            type: AuthType.BASIC,
            token: process.env.TOSHL_API_TOKEN
        });

        expect(authProvider.isConfigured()).toBe(true);
    });

    test('createAuthProvider should create a provider from environment variables', () => {
        // Temporarily set environment variable
        const originalToken = process.env.TOSHL_API_TOKEN;
        process.env.TOSHL_API_TOKEN = 'test-token';

        const authProvider = createAuthProvider();

        // Restore original environment variable
        process.env.TOSHL_API_TOKEN = originalToken;

        expect(authProvider).toBeInstanceOf(AuthProvider);
        expect(authProvider.isConfigured()).toBe(true);
    });
});
