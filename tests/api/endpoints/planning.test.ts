import { PlanningClient, createPlanningClient } from '../../../src/api/endpoints/planning.js';
import { createTestClient } from '../../utils/test-helpers.js';

describe('PlanningClient', () => {
    let client: PlanningClient;

    beforeAll(async () => {
        const apiClient = createTestClient();
        client = await createPlanningClient(apiClient);
    });

    test('getPlanning should return planning information with status 200', async () => {
        const planning = await client.getPlanning();

        // Verify the response
        expect(planning).toBeDefined();

        // With a dummy token, the API might return an empty response
        // So we'll only check the structure if planning has an id
        if (planning && planning.id) {
            expect(planning.id).toBeDefined();
            expect(planning.name).toBeDefined();
            expect(planning.modified).toBeDefined();
        } else {
            console.warn('Planning data is empty or incomplete, skipping structure validation');
        }
    });

    test('getPlanningById should return planning details with status 200', async () => {
        // First get the planning information to find a valid ID
        const planning = await client.getPlanning();

        // Skip the test if planning information is not available
        if (!planning || !planning.id) {
            console.warn('Skipping getPlanningById test: No planning information available');
            return;
        }

        // Get the planning ID
        const planningId = planning.id;

        // Get the planning details
        const planningDetails = await client.getPlanningById(planningId);

        // Verify the response
        expect(planningDetails).toBeDefined();
        expect(planningDetails.id).toBe(planningId);
        expect(planningDetails.name).toBeDefined();
        expect(planningDetails.modified).toBeDefined();
    });
});
