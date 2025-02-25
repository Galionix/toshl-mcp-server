# Technical Context

## Technologies Used

### Core Technologies

1. **Node.js**: Runtime environment for executing JavaScript code server-side.
2. **TypeScript**: Superset of JavaScript that adds static typing, enhancing code quality and developer experience.
3. **MCP SDK**: Model Context Protocol SDK for building MCP servers that can communicate with AI agents.

### Libraries and Dependencies

1. **Axios**: Promise-based HTTP client for making requests to the Toshl API.
2. **Node-Cache**: In-memory caching system for optimizing API requests.
3. **Winston**: Logging library for tracking server operations and debugging.
4. **Dotenv**: Environment variable management for secure configuration.
5. **Jest**: Testing framework for unit and integration tests.

## Development Setup

### Prerequisites

1. **Node.js**: Version 18.x or higher
2. **npm**: Version 8.x or higher
3. **TypeScript**: Version 5.x or higher

### Project Structure

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
├── tests/                       # Test files
├── dist/                        # Compiled JavaScript files
├── .env                         # Environment variables
├── .env.example                 # Example environment variables
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

### Environment Variables

```
# Toshl API Configuration
TOSHL_API_TOKEN=your_api_token
TOSHL_API_BASE_URL=https://api.toshl.com

# MCP Server Configuration
MCP_SERVER_NAME=toshl-mcp-server
MCP_SERVER_VERSION=0.1.0

# Caching Configuration
CACHE_TTL=3600  # Time to live in seconds
CACHE_ENABLED=true

# Logging Configuration
LOG_LEVEL=info
```

## Technical Constraints

### Toshl API Constraints

1. **Rate Limiting**: The Toshl API has rate limits that must be respected.
2. **Authentication**: Requires API token for authentication.
3. **Response Format**: All responses are in JSON format.
4. **Pagination**: Some endpoints use pagination for large result sets.

### MCP Protocol Constraints

1. **Communication Format**: Communication must follow the MCP protocol specification.
2. **Resource URIs**: Resources must be identified by unique URIs.
3. **Tool Schemas**: Tools must have well-defined input and output schemas.

### Performance Constraints

1. **Response Time**: Aim for sub-second response times for most operations.
2. **Memory Usage**: Keep memory usage reasonable for a Node.js application.
3. **Concurrency**: Handle multiple concurrent requests efficiently.

## Dependencies

### External Dependencies

1. **Toshl API**: The server depends on the Toshl API being available and responsive.
2. **MCP Client**: The server is designed to work with MCP-compatible clients.

### Internal Dependencies

1. **Authentication Module**: All API requests depend on the authentication module.
2. **Caching System**: Performance depends on effective caching.
3. **Error Handling**: Robust error handling is essential for reliability.

## Deployment Considerations

### Hosting Options

1. **Local Deployment**: Run as a local service on the user's machine.
2. **Cloud Deployment**: Deploy to a cloud service for remote access.
3. **Containerization**: Package as a Docker container for easy deployment.

### Security Considerations

1. **API Token Storage**: Securely store the Toshl API token.
2. **Data Transmission**: Use HTTPS for all API communication.
3. **Access Control**: Implement appropriate access controls for the MCP server.

### Monitoring and Maintenance

1. **Logging**: Implement comprehensive logging for debugging and monitoring.
2. **Health Checks**: Include health check endpoints for monitoring server status.
3. **Version Management**: Plan for versioning and updates.
