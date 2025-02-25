# Product Context

## Purpose

The Toshl MCP Server is designed to bridge the gap between AI agents and personal finance data stored in Toshl Finance. It enables AI agents to access, analyze, and provide insights based on a user's financial information without requiring direct API integration knowledge.

## Problems Solved

1. **Data Accessibility**: Makes financial data from Toshl accessible to AI agents through a standardized protocol (MCP).
2. **Integration Complexity**: Abstracts away the complexities of the Toshl API, providing a simpler interface for AI agents.
3. **Financial Analysis**: Enables AI agents to perform financial analysis and provide personalized advice based on real financial data.
4. **Privacy and Security**: Maintains user privacy by providing controlled access to financial data without exposing raw credentials.

## Target Users

1. **Financial Advisor AI Agents**: AI systems designed to provide financial advice and insights.
2. **Toshl Users**: Individuals who use Toshl Finance for personal finance management and want AI-powered insights.
3. **Developers**: Those building AI applications that need access to financial data.

## User Experience Goals

1. **Seamless Integration**: AI agents should be able to access financial data without friction.
2. **Comprehensive Data Access**: Provide access to all relevant financial information needed for analysis.
3. **Accurate Insights**: Ensure data is structured in a way that facilitates accurate financial analysis.
4. **Responsive Performance**: Maintain quick response times despite API limitations.
5. **Privacy Preservation**: Respect user privacy and data security at all times.

## Key Features

1. **READ Access to Toshl Data**: Access to accounts, categories, tags, budgets, user information, and planning data.
2. **Authentication Management**: Secure handling of Toshl API authentication.
3. **Data Formatting**: Consistent presentation of financial data for analysis.
4. **Caching**: Efficient data retrieval with appropriate caching.
5. **Error Handling**: Robust error handling and recovery.

## Success Metrics

1. **Integration Ease**: How easily AI agents can integrate with and use the MCP server.
2. **Data Completeness**: Whether all necessary financial data is accessible.
3. **Response Time**: How quickly the server responds to requests.
4. **Accuracy**: Whether the data provided leads to accurate financial insights.
5. **User Satisfaction**: Whether users find value in the AI-powered financial insights.

## Constraints

1. **READ-Only Access**: Currently limited to read-only operations.
2. **API Rate Limits**: Subject to Toshl API rate limiting.
3. **Authentication Requirements**: Requires user authentication with Toshl.
4. **Data Privacy**: Must adhere to financial data privacy best practices.
