# Toshl API Documentation

## Overview

All endpoints must be accessed over HTTPS. Currently only `JSON` responses are supported.

## Authentication

### Basic Authentication

Toshl API supports basic authentication for simple integrations.

### OAuth 2.0

Apps can connect to the API using OAuth 2.0 protocol for secure authentication and authorization.

## Resources

### Entries

#### List Entries

```
GET /entries
```

Required scope needed for authentication.

#### Get Entry

```
GET /entries/{id}
```

#### Create Entry

```
POST /entries
```

Some related data is updated asynchronously.

#### Update Entry

```
PUT /entries/{id}
```

Some related data is updated asynchronously.

#### Delete Entry

```
DELETE /entries/{id}
```

Some related data is updated asynchronously.

#### Entry Sums

```
GET /entries/sums
```

Get daily entry sums.

### Categories

#### List Categories

```
GET /categories
```

Get all user's categories.

#### Get Category

```
GET /categories/{id}
```

#### Create Category

```
POST /categories
```

Some related data is updated asynchronously.

#### Update Category

```
PUT /categories/{id}
```

Some related data is updated asynchronously.

#### Delete Category

```
DELETE /categories/{id}
```

Some related data is updated asynchronously.

#### Category Sums

```
GET /categories/sums
```

Retrieve a list of category expense and income sums.

#### Merge Categories

Merge multiple categories into one. All entries and budgets with the selected categories will be updated.

### Accounts

#### List Accounts

```
GET /accounts
```

Get all user's accounts.

#### Get Account

```
GET /accounts/{id}
```

#### Create Account

```
POST /accounts
```

Some related data is updated asynchronously.

#### Update Account

```
PUT /accounts/{id}
```

Some related data is updated asynchronously.

#### Delete Account

```
DELETE /accounts/{id}
```

Some related data is updated asynchronously.

#### Reorder Accounts

```
POST /accounts/reorder
```

Reorder account list.

#### Move Account

```
POST /accounts/{id}/move
```

Move an account to a new position in the list.

#### Merge Accounts

Merge multiple accounts into one. All entries and budgets with the selected accounts will be updated.

### Budgets

#### List Budgets

```
GET /budgets
```

Get budget list.

#### Get Budget

```
GET /budgets/{id}
```

#### Create Budget

```
POST /budgets
```

Some related data is updated asynchronously.

#### Update Budget

```
PUT /budgets/{id}
```

Some related data is updated asynchronously.

#### Delete Budget

```
DELETE /budgets/{id}
```

Some related data is updated asynchronously.

#### Reorder Budgets

```
POST /budgets/reorder
```

Reorder budget list.

#### Budget History

```
GET /budgets/{id}/history
```

List a specific budget's history.

## Additional Features

### Locations

```
GET /entries/locations
```

Locations endpoint returns a list where user spends their money. Includes latitude and longitude data.

### Currencies

```
GET /currencies
```

Get all available currencies supported by the Toshl API.

### Sync

For clients capable of caching a local version of server data, sync functionality is available.

### Caching

Most API endpoints return either an `ETag` or a `Last-Modified` header. Caching is encouraged for better performance.

### Error Handling

The API uses appropriate HTTP response status codes and returns detailed error messages when issues occur.

## Changelog

Latest changes:

- Added preliminary import functionality
- Various endpoint updates and improvements

For detailed API documentation and examples, visit [https://developer.toshl.com/docs/](https://developer.toshl.com/docs/)
