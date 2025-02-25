/**
 * Types for Toshl API responses and MCP server
 */

// Toshl API Types

export interface ToshlAccount {
    id: string;
    name: string;
    balance: number;
    initial_balance: number;
    currency: ToshlCurrency;
    median?: {
        expenses: number;
        incomes: number;
    };
    status: 'active' | 'inactive' | 'archived';
    order: number;
    modified: string;
    goal?: {
        amount: number;
        start: string;
        end: string;
    };
    [key: string]: any; // For additional properties
}

export interface ToshlCategory {
    id: string;
    name: string;
    modified: string;
    type: 'expense' | 'income';
    [key: string]: any; // For additional properties
}

export interface ToshlTag {
    id: string;
    name: string;
    modified: string;
    [key: string]: any; // For additional properties
}

export interface ToshlBudget {
    id: string;
    name: string;
    amount: number;
    currency: ToshlCurrency;
    from: string;
    to: string;
    modified: string;
    [key: string]: any; // For additional properties
}

export interface ToshlCurrency {
    code: string;
    rate: number;
    fixed: boolean;
    [key: string]: any; // For additional properties
}

export interface ToshlUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    joined: string;
    modified: string;
    pro?: any;
    currency?: ToshlCurrency;
    [key: string]: any; // For additional properties
}

export interface ToshlPlanning {
    id: string;
    name: string;
    modified: string;
    [key: string]: any; // For additional properties
}

// API Client Types

export interface ApiClientConfig {
    baseUrl: string;
    token: string;
    timeout?: number;
}

export interface ApiResponse<T> {
    data: T;
    status: number;
    headers: Record<string, string>;
}

export interface ApiError {
    status: number;
    message: string;
    code?: string;
    details?: any;
}

// Cache Types

export interface CacheConfig {
    enabled: boolean;
    ttl: number; // Time to live in seconds
}

// MCP Server Types

export interface ServerConfig {
    name: string;
    version: string;
}

// Tool Types

export interface ToolInput {
    [key: string]: any;
}

export interface ToolOutput {
    [key: string]: any;
}

// Resource Types

export interface ResourceParams {
    [key: string]: string;
}
