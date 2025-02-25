# Accounts

Accounts endpoint can be used to interact with [users](https://developer.toshl.com/docs/me) accounts.

_Note:_ Be advised that accounts are subject to [free account limitation](https://developer.toshl.com/docs/free). If a user with a free account tries to add an account and goes over the alowed number of accounts, a 403 (Forbidden) [error](https://developer.toshl.com/docs/errors) will be returned and the account will be discarded.

## Resource representation

```json
{
  "id": "42",
  "name": "Tesla model S",
  "balance": 3000,
  "initial_balance": 3000,
  "currency": {
    "code": "USD",
    "rate": 1,
    "fixed": false
  },
  "median": {
    "expenses": 55,
    "incomes": 1300
  },
  "status": "active",
  "order": 0,
  "modified": "2012-09-04T13:55:15Z",
  "goal": {
    "amount": 63570,
    "start": "2013-07-01",
    "end": "2015-07-01"
  }
}
Properties
| | | | --- | --- | | idreadonlystring | Account id. | | parentread, writestring | Parent account id. | | nameread, writestring | Account name. Max length: 100 | | ~~name_override~~ (deprecated)read, writeboolean | Is true if name is overriden with a custom name. | | typeread, writestring | Account type Possible values: custom, depository, credit_card, loan, mortgage, brokerage, investment, savings, other | | balancereadonlynumber | Account balance. Minimum: > -1000000000000000Maximum: < 1000000000000000 | | initial_balanceread, writenumber | Account balance. Minimum: > -1000000000000000Maximum: < 1000000000000000Default value: 0 | | limitread, writenumber | Account limit. If no limit is set null is returned Minimum: > -1000000000000000Maximum: < 1000000000000000 | | currencyread, writeobject | Currency object | | coderead, writestring | Account currency code. Regex: [A-Z0-9_]{2,10} | | rateread, writenumber | Account exchange rate calculated according to users currency. If not set (and currency differs from main currency) the daily exchange rate should be used. Minimum: > 0 | | main_ratereadonlynumber | Entry exchange rate main currency calculated according to entry main currency. | | fixedread, writeboolean | If set to true, the exchange rate is fixed. Default value: false | | daily_sum_medianreadonlyobject | Calculated median of daily sums of expenses and incomes. | | expensesreadonlynumber | Median of daily sums of expenses. Minimum: >= 0Maximum: < 1000000000000000Default value: 0 | | incomesreadonlynumber | Median of daily sums of incomes. Minimum: >= 0Maximum: < 1000000000000000Default value: 0 | | avgread, writeobject | Account average | | expensesreadonlynumber | Monthly expense sum avg Minimum: >= 0Maximum: < 1000000000000000Default value: 0 | | incomesreadonlynumber | Monthly income sum Minimum: >= 0Maximum: < 1000000000000000Default value: 0 | | statusreadonlystring | Account status. Possible values: active, inactive, archived | | orderread, writeinteger | Account order. Minimum: >= 0Maximum: =< 255 | | modifiedreadonlystring | Specifies when the account was last modified. | | goalread, writeobject | If account is a savings goal this includes a savings goal object. | | amountread, writenumber | Desired amount to save. Minimum: > 0Maximum: < 1000000000000000 | | startread, writestring | Savings goal start date in YYYY-MM-DD format. Format: date | | endread, writestring | Savings goal end date in YYYY-MM-DD format. Format: date | | connectionread, writeobject | If account is connected to an institution connection (bank etc.) this object includes details about the connection | | idread, writestring | Connection id | | nameread, writestring | Connection name | | statusread, writestring | Connection status. connected means all is well, disconnected means sync is disabled, inactive means pro is needed to reactivate, error means there is an error with the connection and a re-login is required. Possible values: connected, disconnected, inactive, error | | logoreadonlystring | Institution logo url if institution has a logo. | | settleread, writeobject | If account is set to automatically settle each month this object includes details about the settle day of the month. | | bydayread, writestring | A comma separated list of weekdays ( MO,TU..). Each weekday can have be preceded by a positive or negative number ( 1MO - 1st monday of the month/year, -1MO - last monday of the month/year). | | bymonthdayread, writestring | A comma separated list of month days (1-31). Each month day can have a plus(+) or minus(-) prefix. | | bysetposread, writestring | A comma separater list of the nth occurance within bymonthday. | | billingread, writeobject | If account is set to automatically settle each month this object includes details about the billing day of the month. | | bydayread, writestring | A comma separated list of weekdays ( MO,TU..). Each weekday can have be preceded by a positive or negative number ( 1MO - 1st monday of the month/year, -1MO - last monday of the month/year). | | bymonthdayread, writestring | A comma separated list of month days (1-31). Each month day can have a plus(+) or minus(-) prefix. | | bysetposread, writestring | A comma separater list of the nth occurance within bymonthday. | | countread, writeinteger | Number of times the account has been used. | | reviewreadonlyinteger | Number of entries to review. | | deletedreadonlyboolean | Is object deleted. | | recalculatedreadonlyboolean | Is true if account balance has been calculated (if false try pulling again until true). | | extraread, writeobject | A custom JSON object that you can use to extend Toshl API. Whatever you save into this field you will get back whenever you fetch it later. |

* denotes required field/parameter.

Page last modified: 08 Jan 2024


```
