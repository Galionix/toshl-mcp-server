# Errors

Whenever an error occurs API uses the appropriate HTTP response status code and returns a JSON error message giving further detail on why the error occurred.

## HTTP Status codes

|                                 |                                                                                                                                                    |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **200** (OK)                    | Great success!                                                                                                                                     |
| **201** (Created)               | Indicates a successful resource creation.                                                                                                          |
| **202** (Accepted)              | The request has been accepted for processing.                                                                                                      |
| **204** (No Content)            | Indicates response has no content.                                                                                                                 |
| **304** (Not Modified)          | Used if the content was not modified since it was last accessed.                                                                                   |
| **400** (Bad Request)           | A generic error response used whenever no other 4xx code is appropriate.                                                                           |
| **401** (Unauthorized)          | Indicates something is wrong with [authentication](https://developer.toshl.com/docs/oauth).                                                        |
| **402** (Payment Required)      | Indicates user has MFA enabled. See [authentication](https://developer.toshl.com/docs/oauth) for more info.                                        |
| **403** (Forbidden)             | Indicates you are trying to access part of the API you do not have access to.                                                                      |
| **404** (Not Found)             | Indicates a specific resource or endpoint was not found.                                                                                           |
| **405** (Method Not Allowed)    | Indicates an wrong request method was used to access a specific API endpoint. Check `Allow` part of the response to see which methods are allowed. |
| **409** (Conflict)              | Indicates that an object update was attempted, but it has been modified since the client last saw it (perhaps on a different device).              |
| **418** (I'm a teapot)          | Not an error, [just for fun](http://tools.ietf.org/html/rfc2324). The resulting entity body may be short and stout.                                |
| **429** (Too Many Requests)     | Indicates that the application has sent to many requests in the given time limit.                                                                  |
| **500** (Internal Server Error) | Indicates API malfunction.                                                                                                                         |
| **503** (Service Unavailable)   | API servers are up, but are either being upgraded or are overloaded with requests.                                                                 |

## Error messages

While the HTTP status code is usually enough to determine the nature of the error, some additional information may be needed from time to time to explain why a certain error occurred.

A typical error message looks like this (accompanied by an appropriate HTTP status code).

```json
{
  "id": "account_limit",
  "description": "Account limit reached."
}
```

_Note:_ To localize the error messages use `Accept-Language` header and set the preferred language order ( `de, en` for example). If the preferred localization is not found the, or if the header is not sent, all error messages will be returned in English.

## Create/Update errors

While creating or updating a resource some fields can have input errors. In this case the error message includes an additional response id and parameter.

```json
{
    "id": "input_error",
    "description": "Could not insert expense.",
    "fields": [\
        {\
            "field": "amount",\
            "error": "Amount cannot be zero."\
        },\
        {\
            "field": "category",\
            "error": "Please select at least one category."\
        }\
    ]
}
```

Page last modified: 08 Jan 2024
