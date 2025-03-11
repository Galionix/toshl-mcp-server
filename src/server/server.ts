import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ErrorCode,
    ListResourcesRequestSchema,
    ListResourceTemplatesRequestSchema,
    ListToolsRequestSchema,
    McpError,
    ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import logger from '../utils/logger.js';
import { setupAccountResources } from '../resources/account-resources.js';
import { setupCategoryResources } from '../resources/category-resources.js';
import { setupTagResources } from '../resources/tag-resources.js';
import { setupBudgetResources } from '../resources/budget-resources.js';
import { setupUserResources } from '../resources/user-resources.js';
import { setupEntryResources } from '../resources/entry-resources.js';
import { setupAccountTools } from '../tools/account-tools.js';
import { setupCategoryTools } from '../tools/category-tools.js';
import { setupTagTools } from '../tools/tag-tools.js';
import { setupBudgetTools } from '../tools/budget-tools.js';
import { setupUserTools } from '../tools/user-tools.js';
import { setupAnalysisTools } from '../tools/analysis-tools.js';
import { setupEntryTools } from '../tools/entry-tools.js';

/**
 * Main MCP server for Toshl Finance API
 */
export class ToshlMcpServer {
    private server: Server;
    private transport: StdioServerTransport | null = null;

    /**
     * Creates a new Toshl MCP server
     */
    constructor() {
        const name = process.env.MCP_SERVER_NAME || 'toshl-mcp-server';
        const version = process.env.MCP_SERVER_VERSION || '0.1.0';

        this.server = new Server(
            {
                name,
                version,
            },
            {
                capabilities: {
                    resources: {},
                    tools: {},
                },
            }
        );

        // Set up error handling
        this.server.onerror = (error) => {
            logger.error('MCP server error', { error });
        };

        // Set up request handlers
        this.setupRequestHandlers();

        logger.info('Toshl MCP server created', { name, version });
    }

    /**
     * Sets up the request handlers for the MCP server
     */
    private setupRequestHandlers() {
        // Set up resource handlers
        this.setupResourceHandlers();

        // Set up tool handlers
        this.setupToolHandlers();
    }

