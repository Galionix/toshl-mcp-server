import { MeClient, createMeClient } from '../../../src/api/endpoints/me.js';
import { createTestClient } from '../../utils/test-helpers.js';

describe('MeClient', () => {
    let client: MeClient;

    beforeAll(async () => {
        const apiClient = createTestClient();
        client = await createMeClient(apiClient);
    });

    test('getProfile should return user profile with status 200', async () => {
        const profile = await client.getProfile();

        // Verify the response
        expect(profile).toBeDefined();
        expect(profile.id).toBeDefined();
        expect(profile.email).toBeDefined();
        expect(profile.first_name).toBeDefined();
        expect(profile.last_name).toBeDefined();
        expect(profile.joined).toBeDefined();
        expect(profile.modified).toBeDefined();
    });

    test('getSummary should return account summary with status 200', async () => {
        const summary = await client.getSummary();

        // Verify the response
        expect(summary).toBeDefined();
    });

    test('getPaymentTypes should return payment types with status 200', async () => {
        const paymentTypes = await client.getPaymentTypes();

        // Verify the response
        expect(Array.isArray(paymentTypes)).toBe(true);
    });

    test('getPayments should return payments with status 200', async () => {
        const payments = await client.getPayments();

        // Verify the response
        expect(Array.isArray(payments)).toBe(true);
    });
});
