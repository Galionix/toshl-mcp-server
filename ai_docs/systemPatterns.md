# System Patterns

## System Architecture

The Toshl MCP Server follows a layered architecture pattern to separate concerns and maintain modularity:

```mermaid
graph TD
    A[MCP Protocol Layer] --> B[Server Core]
    B --> C[API Client Layer]
    C --> D[Toshl API]

    B --> E[Resource Handlers]
    B --> F[Tool Handlers]

    G[Authentication Module] --> B
    H[Caching Module] --> C
    I[Error Handling Module] --> B
```

### Layers

1. **MCP Protocol Layer**: Handles communication with AI agents using the Model Context Protocol.
2. **Server Core**: Manages the core server functionality, routing, and request handling.
3. **API Client Layer**: Communicates with the Toshl API, handling authentication, requests, and responses.
4. **Resource Handlers**: Exposes Toshl data as MCP resources.
5. **Tool Handlers**: Implements MCP tools for data retrieval and analysis.
6. **Support Modules**: Authentication, caching, and error handling modules that support the main layers.

## Design Patterns

### 1. Adapter Pattern

Used to adapt the Toshl API responses to the MCP resource and tool formats. This pattern helps in translating between different interfaces.

```mermaid
graph LR
    A[MCP Client] --> B[MCP Server]
    B --> C[Adapter]
    C --> D[Toshl API]
```

### 2. Repository Pattern

Used for data access abstraction. Each Toshl API endpoint has a corresponding repository that handles data retrieval and caching.

```mermaid
graph TD
    A[Tool/Resource Handler] --> B[Repository]
    B --> C[API Client]
    B --> D[Cache]
```

### 3. Factory Pattern

Used to create API clients and handlers based on configuration.

```mermaid
graph TD
    A[Server] --> B[Factory]
    B --> C[Account Client]
    B --> D[Category Client]
    B --> E[Tag Client]
    B --> F[Budget Client]
```

### 4. Strategy Pattern

Used for authentication to support different authentication methods (Basic Auth, OAuth).

```mermaid
graph TD
    A[API Client] --> B[Auth Strategy]
    B --> C[Basic Auth]
    B --> D[OAuth]
```

### 5. Decorator Pattern

Used for adding caching and logging capabilities to API clients.

```mermaid
graph TD
    A[Base Client] --> B[Caching Decorator]
    B --> C[Logging Decorator]
    C --> D[Final Client]
```

## Component Relationships

### MCP Server and Handlers

The MCP Server is the central component that initializes and coordinates all other components. It registers resource and tool handlers and manages the lifecycle of the server.

```mermaid
graph TD
    A[MCP Server] --> B[Resource Handlers]
    A --> C[Tool Handlers]
    B --> D[API Clients]
    C --> D
```

### API Clients and Repositories

API Clients communicate with the Toshl API, while Repositories provide a higher-level abstraction for data access.

```mermaid
graph TD
    A[Repository] --> B[API Client]
    B --> C[HTTP Client]
    B --> D[Auth Module]
    B --> E[Error Handler]
```

### Caching Strategy

The caching system uses ETags and time-based expiration to optimize API usage.

```mermaid
graph TD
    A[API Request] --> B{Cache Valid?}
    B -->|Yes| C[Return Cached Response]
    B -->|No| D[Make API Call]
    D --> E[Update Cache]
    E --> F[Return Response]
```

## Error Handling

The error handling system maps Toshl API errors to appropriate MCP errors and provides meaningful error messages.

```mermaid
graph TD
    A[API Call] --> B{Error?}
    B -->|No| C[Process Response]
    B -->|Yes| D[Error Handler]
    D --> E[Map to MCP Error]
    E --> F[Return Error Response]
```

## Data Flow

The typical data flow for a request:

```mermaid
sequenceDiagram
    participant AI as AI Agent
    participant MCP as MCP Server
    participant Handler as Handler
    participant Repo as Repository
    participant Cache as Cache
    participant API as Toshl API

    AI->>MCP: Request Resource/Tool
    MCP->>Handler: Route Request
    Handler->>Repo: Get Data
    Repo->>Cache: Check Cache

    alt Cache Hit
        Cache-->>Repo: Return Cached Data
    else Cache Miss
        Repo->>API: Make API Request
        API-->>Repo: Return Response
        Repo->>Cache: Update Cache
    end

    Repo-->>Handler: Return Data
    Handler-->>MCP: Format Response
    MCP-->>AI: Return Response
```

## Technical Decisions

1. **TypeScript**: Used for type safety and better developer experience.
2. **MCP SDK**: Used for implementing the MCP server.
3. **Axios**: Used for HTTP requests to the Toshl API.
4. **Node-Cache**: Used for in-memory caching.
5. **Winston**: Used for logging.
