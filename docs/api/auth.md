# Basic Authentication

Toshl API supports [basic authentication](http://www.ietf.org/rfc/rfc2617.txt) with _personal access tokens_. Each token can be [manually generated](https://developer.toshl.com/apps) by the user and then copy-pasted into the application. During the process the token must be given the appropriate access rights it requires to work correctly. This part is not automated and must be performed by the user.

Personal tokens never expire, but can be revoked by the user at any time.

To make a basic auth request send the personal access token as the username and leave the password empty.

```bash
curl -u PERSONAL_TOKEN: https://api.toshl.com/me
```

_Note:_ Make sure the personal token is never leaked. Treat is as you would any other password.

Page last modified: 08 Jan 2024
