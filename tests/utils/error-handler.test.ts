import { mapApiErrorToMcpError } from '../../src/utils/error-handler.js';
import { ApiError } from '../../src/utils/types.js';
import { ErrorCode } from '@modelcontextprotocol/sdk/types.js';

describe('Error Handler', () => {
    test('mapApiErrorToMcpError should map 401 to InvalidRequest', () => {
        // Create API error
        const apiError: ApiError = {
            status: 401,
            message: 'Unauthorized',
            code: 'unauthorized'
        };

        // Map error
        const mcpError = mapApiErrorToMcpError(apiError);

        // Verify error
        expect(mcpError.code).toBe(ErrorCode.InvalidRequest);
        expect(mcpError.message).toContain('Authentication failed');
    });

    test('mapApiErrorToMcpError should map 404 to MethodNotFound', () => {
        // Create API error
        const apiError: ApiError = {
            status: 404,
            message: 'Not Found',
            code: 'not_found'
        };

        // Map error
        const mcpError = mapApiErrorToMcpError(apiError);

        // Verify error
        expect(mcpError.code).toBe(ErrorCode.MethodNotFound);
        expect(mcpError.message).toContain('Resource not found');
    });

    test('mapApiErrorToMcpError should map 400 to InvalidParams', () => {
        // Create API error
        const apiError: ApiError = {
            status: 400,
            message: 'Bad Request',
            code: 'bad_request'
        };

        // Map error
        const mcpError = mapApiErrorToMcpError(apiError);

        // Verify error
        expect(mcpError.code).toBe(ErrorCode.InvalidParams);
        expect(mcpError.message).toContain('Invalid request');
    });

    test('mapApiErrorToMcpError should map 429 to InvalidRequest', () => {
        // Create API error
        const apiError: ApiError = {
            status: 429,
            message: 'Too Many Requests',
            code: 'rate_limit_exceeded'
        };

        // Map error
        const mcpError = mapApiErrorToMcpError(apiError);

        // Verify error
        expect(mcpError.code).toBe(ErrorCode.InvalidRequest);
        expect(mcpError.message).toContain('Rate limit exceeded');
    });

    test('mapApiErrorToMcpError should map 500 to InternalError', () => {
        // Create API error
        const apiError: ApiError = {
            status: 500,
            message: 'Internal Server Error',
            code: 'server_error'
        };

        // Map error
        const mcpError = mapApiErrorToMcpError(apiError);

        // Verify error
        expect(mcpError.code).toBe(ErrorCode.InternalError);
        expect(mcpError.message).toContain('Toshl API server error');
    });

    test('mapApiErrorToMcpError should map unknown status to InternalError', () => {
        // Create API error
        const apiError: ApiError = {
            status: 418, // I'm a teapot
            message: 'I\'m a teapot',
            code: 'teapot'
        };

        // Map error
        const mcpError = mapApiErrorToMcpError(apiError);

        // Verify error
        expect(mcpError.code).toBe(ErrorCode.InternalError);
        expect(mcpError.message).toContain('Unexpected error');
    });
});
