# Timeline

Timeline endpoint can be used to list users entries.

## Resource representation

```json
[
  {
    "day": "2014-02-01",
    "sum": 45,
    "count": 1,
    "currency": "USD",
    "entries": [
      {
        "id": "42",
        "amount": -13.37,
        "currency": {
          "code": "USD",
          "rate": 1,
          "fixed": false
        },
        "date": "2012-09-04",
        "desc": "Entry description",
        "account": "45",
        "category": "42",
        "modified": "2012-09-04T13:55:15Z"
      }
    ]
  }
]
```

## Properties

|                                               |                                                                                                                                                                                                                         |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **day**<br>_readonly_<br>`string`             | Day<br> _Format:_ `date`                                                                                                                                                                                                |
| **category**<br>_readonly_<br>`string`        | Category id.                                                                                                                                                                                                            |
| **location**<br>_readonly_<br>`string`        | Location id.                                                                                                                                                                                                            |
| **sum**<br>_read, write_<br>`number`          | Timeline sum<br> _Minimum:_ `> -1000000000000000`<br>_Maximum:_ `< 1000000000000000`                                                                                                                                    |
| **count**<br>_readonly_<br>`integer`          | Item count.<br> _Minimum:_ `>= 0`                                                                                                                                                                                       |
| **currency**<br>_read, write_<br>`string`     | Currency code.<br> _Regex:_ `[A-Z0-9_]{2,10}`                                                                                                                                                                           |
| **entries**<br>_read, write_<br>`array`       | List of [entries](https://developer.toshl.com/docs/entries).                                                                                                                                                            |
| **id**<br>_readonly_<br>`string`              | Entry id.                                                                                                                                                                                                               |
| **amount**<br>_read, write_<br>`number`       | Entry amount.<br> _Minimum:_ `> -1000000000000000`<br>_Maximum:_ `< 1000000000000000`                                                                                                                                   |
| **currency**<br>_read, write_<br>`object`     | Currency object                                                                                                                                                                                                         |
| **code**<br>_read, write_<br>`string`         | Entry currency code.<br> _Regex:_ `[A-Z0-9_]{2,10}`                                                                                                                                                                     |
| **rate**<br>_read, write_<br>`number`         | Entry exchange rate calculated according to entry [account](https://developer.toshl.com/docs/accounts) currency.<br> _Minimum:_ `> 0`                                                                                   |
| **main_rate**<br>_readonly_<br>`number`       | Entry exchange rate main currency calculated according to entry [main](https://developer.toshl.com/docs/me) currency.                                                                                                   |
| **fixed**<br>_read, write_<br>`boolean`       | If set to true, the exchange rate is fixed.<br> _Default value:_ `false`                                                                                                                                                |
| **date**<br>_read, write_<br>`string`         | Entry purchase date in `YYYY-MM-DD` format.<br> _Format:_ `date`                                                                                                                                                        |
| **desc**<br>_read, write_<br>`string`         | Entry description.<br> _Max length:_ `3072`                                                                                                                                                                             |
| **account**<br>_read, write_<br>`string`      | Entry account id.                                                                                                                                                                                                       |
| **category**<br>_read, write_<br>`string`     | Entry category id.                                                                                                                                                                                                      |
| **tags**<br>_read, write_<br>`array`          | An array of tag ids.                                                                                                                                                                                                    |
| **location**<br>_read, write_<br>`object`     | Entry location object.                                                                                                                                                                                                  |
| **id**<br>_read, write_<br>`string`           | Location id. This is the internal Toshl id, not the Foursquare venue id. Not set if user did not select a location.                                                                                                     |
| **venue_id**<br>_read, write_<br>`string`     | Foursquare venue id. Not set if user did not select a location.                                                                                                                                                         |
| **latitude \***<br>_read, write_<br>`number`  | Location latitude.                                                                                                                                                                                                      |
| **longitude \***<br>_read, write_<br>`number` | Location longitude.                                                                                                                                                                                                     |
| **created**<br>_readonly_<br>`string`         | Specifies when the entry was created.<br> _Format:_ `date-time`                                                                                                                                                         |
| **modified**<br>_readonly_<br>`string`        | Specifies when the entry was last modified.                                                                                                                                                                             |
| **repeat**<br>_read, write_<br>`object`       | A repeat object.                                                                                                                                                                                                        |
| **id**<br>_readonly_<br>`string`              | Repeat id.                                                                                                                                                                                                              |
| **start \***<br>_read, write_<br>`string`     | Repeat start date.<br> _Format:_ `date`                                                                                                                                                                                 |
| **end**<br>_read, write_<br>`string`          | Repeat end date. If end date is not specified the `end` parameter is omitted. `count` can be specified instead of `end`.<br> _Format:_ `date`                                                                           |
| **template_start**<br>_readonly_<br>`string`  | Template start date. Only present if entry is a repeat template.<br> _Format:_ `date`                                                                                                                                   |
| **template_end**<br>_readonly_<br>`string`    | Template end date. Only present if entry is a repeat template.<br> _Format:_ `date`                                                                                                                                     |
| **frequency \***<br>_read, write_<br>`string` | Repeat frequency.<br> _Possible values:_ `daily, weekly, monthly, yearly`                                                                                                                                               |
| **interval \***<br>_read, write_<br>`integer` | Repeat interval. For example: repeating every two months -> frequency: `monthly`, interval: `2`.<br> _Minimum:_ `>= 1`<br>_Maximum:_ `=< 255`                                                                           |
| **count**<br>_read, write_<br>`integer`       | How many times to repeat entry.<br> _Minimum:_ `>= 1`                                                                                                                                                                   |
| **byday**<br>_read, write_<br>`string`        | A comma separated list of weekdays ( `MO,TU..`). Each weekday can have be preceded by a positive or negative number ( `1MO` \- 1st monday of the month/year, `-1MO` \- last monday of the month/year).                  |
| **bymonthday**<br>_read, write_<br>`string`   | A comma separated list of month days (1-31). Each month day can have a plus(+) or minus(-) prefix.                                                                                                                      |
| **bysetpos**<br>_read, write_<br>`string`     | A comma separater list of the nth occurance within `bymonthday`. If you wish to set a repeat to occur on the last day of the month, set `frequency` to `monthly`, `bymonthday` to `28,29,30,31` and `bysetpos` to `-1`. |
| **iteration**<br>_readonly_<br>`integer`      | Repeat iteration number. First entry in the repeat has `iteration=0`.<br> _Minimum:_ `>= 0`                                                                                                                             |
| **template**<br>_readonly_<br>`boolean`       | Set to true if this entry is a template for all future repeating entries in this repeat.                                                                                                                                |
| **entries**<br>_read, write_<br>`array`       | List of entry ids that were used to create the repeat (used only for confirming detected repeats).                                                                                                                      |
| **type**<br>_read, write_<br>`string`         | Repeat type.<br> _Possible values:_ `automatic, confirm, confirmed`                                                                                                                                                     |
| **status**<br>_read, write_<br>`string`       | Repeat status.<br> _Possible values:_ `ok, missing_entries`                                                                                                                                                             |
| **transaction**<br>_read, write_<br>`object`  | A transaction object.                                                                                                                                                                                                   |
| **id**<br>_read, write_<br>`string`           | Companion entry id.                                                                                                                                                                                                     |
| **amount**<br>_read, write_<br>`number`       | Transaction amount.<br> _Minimum:_ `> -1000000000000000`<br>_Maximum:_ `< 1000000000000000`                                                                                                                             |
| **account \***<br>_read, write_<br>`string`   | Companion entry account.                                                                                                                                                                                                |
| **currency \***<br>_read, write_<br>`object`  | Companion entry currency object                                                                                                                                                                                         |
| **images**<br>_read, write_<br>`array`        | List of entry images. Each entry can have up to 4 images.<br> _Maximum items:_ `4`                                                                                                                                      |
| **reminders**<br>_read, write_<br>`array`     | List of entry reminders. Each entry can have up to 5 reminder. List is returned sorted by `period` and `number`.<br> _Maximum items:_ `5`                                                                               |
| **import**<br>_read, write_<br>`object`       | If entry was imported via a bank import (file or bank sync) this object is returned.                                                                                                                                    |
| **id**<br>_read, write_<br>`string`           | File import id                                                                                                                                                                                                          |
| **connection**<br>_read, write_<br>`string`   | Bank connection id which is responsible for the entry import.                                                                                                                                                           |
| **memo**<br>_read, write_<br>`string`         | Memo provided by import                                                                                                                                                                                                 |
| **payee**<br>_read, write_<br>`string`        | Payee provided by import                                                                                                                                                                                                |
| **pending**<br>_read, write_<br>`boolean`     | `true` if transaction is pending.                                                                                                                                                                                       |
| **review**<br>_read, write_<br>`object`       | If entry is linked to a review (subject, match or resulting entry), this object is returned                                                                                                                             |
| **id**<br>_read, write_<br>`string`           | Review id                                                                                                                                                                                                               |
| **type**<br>_read, write_<br>`string`         | _Possible values:_ `expense, income, transfer, repeat`                                                                                                                                                                  |
| **completed**<br>_read, write_<br>`boolean`   | If review has already been completed.                                                                                                                                                                                   |
| **settle**<br>_read, write_<br>`object`       | If this entry is part of the settle made automatically, then settle object is returned.                                                                                                                                 |
| **id**<br>_read, write_<br>`string`           | Account id with settle                                                                                                                                                                                                  |
| **split**<br>_read, write_<br>`object`        | If entry was created by splitting up another, this object is returned.                                                                                                                                                  |
| **parent**<br>_read, write_<br>`string`       | Link to parent that was used to create this split entry.                                                                                                                                                                |
| **children**<br>_read, write_<br>`array`      | Array of entry ids that have the same parent.                                                                                                                                                                           |
| **completed**<br>_read, write_<br>`boolean`   | If an entry has a reminder, this field indicates if the bill has been paid or not. Once it has reminders for this entry no longer fire.                                                                                 |
| **deleted**<br>_readonly_<br>`boolean`        | Is object deleted.                                                                                                                                                                                                      |
| **extra**<br>_read, write_<br>`object`        | A custom JSON object that you can use to extend Toshl API. Whatever you save into this field you will get back whenever you fetch it later.                                                                             |
| **tags**<br>_read, write_<br>`array`          | Entries groupped by tags                                                                                                                                                                                                |
| **tag**<br>_readonly_<br>`string`             | Tag id.                                                                                                                                                                                                                 |
| **sum**<br>_read, write_<br>`number`          | Tag sum<br> _Minimum:_ `> -1000000000000000`<br>_Maximum:_ `< 1000000000000000`                                                                                                                                         |
| **count**<br>_readonly_<br>`integer`          | Tag entry count.<br> _Minimum:_ `>= 0`                                                                                                                                                                                  |
| **currency**<br>_read, write_<br>`string`     | Currency code.<br> _Regex:_ `[A-Z0-9_]{2,10}`                                                                                                                                                                           |

**\*** denotes _required_ field/parameter.

Page last modified: 08 Jan 2024
