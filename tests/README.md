# Toshl MCP Server Tests

This directory contains tests for the Toshl MCP Server. The tests are designed to verify that all implemented API endpoints return HTTP 200 status codes.

## Test Structure

The tests are organized in a structure that mirrors the source code:

```
tests/
├── api/
│   ├── toshl-client.test.ts       # Tests for the base API client
│   ├── auth.test.ts               # Tests for authentication
│   └── endpoints/
│       ├── accounts.test.ts       # Tests for accounts endpoint
│       ├── categories.test.ts     # Tests for categories endpoint
│       ├── tags.test.ts           # Tests for tags endpoint
│       ├── budgets.test.ts        # Tests for budgets endpoint
│       ├── me.test.ts             # Tests for me endpoint
│       └── planning.test.ts       # Tests for planning endpoint
└── utils/
    ├── test-helpers.ts            # Test utilities
    └── error-handler.test.ts      # Tests for error handling
```

## Running the Tests

### Prerequisites

1. Node.js (version 18.x or higher)
2. npm (version 8.x or higher)
3. A valid Toshl API token

### Setup

1. Create a `.env.test` file in the project root directory with your Toshl API token:

```
# Copy the example file
cp .env.test.example .env.test

# Edit the file and add your API token
# TOSHL_API_TOKEN=your_api_token_here
```

2. Install dependencies:

```
npm install
```

### Running Tests

To run all tests:

```
npm test
```

To run tests with the `.env.test` file:

```
npm run test:env
```

To run a specific test file:

```
npm test -- tests/api/endpoints/accounts.test.ts
```

## Test Approach

The tests use real API calls to verify that all endpoints return HTTP 200 status codes. This approach ensures that:

1. The API client implementation works correctly with the actual API
2. The API endpoints return the expected status codes
3. The response data has the expected structure

## Error Handling Tests

The error handling tests use mocked API errors to verify that the error handler correctly maps API errors to MCP errors. This is necessary because it's difficult to trigger all error conditions with real API calls.
