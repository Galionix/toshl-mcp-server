import { AccountsClient, createAccountsClient } from '../../../src/api/endpoints/accounts.js';
import { createTestClient } from '../../utils/test-helpers.js';

describe('AccountsClient', () => {
    let client: AccountsClient;

    beforeAll(async () => {
        const apiClient = createTestClient();
        client = await createAccountsClient(apiClient);
    });

    test('listAccounts should return accounts with status 200', async () => {
        const accounts = await client.listAccounts();

        // Verify the response
        expect(Array.isArray(accounts)).toBe(true);

        // If there are accounts, verify their structure
        if (accounts.length > 0) {
            const account = accounts[0];
            expect(account.id).toBeDefined();
            expect(account.name).toBeDefined();
            expect(account.balance).toBeDefined();
            expect(account.currency).toBeDefined();
        }
    });

    test('getAccount should return account with status 200', async () => {
        // First get the list of accounts to find a valid ID
        const accounts = await client.listAccounts();

        // Skip the test if there are no accounts
        if (accounts.length === 0) {
            console.warn('Skipping getAccount test: No accounts available');
            return;
        }

        // Get the first account ID
        const accountId = accounts[0].id;

        // Get the account details
        const account = await client.getAccount(accountId);

        // Verify the response
        expect(account.id).toBe(accountId);
        expect(account.name).toBeDefined();
        expect(account.balance).toBeDefined();
        expect(account.currency).toBeDefined();
    });
});
