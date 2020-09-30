# date-ts

Extra light package for working with dates

## Installation

Use the package manager [npm](https://www.npmjs.com/package/npm) to install date-ts.

```bash
npm install date-ts
```

## Usage

```javascript
let date = require("date-ts");

// or

import date, { setDateFormat } from "date-ts";

// format date
date("Wed Sep 30 2020 14:44:09 GMT+0300").format();

// set global date format
setDateFormat("DD/MM/YYYY"); // default 'MM/DD/YYYY';

// with format different than global
date("Wed Sep 30 2020 14:44:09 GMT+0300").format("hh:mm"); // 2:44 PM
date("Wed Sep 30 2020 14:44:09 GMT+0300").format("HH:mm"); // 14:44
date("Wed Sep 30 2020 14:44:09 GMT+0300").format("DD-MM-YY"); // 30-09-20

//compare dates
date("Wed Sep 30 2020 14:44:09 GMT+0300").isDateBefore(
	"Wed Oct 7 2020 14:44:09 GMT+0300"
);
date("Wed Sep 30 2020 14:44:09 GMT+0300").isDateAfter(
	"Wed Oct 7 2020 14:44:09 GMT+0300"
);
date("Wed Sep 30 2020 14:44:09 GMT+0300").timeDifference(
	"Wed Oct 7 2020 14:44:09 GMT+0300",
	"hh:mm"
);
```

## Info

For keepping this library extra light locales are omitted
In case you need to get a day of the week or write a full month name
you can get number of the week day or a month number with this formatting
and add month name or a weekday in your language

```javascript
date("Wed Sep 30 2020 14:44:09 GMT+0300").format("dddd");
date("Wed Sep 30 2020 14:44:09 GMT+0300").format("MM");
```
