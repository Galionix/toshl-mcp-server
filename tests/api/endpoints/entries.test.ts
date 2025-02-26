import { EntriesClient, createEntriesClient } from '../../../src/api/endpoints/entries.js';
import { createTestClient } from '../../utils/test-helpers.js';

describe('EntriesClient', () => {
    let client: EntriesClient;

    beforeAll(async () => {
        const apiClient = createTestClient();
        client = await createEntriesClient(apiClient);
    });

    test('listEntries should return entries with status 200', async () => {
        // Get entries from the last 30 days
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const todayStr = today.toISOString().split('T')[0];
        const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

        const entries = await client.listEntries({
            from: thirtyDaysAgoStr,
            to: todayStr
        });

        // Verify the response
        expect(Array.isArray(entries)).toBe(true);

        // If there are entries, verify their structure
        if (entries.length > 0) {
            const entry = entries[0];
            expect(entry.id).toBeDefined();
            expect(entry.amount).toBeDefined();
            expect(entry.currency).toBeDefined();
            expect(entry.date).toBeDefined();
            expect(entry.desc).toBeDefined();
            expect(entry.account).toBeDefined();
            expect(entry.category).toBeDefined();
            expect(entry.modified).toBeDefined();
        }
    });

    test('listEntries should accept filter parameters', async () => {
        // Get entries from the last 30 days
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const todayStr = today.toISOString().split('T')[0];
        const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

        const entries = await client.listEntries({
            from: thirtyDaysAgoStr,
            to: todayStr
        });

        // Verify the response
        expect(Array.isArray(entries)).toBe(true);

        // If there are entries, verify they are within the date range
        if (entries.length > 0) {
            for (const entry of entries) {
                expect(new Date(entry.date).getTime()).toBeGreaterThanOrEqual(new Date(thirtyDaysAgoStr).getTime());
                expect(new Date(entry.date).getTime()).toBeLessThanOrEqual(new Date(todayStr).getTime() + 86400000); // Add one day in milliseconds
            }
        }
    });

    test('getEntry should return entry with status 200', async () => {
        // First get the list of entries to find a valid ID
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const todayStr = today.toISOString().split('T')[0];
        const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

        const entries = await client.listEntries({
            from: thirtyDaysAgoStr,
            to: todayStr
        });

        // Skip the test if there are no entries
        if (entries.length === 0) {
            console.warn('Skipping getEntry test: No entries available');
            return;
        }

        // Get the first entry ID
        const entryId = entries[0].id;

        // Get the entry details
        const entry = await client.getEntry(entryId);

        // Verify the response
        expect(entry.id).toBe(entryId);
        expect(entry.amount).toBeDefined();
        expect(entry.currency).toBeDefined();
        expect(entry.date).toBeDefined();
        expect(entry.desc).toBeDefined();
        expect(entry.account).toBeDefined();
        expect(entry.category).toBeDefined();
        expect(entry.modified).toBeDefined();
    });

    test('getEntrySums should return entry sums with status 200', async () => {
        // Get entry sums for the last 30 days
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const todayStr = today.toISOString().split('T')[0];
        const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

        const entrySums = await client.getEntrySums({
            from: thirtyDaysAgoStr,
            to: todayStr,
            currency: 'USD' // Required parameter for entry sums
        });

        // Verify the response
        expect(Array.isArray(entrySums)).toBe(true);

        // If there are entry sums, verify their structure
        if (entrySums.length > 0) {
            const entrySum = entrySums[0];
            expect(entrySum.day).toBeDefined();
            expect(entrySum.modified).toBeDefined();

            // Either expenses or incomes should be defined
            expect(entrySum.expenses || entrySum.incomes).toBeDefined();

            if (entrySum.expenses) {
                expect(entrySum.expenses.sum).toBeDefined();
                expect(entrySum.expenses.count).toBeDefined();
            }

            if (entrySum.incomes) {
                expect(entrySum.incomes.sum).toBeDefined();
                expect(entrySum.incomes.count).toBeDefined();
            }
        }
    });

    test('getEntryTimeline should return entry timeline with status 200', async () => {
        // Get entry timeline for the last 30 days
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const todayStr = today.toISOString().split('T')[0];
        const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

        const timeline = await client.getEntryTimeline({
            from: thirtyDaysAgoStr,
            to: todayStr
        });

        // Verify the response
        expect(Array.isArray(timeline)).toBe(true);

        // If there are timeline items, verify their structure
        if (timeline.length > 0) {
            const timelineItem = timeline[0];
            expect(timelineItem.day).toBeDefined();
            expect(timelineItem.sum).toBeDefined();
            expect(timelineItem.count).toBeDefined();
            expect(timelineItem.currency).toBeDefined();
            expect(Array.isArray(timelineItem.entries)).toBe(true);

            // If there are entries in the timeline item, verify their structure
            if (timelineItem.entries.length > 0) {
                const entry = timelineItem.entries[0];
                expect(entry.id).toBeDefined();
                expect(entry.amount).toBeDefined();
                expect(entry.currency).toBeDefined();
                expect(entry.date).toBeDefined();
                expect(entry.desc).toBeDefined();
                expect(entry.account).toBeDefined();
                expect(entry.category).toBeDefined();
                expect(entry.modified).toBeDefined();
            }
        }
    });
});
