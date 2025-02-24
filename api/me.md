# Toshl API Integration Documentation

## Base URL

https://api.toshl.com

## Authentication

- **Type**: OAuth
- **Details**: OAuth authentication is required for API access

## Headers

- Content-Type: application/json

## Endpoints

### GET /me

Returns information about the authenticated user.

#### Response Parameters

| Parameter     | Type    | Required | Description                          |
| ------------- | ------- | -------- | ------------------------------------ |
| id            | string  | no       | User id                              |
| email         | string  | no       | Email address used to log into Toshl |
| first_name    | string  | yes      | User's first name                    |
| last_name     | string  | yes      | User's last name                     |
| joined        | string  | no       | Date user joined Toshl               |
| modified      | string  | no       | Date user details were last modified |
| pro           | object  | no       | Pro account details                  |
| currency      | object  | no       | Currency settings                    |
| start_day     | integer | no       | User preference for month start day  |
| notifications | integer | no       | Number of notifications              |
| social        | array   | no       | Connected social accounts            |
| steps         | array   | no       | Suggested remaining steps            |
| limits        | object  | no       | User limits                          |
| locale        | string  | no       | User's locale                        |
| timezone      | string  | no       | User's timezone                      |
| country       | string  | no       | User's country                       |

#### Example Response

```json
{
  "id": "user_id",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "joined": "2024-02-24T10:00:00Z",
  "modified": "2024-02-24T15:00:00Z",
  "pro": {
    // Pro account details
  },
  "currency": {
    // Currency settings
  },
  "start_day": 1,
  "notifications": 0,
  "social": [],
  "steps": [],
  "limits": {},
  "locale": "en_US",
  "timezone": "Europe/Ljubljana",
  "country": "SI"
}
```

## Response Format

- All responses are in JSON format
- Successful responses have HTTP status codes in the 2xx range
- Error responses include:
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not Found
  - 500: Server Error

## Implementation Notes

1. OAuth authentication is required for all API requests
2. All dates in the API use ISO 8601 format
3. The API returns comprehensive user profile information including preferences and settings
4. Some fields like first_name and last_name are required in the response

## Error Handling

Error responses follow this format:

```json
{
  "error": {
    "message": "Error description",
    "code": "error_code"
  }
}
```

## Rate Limiting

The API implements rate limiting. Implement appropriate error handling for 429 (Too Many Requests) responses.

