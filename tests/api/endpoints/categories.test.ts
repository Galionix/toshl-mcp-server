import { CategoriesClient, createCategoriesClient } from '../../../src/api/endpoints/categories.js';
import { createTestClient } from '../../utils/test-helpers.js';

describe('CategoriesClient', () => {
    let client: CategoriesClient;

    beforeAll(async () => {
        const apiClient = createTestClient();
        client = await createCategoriesClient(apiClient);
    });

    test('listCategories should return categories with status 200', async () => {
        const categories = await client.listCategories();

        // Verify the response
        expect(Array.isArray(categories)).toBe(true);

        // If there are categories, verify their structure
        if (categories.length > 0) {
            const category = categories[0];
            expect(category.id).toBeDefined();
            expect(category.name).toBeDefined();
            expect(category.type).toBeDefined();
            expect(category.modified).toBeDefined();
        }
    });

    test('getCategory should return category with status 200', async () => {
        // First get the list of categories to find a valid ID
        const categories = await client.listCategories();

        // Skip the test if there are no categories
        if (categories.length === 0) {
            console.warn('Skipping getCategory test: No categories available');
            return;
        }

        // Get the first category ID
        const categoryId = categories[0].id;

        // Get the category details
        const category = await client.getCategory(categoryId);

        // Verify the response
        expect(category.id).toBe(categoryId);
        expect(category.name).toBeDefined();
        expect(category.type).toBeDefined();
        expect(category.modified).toBeDefined();
    });
});
