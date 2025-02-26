# Entries

Entries endpoint can be used to interact with [users](https://developer.toshl.com/docs/me) expenses and incomes.

Expenses have a negative prefix, incomes don't have a prefix. Every entry is part of an [account](https://developer.toshl.com/docs/accounts), is in one [category](https://developer.toshl.com/docs/categories), _can_ have [tags](https://developer.toshl.com/docs/tags), _can_ be part of a repeat, _can_ be part of a transaction and _can_ include [images](https://developer.toshl.com/docs/entries/images).

An entry is repeating if it includes the `repeat` object. Repeat parameters `start`, `end`, `frequency`, `interval`, `count` and `byday` are used according to [RFC 5545 RRULE](http://tools.ietf.org/html/rfc5545#section-3.3.10).

A transaction is a transfer of funds from one account to the other. An entry is part of transaction if it includes the `transation` object.

If you try edit an entry that is part of a transaction, the server will automatically update the companion entry.

_Note:_ Be advised that only [pro accounts](https://developer.toshl.com/docs/free) can upload entry images. If a user with a free account tries to add an image, a 403 (Forbidden) [error](https://developer.toshl.com/docs/errors) will be returned and the image will be discarded.

## Resource representation

```json
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
  "tags": ["42", "43"],
  "location": {
    "id": "44",
    "latitude": 46.051426,
    "longitude": 14.505966
  },
  "modified": "2012-09-04T13:55:15Z",
  "repeat": {
    "id": "41",
    "frequency": "monthly",
    "interval": 1,
    "start": "2012-09-04",
    "count": 10,
    "iteration": 1,
    "template": true
  },
  "transaction": {
    "id": "43",
    "account": "43",
    "currency": {
      "code": "USD",
      "rate": 1,
      "fixed": false
    }
  },
  "images": [
    {
      "id": "43",
      "path": "https://img.toshl.com/12/1404134603-ab820800-954f-46a7-95ff-fee7d961b31f/",
      "status": "uploaded"
    }
  ],
  "reminders": [
    {
      "period": "week",
      "number": 2,
      "at": "11:25"
    }
  ],
  "completed": false
}
```

## Properties

|                                               |                                                                                                                                                                                                                         |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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
| **code**<br>_read, write_<br>`string`         | Entry currency code.<br> _Regex:_ `[A-Z0-9_]{2,10}`                                                                                                                                                                     |
| **rate**<br>_read, write_<br>`number`         | Entry exchange rate calculated according to entry [account](https://developer.toshl.com/docs/accounts) currency.<br> _Minimum:_ `> 0`                                                                                   |
| **main_rate**<br>_readonly_<br>`number`       | Entry exchange rate main currency calculated according to entry [main](https://developer.toshl.com/docs/me) currency.                                                                                                   |
| **fixed**<br>_read, write_<br>`boolean`       | If set to true, the exchange rate is fixed.<br> _Default value:_ `false`                                                                                                                                                |
| **images**<br>_read, write_<br>`array`        | List of entry images. Each entry can have up to 4 images.<br> _Maximum items:_ `4`                                                                                                                                      |
| **id**<br>_read, write_<br>`string`           | Image id.                                                                                                                                                                                                               |
| **path**<br>_readonly_<br>`string`            | Path to image. Append `thumb.jpg` (width 640px) or `full.jpg` to path to get different variants of the image.                                                                                                           |
| **filename**<br>_readonly_<br>`string`        | Name of the attachment file. Use it together with path to retrieve the attachment.                                                                                                                                      |
| **type**<br>_readonly_<br>`string`            | Attachment type can be either `image` or `pdf`.                                                                                                                                                                         |
| **status**<br>_readonly_<br>`string`          | Image status.<br> _Possible values:_ `new, uploaded, error, deleting`                                                                                                                                                   |
| **reminders**<br>_read, write_<br>`array`     | List of entry reminders. Each entry can have up to 5 reminder. List is returned sorted by `period` and `number`.<br> _Maximum items:_ `5`                                                                               |
| **period**<br>_read, write_<br>`string`       | Reminder period<br> _Possible values:_ `day, week, month, year`                                                                                                                                                         |
| **number**<br>_read, write_<br>`integer`      | The number of periods before entry date -> 2 weeks before date: `period = week`, `number = 2`<br> _Minimum:_ `>= 0`<br>_Maximum:_ `=< 255`                                                                              |
| **at**<br>_read, write_<br>`string`           | Time of day for the reminder to fire in `HH:mm:ss` format.<br> _Format:_ `time`                                                                                                                                         |
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

**\*** denotes _required_ field/parameter.

Page last modified: 08 Jan 2024
