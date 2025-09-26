# MCP Servers

This Nx project contains MCP (Model Context Protocol) servers integrated with the TaskQueue system.

## Overview

MCP servers provide bridges between the TaskQueue system and external APIs. They allow the TaskQueue to access external data sources, analyze information, and provide insights through the task processing pipeline.

## Included Servers

### Toshl MCP Server

An MCP server for integrating [Toshl Finance](https://toshl.com/) with the TaskQueue system.

The Toshl MCP Server provides access to financial data from Toshl Finance API, enabling automated financial analysis and reporting through scheduled tasks.

## Features

- READ access to Toshl Finance API endpoints:

  - Accounts
  - Categories
  - Tags
  - Budgets
  - User information
  - Planning

- MCP Resources:

  - List accounts
  - Get account details
  - List categories
  - Get category details
  - List tags
  - Get tag details
  - List budgets
  - Get budget details
  - Get budget history
  - Get user profile
  - Get account summary
  - List entries

- MCP Tools:
  - Account tools (list accounts, get account details)
  - Category tools (list categories, get category details)
  - Tag tools (list tags, get tag details)
  - Budget tools (list budgets, get budget details, get budget history)
  - User tools (get profile, get summary, get payment types, get payments)
  - Entry tools (list entries, get entry details, get entry sums, get entry timeline, create entry, update entry, delete entry, manage entries)
  - Analysis tools (analyze spending by category, analyze budget performance, analyze account balances)

## Prerequisites

- Node.js (v18.x or higher)
- npm (v8.x or higher)
- Toshl Finance API token

## Get API Token

1. go to https://developer.toshl.com/apps/
2. create new personal token. Insert name for token under "Description" and your account password under "Password"

## Setup

### 1. Install Dependencies

From the workspace root:

```bash
npm install
```

### 2. Configure Environment

Create `.env` file in the workspace root with your Toshl API token:

```bash
TOSHL_API_TOKEN=your_personal_access_token_here
```

### 3. TaskQueue Integration

The MCP server is integrated with the TaskQueue system through the `toshl-mcp.processor.ts`. You can create tasks with the `toshl_mcp_finance` execution type to interact with Toshl Finance API.

Example task payload:
```json
{
  "operation": "expenses-summary",
  "params": {
    "from": "2024-01-01",
    "to": "2024-01-31"
  }
}
```

## Available Operations

### 1. Expenses Summary
Get summary of expenses for a date range:
```json
{
  "operation": "expenses-summary",
  "params": {
    "from": "2024-01-01",
    "to": "2024-01-31"
  }
}
```

### 2. Recent Transactions
Get recent transactions:
```json
{
  "operation": "recent-transactions",
  "params": {
    "limit": 10
  }
}
```

### 3. Budget Status
Get current budget status:
```json
{
  "operation": "budget-status",
  "params": {}
}
```

## Building and Running

### Build the MCP server:
```bash
nx build mcp-servers
```

### Run in development mode:
```bash
nx serve mcp-servers
```

### Run TaskQueue with MCP integration:
```bash
nx serve taskqueue
```

## Documentation

- [API Overview](docs/api/overview.md)
- [Authentication](docs/api/auth.md)
- [Accounts](docs/api/accounts.md)
- [Entries](docs/api/entries.md)
- [Transfers](docs/api/transfers.md)

## Project Structure

```
toshl-mcp-server/
├── src/
│   ├── index.ts                 # Entry point
│   ├── server/                  # MCP server implementation
│   │   └── server.ts            # Main server class
│   ├── api/                     # Toshl API client
│   │   ├── toshl-client.ts      # Base API client
│   │   ├── auth.ts              # Authentication module
│   │   └── endpoints/           # Endpoint-specific clients
│   │       ├── accounts.ts      # Accounts API client
│   │       ├── categories.ts    # Categories API client
│   │       ├── tags.ts          # Tags API client
│   │       ├── budgets.ts       # Budgets API client
│   │       ├── entries.ts       # Entries API client
│   │       ├── me.ts            # User API client
│   │       └── planning.ts      # Planning API client
│   ├── resources/               # MCP resource handlers
│   │   ├── account-resources.ts # Account resources
│   │   ├── category-resources.ts# Category resources
│   │   ├── tag-resources.ts     # Tag resources
│   │   ├── budget-resources.ts  # Budget resources
│   │   └── user-resources.ts    # User resources
│   ├── tools/                   # MCP tool handlers
│   │   ├── account-tools.ts     # Account tools
│   │   ├── category-tools.ts    # Category tools
│   │   ├── tag-tools.ts         # Tag tools
│   │   ├── budget-tools.ts      # Budget tools
│   │   ├── user-tools.ts        # User tools
│   │   └── analysis-tools.ts    # Financial analysis tools
│   └── utils/                   # Utility functions
│       ├── cache.ts             # Caching utilities
│       ├── error-handler.ts     # Error handling utilities
│       ├── logger.ts            # Logging utilities
│       └── types.ts             # TypeScript type definitions
├── dist/                        # Compiled JavaScript files
├── .env                         # Environment variables
├── .env.example                 # Example environment variables
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## Usage via TaskQueue UI

1. **Open TaskQueue Interface**: Navigate to http://localhost:3000
2. **Create New Task**: Click "Add Task" button
3. **Configure Task**:
   - **Execution Type**: Select `toshl_mcp_finance`
   - **Payload**: Enter JSON with operation and parameters
   - **Queue**: Choose appropriate queue
   - **Priority**: Set task priority

4. **Example Task Creation**:
   ```json
   {
     "operation": "expenses-summary",
     "params": {
       "from": "2024-01-01",
       "to": "2024-01-31"
     }
   }
   ```

5. **Monitor Results**: Check task results in the TaskQueue interface

## Integration with Other Systems

The MCP server can be integrated with:
- **Telegram Bot**: For financial notifications and reports
- **Scheduled Tasks**: For automatic weekly/daily financial summaries
- **Pushover**: For push notifications about budget alerts

## Configuration

The server can be configured using environment variables:

- `TOSHL_API_TOKEN`: Your Toshl API token
- `TOSHL_API_BASE_URL`: The base URL for the Toshl API (default: https://api.toshl.com)
- `MCP_SERVER_NAME`: The name of the MCP server (default: toshl-mcp-server)
- `MCP_SERVER_VERSION`: The version of the MCP server (default: 0.1.0)
- `CACHE_TTL`: Time to live for cached data in seconds (default: 3600)
- `CACHE_ENABLED`: Whether caching is enabled (default: true)
- `LOG_LEVEL`: Logging level (default: info)

## License

MIT
