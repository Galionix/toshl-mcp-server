# Active Context

## Current Work Focus

We are currently in the initial phase of developing the Toshl MCP Server. The focus is on setting up the project structure and implementing the core components that will allow AI agents to access financial data from Toshl Finance.

## Recent Changes

As this is the beginning of the project, we have:

1. Created the project documentation in the memory bank
2. Defined the system architecture and design patterns
3. Outlined the technical requirements and constraints

## Next Steps

The immediate next steps in the development process are:

1. **Project Setup**

   - Initialize the Node.js project with TypeScript
   - Install required dependencies
   - Configure TypeScript and linting

2. **Core Implementation**

   - Implement the MCP server base
   - Create the authentication module
   - Develop the base API client for Toshl

3. **Resource Implementation**

   - Implement account resources
   - Implement category resources
   - Implement tag resources
   - Implement budget resources
   - Implement user resources

4. **Tool Implementation**

   - Implement data retrieval tools
   - Implement financial analysis tools

5. **Testing and Documentation**
   - Write unit tests
   - Create usage documentation
   - Provide examples

## Active Decisions and Considerations

### Authentication Approach

We need to decide on the best approach for authentication:

1. **Basic Authentication**: Simpler to implement but requires storing credentials
2. **OAuth**: More secure but requires a more complex implementation

Current decision: Start with Basic Authentication for simplicity, but design the system to support OAuth in the future.

### Caching Strategy

We need to determine the optimal caching strategy:

1. **In-memory Caching**: Faster but limited by available memory
2. **File-based Caching**: More persistent but slower
3. **Hybrid Approach**: Combine both methods

Current decision: Implement in-memory caching with configurable TTL (Time To Live) based on Toshl's recommendations.

### Error Handling

We need to establish a consistent error handling approach:

1. **Error Mapping**: Map Toshl API errors to MCP errors
2. **Retry Logic**: Implement retry logic for transient errors
3. **Logging**: Log errors for debugging and monitoring

Current decision: Implement comprehensive error mapping with optional retry logic for specific error types.

### Resource vs. Tool Balance

We need to determine the right balance between resources and tools:

1. **Resource-heavy**: Focus on exposing data as resources
2. **Tool-heavy**: Focus on providing tools for specific operations
3. **Balanced Approach**: Provide both resources and tools

Current decision: Implement a balanced approach, with resources for data access and tools for analysis.

## Implementation Priorities

1. **Core Functionality**: Ensure basic data access works reliably
2. **User Experience**: Focus on making the server easy to use for AI agents
3. **Performance**: Optimize for response time and resource usage
4. **Extensibility**: Design for future enhancements

## Open Questions

1. How should we handle rate limiting to prevent exceeding Toshl API limits?
2. What is the best approach for error recovery in case of API failures?
3. How can we optimize the data format for AI analysis?
4. What financial metrics should we prioritize for the analysis tools?
