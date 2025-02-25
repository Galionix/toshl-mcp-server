# INTRO
we're writing an integration between AI agent and a personal finance management app. The task is to write an MCP server https://modelcontextprotocol.io/quickstart?utm_source=substack&utm_medium=email that reads from the REST API of [Toshl API](https://developer.toshl.com/docs/)

functional requirements
- READ access to endpoints
    - [/accounts](https://developer.toshl.com/docs/accounts/)
       - https://developer.toshl.com/docs/accounts/list/
       - https://developer.toshl.com/docs/accounts/get/
    - [/categories](https://developer.toshl.com/docs/categories/)
       - https://developer.toshl.com/docs/categories/list/
       - https://developer.toshl.com/docs/categories/get/
    - [/tags](https://developer.toshl.com/docs/tags/)
       - https://developer.toshl.com/docs/tags/list/
       - https://developer.toshl.com/docs/tags/get/
    - [/budgets](https://developer.toshl.com/docs/budgets/)
       - https://developer.toshl.com/docs/budgets/list/
       - https://developer.toshl.com/docs/budgets/get/
    - [/me](https://developer.toshl.com/docs/me/)
       - https://developer.toshl.com/docs/me/summary/get
       - https://developer.toshl.com/docs/me/summary
       - https://developer.toshl.com/docs/me/payments/types
       - https://developer.toshl.com/docs/me/payments/list
       - https://developer.toshl.com/docs/me/get
    - [/planning](https://developer.toshl.com/docs/planning/)
       - https://developer.toshl.com/docs/planning/get/

authentication
see https://developer.toshl.com/docs/basic/ on how to authenticate with Toshl API

error handling
see https://developer.toshl.com/docs/errors/ on how to implement error handling

caching
see https://developer.toshl.com/docs/caching/ on recommended caching practices