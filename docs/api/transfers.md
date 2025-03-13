# Transfers in Toshl Finance

This document explains how to handle transfers between accounts in Toshl Finance using the MCP server.

## Understanding Transfers

In Toshl Finance, a transfer is a movement of funds from one account to another. Transfers are represented as a pair of entries with a transaction object linking them together. The entry in the source account has a negative amount, while the entry in the destination account has a positive amount.

## Converting Regular Entries to Transfers

Sometimes, you may need to convert a regular expense or income entry into a transfer. This is common when:

- An entry was imported from a bank statement and automatically categorized as an expense/income
- You want to properly track money moving between your accounts

### Workflow for Converting an Entry to a Transfer

1. **Identify the entry to convert**

   - Note the entry ID, amount, date, and description
   - Identify the source account (where the entry currently exists)
   - Identify the destination account (where the money was transferred to)

2. **Create a new transfer entry**

   - Use the `entry_create` tool with a transaction object
   - Set the amount to negative (for outgoing funds)
   - Specify both the source and destination accounts
   - Use the "Transfer" category (typically ID "73101634")

3. **Delete the original entry**
   - Use the `entry_delete` tool with the original entry ID

### Example

To convert a regular expense entry to a transfer:

```javascript
// Step 1: Create a new transfer entry
const transferResult = await use_mcp_tool({
  server_name: "toshl-mcp-server",
  tool_name: "entry_create",
  arguments: {
    amount: -63.51, // Negative amount for outgoing funds
    currency: {
      code: "EUR",
    },
    date: "2024-12-28",
    desc: "Transfer to Destination Account",
    account: "4519115", // Source account ID
    category: "73101634", // Transfer category ID
    transaction: {
      account: "4519307", // Destination account ID
      currency: {
        code: "EUR",
      },
    },
  },
});

// Step 2: Delete the original entry
const deleteResult = await use_mcp_tool({
  server_name: "toshl-mcp-server",
  tool_name: "entry_delete",
  arguments: {
    id: "391134396", // Original entry ID
  },
});
```

## Important Notes

1. **Transaction Object**: The transaction object is required to create a transfer. It must include:

   - `account`: The ID of the destination account
   - `currency`: The currency object for the destination account

2. **Automatic Companion Entry**: When you create an entry with a transaction object, Toshl automatically creates a companion entry in the destination account with the opposite amount.

3. **Category**: Transfers should use the "Transfer" category (typically ID "73101634").

4. **Error Handling**: If you encounter errors when trying to update an existing entry to a transfer using `entry_manage`, the recommended approach is to create a new transfer entry and delete the original one.

5. **Verification**: After creating a transfer, you can verify it by listing entries for both accounts and checking that the transaction object links them correctly.

## Troubleshooting

If you encounter a 500 error when trying to update an entry to a transfer using `entry_manage`, this is likely because the Toshl API doesn't support directly converting an existing entry to a transfer. Instead, follow the workflow above to create a new transfer entry and delete the original one.
