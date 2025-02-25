import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { createMeClient } from '../api/endpoints/me.js';
import logger from '../utils/logger.js';

/**
 * Sets up user tools
 * @returns List of user tools
 */
export function setupUserTools() {
    return [
        {
            name: 'user_profile',
            description: 'Get user profile information from Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {},
                required: [],
            },
        },
        {
            name: 'user_summary',
            description: 'Get account summary from Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {},
                required: [],
            },
        },
        {
            name: 'user_payment_types',
            description: 'Get payment types from Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {},
                required: [],
            },
        },
        {
            name: 'user_payments',
            description: 'Get payments from Toshl Finance',
            inputSchema: {
                type: 'object',
                properties: {},
                required: [],
            },
        },
    ];
}

/**
 * Handles the user_profile tool
 * @returns Tool response
 */
export async function handleUserProfileTool() {
    logger.debug('Handling user_profile tool');

    try {
        const meClient = await createMeClient();
        const profile = await meClient.getProfile();

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(profile, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling user_profile tool', { error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error getting user profile: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles the user_summary tool
 * @returns Tool response
 */
export async function handleUserSummaryTool() {
    logger.debug('Handling user_summary tool');

    try {
        const meClient = await createMeClient();
        const summary = await meClient.getSummary();

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(summary, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling user_summary tool', { error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error getting account summary: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles the user_payment_types tool
 * @returns Tool response
 */
export async function handleUserPaymentTypesTool() {
    logger.debug('Handling user_payment_types tool');

    try {
        const meClient = await createMeClient();
        const paymentTypes = await meClient.getPaymentTypes();

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(paymentTypes, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling user_payment_types tool', { error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error getting payment types: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles the user_payments tool
 * @returns Tool response
 */
export async function handleUserPaymentsTool() {
    logger.debug('Handling user_payments tool');

    try {
        const meClient = await createMeClient();
        const payments = await meClient.getPayments();

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(payments, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error('Error handling user_payments tool', { error });

        return {
            content: [
                {
                    type: 'text',
                    text: `Error getting payments: ${(error as Error).message}`,
                },
            ],
            isError: true,
        };
    }
}

/**
 * Handles user tools
 * @param toolName Tool name
 * @param args Tool arguments
 * @returns Tool response
 */
export async function handleUserTool(toolName: string, args: any) {
    switch (toolName) {
        case 'user_profile':
            return handleUserProfileTool();
        case 'user_summary':
            return handleUserSummaryTool();
        case 'user_payment_types':
            return handleUserPaymentTypesTool();
        case 'user_payments':
            return handleUserPaymentsTool();
        default:
            throw new McpError(
                ErrorCode.MethodNotFound,
                `Tool not found: ${toolName}`
            );
    }
}
