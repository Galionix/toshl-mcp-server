# Daily sums

Entry sum endpoint can be used to retrieve a list of daily expense and income sums and counts. Days without expenses and incomes are not returned.

## Resource representation

```json
{
  "day": "2013-01-02",
  "expenses": {
    "sum": 15.3,
    "count": 2
  },
  "modified": "2012-09-04T13:55:15Z"
}
```

## Properties

|                                         |                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------- |
| **day**<br>_readonly_<br>`string`       | Day.<br> _Format:_ `date`                                                  |
| **expenses**<br>_readonly_<br>`object`  | Daily expense summary.                                                     |
| **sum \***<br>_readonly_<br>`number`    | Daily expense sum<br> _Minimum:_ `>= 0`<br>_Maximum:_ `< 1000000000000000` |
| **count \***<br>_readonly_<br>`integer` | Daily expense count.<br> _Minimum:_ `>= 0`                                 |
| **incomes**<br>_readonly_<br>`object`   | Daily income summary.                                                      |
| **sum \***<br>_readonly_<br>`number`    | Daily income sum<br> _Minimum:_ `>= 0`<br>_Maximum:_ `< 1000000000000000`  |
| **count \***<br>_readonly_<br>`integer` | Daily income count.<br> _Minimum:_ `>= 0`                                  |
| **modified**<br>_readonly_<br>`string`  | Specifies when the sum was last modified.                                  |

**\*** denotes _required_ field/parameter.

Page last modified: 08 Jan 2024
