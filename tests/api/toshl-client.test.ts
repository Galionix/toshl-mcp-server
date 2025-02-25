import { ToshlApiClient } from '../../src/api/toshl-client.js';
import { createTestClient } from '../utils/test-helpers.js';

describe('ToshlApiClient', () => {
    let client: ToshlApiClient;

    beforeAll(() => {
        client = createTestClient();
    });

    test('get method should return data with status 200', async () => {
        // Make a real API call to a simple endpoint
        const response = await client.get('/me');

        // Verify the response
        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();
        expect(response.headers).toBeDefined();
    });

    test('isAuthenticated should return true with valid credentials', () => {
        expect(client.isAuthenticated()).toBe(true);
    });

    test('getBaseUrl should return the configured base URL', () => {
        expect(client.getBaseUrl()).toBe(process.env.TOSHL_API_BASE_URL || 'https://api.toshl.com');
    });
});
