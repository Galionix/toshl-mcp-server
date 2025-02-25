import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { ApiError } from './types.js';
import logger from './logger.js';

/**
 * Maps Toshl API errors to MCP errors
 * @param error The error from the Toshl API
 * @returns An MCP error
 */
export function mapApiErrorToMcpError(error: ApiError): McpError {
    logger.debug('Mapping API error to MCP error', { error });

    // Map HTTP status codes to MCP error codes
    switch (error.status) {
        case 400:
            return new McpError(
                ErrorCode.InvalidParams,
                `Invalid request: ${error.message}`
            );
        case 401:
            return new McpError(
                ErrorCode.Unauthorized,
                'Authentication failed. Please check your API token.'
            );
        case 403:
            return new McpError(
                ErrorCode.Forbidden,
                `Access denied: ${error.message}`
            );
        case 404:
            return new McpError(
                ErrorCode.NotFound,
                `Resource not found: ${error.message}`
            );
        case 429:
            return new McpError(
                ErrorCode.RateLimited,
                'Rate limit exceeded. Please try again later.'
            );
        case 500:
        case 502:
        case 503:
        case 504:
            return new McpError(
                ErrorCode.InternalError,
                `Toshl API server error: ${error.message}`
            );
        default:
            return new McpError(
                ErrorCode.InternalError,
                `Unexpected error: ${error.message}`
            );
    }
}

/**
 * Handles errors from the Toshl API
 * @param error The error to handle
 * @throws McpError
 */
export function handleApiError(error: any): never {
    logger.error('API error occurred', { error });

    // If it's an axios error with a response
    if (error.response) {
        const apiError: ApiError = {
            status: error.response.status,
            message: error.response.data?.message || error.message,
            code: error.response.data?.code,
            details: error.response.data
        };

        throw mapApiErrorToMcpError(apiError);
    }

    // If it's a network error
    if (error.request) {
        throw new McpError(
            ErrorCode.NetworkError,
            `Network error: ${error.message}`
        );
    }

    // For any other type of error
    throw new McpError(
        ErrorCode.InternalError,
        `Unexpected error: ${error.message}`
    );
}