    /**
     * Sets up the resource handlers for the MCP server
     */
    private setupResourceHandlers() {
        // Set up resource listing
        this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
            logger.debug('Handling ListResources request');
            return {
                resources: [
                    // Account resources
                    {
                        uri: 'toshl://accounts/list',
                        name: 'List of Toshl accounts',
                        mimeType: 'application/json',
                        description: 'List of all accounts in Toshl Finance',
                    },
                    // Category resources
                    {
                        uri: 'toshl://categories/list',
                        name: 'List of Toshl categories',
                        mimeType: 'application/json',
                        description: 'List of all categories in Toshl Finance',
                    },
                    // Tag resources
                    {
                        uri: 'toshl://tags/list',
                        name: 'List of Toshl tags',
                        mimeType: 'application/json',
                        description: 'List of all tags in Toshl Finance',
                    },
                    // Budget resources
                    {
                        uri: 'toshl://budgets/list',
                        name: 'List of Toshl budgets',
                        mimeType: 'application/json',
                        description: 'List of all budgets in Toshl Finance',
                    },
                    // User resources
                    {
                        uri: 'toshl://me',
                        name: 'Toshl user profile',
                        mimeType: 'application/json',
                        description: 'User profile information from Toshl Finance',
                    },
                    {
                        uri: 'toshl://me/summary',
                        name: 'Toshl account summary',
                        mimeType: 'application/json',
                        description: 'Summary of Toshl Finance accounts',
                    },
                    // Entry resources
                    {
                        uri: 'toshl://entries/list',
                        name: 'List of Toshl entries',
                        mimeType: 'application/json',
                        description: 'List of entries in Toshl Finance',
                    },
                    {
                        uri: 'toshl://entries/sums',
                        name: 'Daily sums of Toshl entries',
                        mimeType: 'application/json',
                        description: 'Daily sums of entries in Toshl Finance',
                    },
                    {
                        uri: 'toshl://entries/timeline',
                        name: 'Timeline of Toshl entries',
                        mimeType: 'application/json',
                        description: 'Timeline of entries in Toshl Finance',
                    },
                ],
            };
        });

        // Set up resource templates
        this.server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => {
            logger.debug('Handling ListResourceTemplates request');
            return {
                resourceTemplates: [
                    // Account resource templates
                    {
                        uriTemplate: 'toshl://accounts/{id}',
                        name: 'Toshl account details',
                        mimeType: 'application/json',
                        description: 'Details of a specific account in Toshl Finance',
                    },
                    // Category resource templates
                    {
                        uriTemplate: 'toshl://categories/{id}',
                        name: 'Toshl category details',
                        mimeType: 'application/json',
                        description: 'Details of a specific category in Toshl Finance',
                    },
                    // Tag resource templates
                    {
                        uriTemplate: 'toshl://tags/{id}',
                        name: 'Toshl tag details',
                        mimeType: 'application/json',
                        description: 'Details of a specific tag in Toshl Finance',
                    },
                    // Budget resource templates
                    {
                        uriTemplate: 'toshl://budgets/{id}',
                        name: 'Toshl budget details',
                        mimeType: 'application/json',
                        description: 'Details of a specific budget in Toshl Finance',
                    },
                    {
                        uriTemplate: 'toshl://budgets/{id}/history',
                        name: 'Toshl budget history',
                        mimeType: 'application/json',
                        description: 'History of a specific budget in Toshl Finance',
                    },
                    // Entry resource templates
                    {
                        uriTemplate: 'toshl://entries/{id}',
                        name: 'Toshl entry details',
                        mimeType: 'application/json',
                        description: 'Details of a specific entry in Toshl Finance',
                    },
                ],
            };
        });

        // Set up resource reading
        this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
            const uri = request.params.uri;
            logger.debug('Handling ReadResource request', { uri });

            // Account resources
            if (uri.startsWith('toshl://accounts')) {
                return setupAccountResources(this.server, uri);
            }

            // Category resources
            if (uri.startsWith('toshl://categories')) {
                return setupCategoryResources(this.server, uri);
            }

            // Tag resources
            if (uri.startsWith('toshl://tags')) {
                return setupTagResources(this.server, uri);
            }

            // Budget resources
            if (uri.startsWith('toshl://budgets')) {
                return setupBudgetResources(this.server, uri);
            }

            // User resources
            if (uri.startsWith('toshl://me')) {
                return setupUserResources(this.server, uri);
            }

            // Entry resources
            if (uri.startsWith('toshl://entries')) {
                return setupEntryResources(this.server, uri);
            }

            throw new McpError(
                ErrorCode.MethodNotFound,
                `Resource not found: ${uri}`
            );
        });
    }

    /**
     * Sets up the tool handlers for the MCP server
     */
    private setupToolHandlers() {
        // Set up tool listing
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            logger.debug('Handling ListTools request');

            const accountTools = setupAccountTools();
            const categoryTools = setupCategoryTools();
            const tagTools = setupTagTools();
            const budgetTools = setupBudgetTools();
            const userTools = setupUserTools();
            const entryTools = setupEntryTools();

            return {
                tools: [
                    ...accountTools,
                    ...categoryTools,
                    ...tagTools,
                    ...budgetTools,
                    ...userTools,
                    ...entryTools,
                ],
            };
        });

        // Set up tool calling
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const toolName = request.params.name;
            const args = request.params.arguments;

            logger.debug('Handling CallTool request', { toolName, args });

            // Account tools
            if (toolName.startsWith('account_')) {
                return this.handleAccountTool(toolName, args);
            }

            // Category tools
            if (toolName.startsWith('category_')) {
                return this.handleCategoryTool(toolName, args);
            }

            // Tag tools
            if (toolName.startsWith('tag_')) {
                return this.handleTagTool(toolName, args);
            }

            // Budget tools
            if (toolName.startsWith('budget_')) {
                return this.handleBudgetTool(toolName, args);
            }

            // User tools
            if (toolName.startsWith('user_')) {
                return this.handleUserTool(toolName, args);
            }

            // Analysis tools
            if (toolName.startsWith('analyze_')) {
                return this.handleAnalysisTool(toolName, args);
            }

            // Entry tools
            if (toolName.startsWith('entry_')) {
                return this.handleEntryTool(toolName, args);
            }

            throw new McpError(
                ErrorCode.MethodNotFound,
                `Tool not found: ${toolName}`
            );
        });
    }

    /**
     * Handles account tools
     * @param toolName Tool name
     * @param args Tool arguments
     * @returns Tool response
     */
    private async handleAccountTool(toolName: string, args: any) {
        // Import dynamically to avoid circular dependencies
        const { handleAccountTool } = await import('../tools/account-tools.js');
        return handleAccountTool(toolName, args);
    }

    /**
     * Handles category tools
     * @param toolName Tool name
     * @param args Tool arguments
     * @returns Tool response
     */
    private async handleCategoryTool(toolName: string, args: any) {
        // Import dynamically to avoid circular dependencies
        const { handleCategoryTool } = await import('../tools/category-tools.js');
        return handleCategoryTool(toolName, args);
    }

    /**
     * Handles tag tools
     * @param toolName Tool name
     * @param args Tool arguments
     * @returns Tool response
     */
    private async handleTagTool(toolName: string, args: any) {
        // Import dynamically to avoid circular dependencies
        const { handleTagTool } = await import('../tools/tag-tools.js');
        return handleTagTool(toolName, args);
    }

    /**
     * Handles budget tools
     * @param toolName Tool name
     * @param args Tool arguments
     * @returns Tool response
     */
    private async handleBudgetTool(toolName: string, args: any) {
        // Import dynamically to avoid circular dependencies
        const { handleBudgetTool } = await import('../tools/budget-tools.js');
        return handleBudgetTool(toolName, args);
    }

    /**
     * Handles user tools
     * @param toolName Tool name
     * @param args Tool arguments
     * @returns Tool response
     */
    private async handleUserTool(toolName: string, args: any) {
        // Import dynamically to avoid circular dependencies
        const { handleUserTool } = await import('../tools/user-tools.js');
        return handleUserTool(toolName, args);
    }

    /**
     * Handles analysis tools
     * @param toolName Tool name
     * @param args Tool arguments
     * @returns Tool response
     */
    private async handleAnalysisTool(toolName: string, args: any) {
        // Import dynamically to avoid circular dependencies
        const { handleAnalysisTool } = await import('../tools/analysis-tools.js');
        return handleAnalysisTool(toolName, args);
    }

    /**
     * Handles entry tools
     * @param toolName Tool name
     * @param args Tool arguments
     * @returns Tool response
     */
    private async handleEntryTool(toolName: string, args: any) {
        // Import dynamically to avoid circular dependencies
        const { handleEntryTool } = await import('../tools/entry-tools.js');
        return handleEntryTool(toolName, args);
    }

    /**
     * Starts the MCP server
     */
    async start() {
        logger.info('Starting Toshl MCP server');

        this.transport = new StdioServerTransport();
        await this.server.connect(this.transport);

        logger.info('Toshl MCP server started');
    }

    /**
     * Stops the MCP server
     */
    async stop() {
        logger.info('Stopping Toshl MCP server');

        if (this.transport) {
            await this.server.close();
            this.transport = null;
        }

        logger.info('Toshl MCP server stopped');
    }
}
