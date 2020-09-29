/*
YYYY	   2014	    4 or 2 digit year. Note: Only 4 digit can be parsed on strict mode
YY	       14	    2  digit year
M MM	   1..12	Month number
MMM MMMM   Jan..December	Month name in locale set by moment.locale()
D DD	   1..31	Day of month
Do	       1st..31st	Day of month with ordinal
ddd dddd	Mon...Sunday	Day name in locale set by moment.locale()

H HH	0..23	Hours (24 hour time)
h hh	1..12	Hours (12 hour time used with a A.)
a A	    am pm  	Post or ante meridiem (Note the one character a p are also considered valid)
m mm	0..59	Minutes
s ss	0..59	Seconds
*/

/*
YYYY	   2014	    4 or 2 digit year. Note: Only 4 digit can be parsed on strict mode
YY	       14	    2  digit year
M MM	   1..12	Month number
D DD	   1..31	Day of month

H HH	0..23	Hours (24 hour time)
h hh	1..12	Hours (12 hour time used with a A.)
a A	    am pm  	Post or ante meridiem (Note the one character a p are also considered valid)
m mm	0..59	Minutes
s ss	0..59	Seconds
*/

let allFormats = [
	"YYYY",
	"YY",
	"M",
	"MM",
	"D",
	"DD",
	"H",
	"HH",
	"h",
	"hh",
	"a",
	"A",
	"m",
	"mm",
	"s",
	"ss",
];

// eslint-disable-next-line
let regExp = new RegExp(/[.\- \/\:]/);

export default function formatDate(dateString: string, format: string) {
	let date = new Date(dateString);
	let formats = format.split(regExp);
	let newDate = format;

	allFormats.map((value) => {
		if (formats.indexOf(value) !== -1) {
			let newValue = formatValue(date, value);
			newDate = newDate.replace(value, newValue);
		}
	});
	return newDate;
}

export let isDateAfter = (
	firstDateString: string,
	secondDateString: string
) => {
	let firstDate = new Date(firstDateString);
	let secondDate = new Date(secondDateString);
	console.log(firstDate.toUTCString() > secondDate.toUTCString());
	return firstDate.toUTCString() > secondDate.toUTCString();
};

export let isDateBefore = (
	firstDateString: string,
	secondDateString: string | Date
) => {
	let firstDate = new Date(firstDateString);
	let secondDate =
		typeof secondDateString === "string"
			? new Date(secondDateString)
			: secondDateString;

	return firstDate.toUTCString() < secondDate.toUTCString();
};

export let timeDifference = (
	time: string,
	compareTo: string | Date,
	format: string
) => {
	let firstDate = new Date(time);
	let secondDate =
		typeof compareTo === "string" ? new Date(compareTo) : compareTo;

	let milliseconds = firstDate.getTime() - secondDate.getTime();
	return convertMiliseconds(milliseconds, format);
};

let formatValue = (date: Date, format: string) => {
	let value = null;
	if (format.indexOf("Y") !== -1) {
		value = formatYear(date.getFullYear(), format);
	} else if (format.indexOf("M") !== -1) {
		value = formatMonth(date.getMonth(), format);
	} else if (format.indexOf("D") !== -1 || format.indexOf("d") !== -1) {
		value = formatDay(date, format);
	} else if (format.indexOf("H") !== -1 || format.indexOf("h") !== -1) {
		value = formatHours(date.getHours(), format);
	} else if (format.indexOf("m") !== -1) {
		value = formatMinutes(date.getMinutes());
	} else if (format.indexOf("s") !== -1) {
		value = formatSeconds(date.getSeconds());
	}

	return value;
};

let formatYear = (year: number, format: string) => {
	return year.toString();
};

let formatMonth = (month: number | string, format: string) => {
	if (month.toString().length === 1) {
		month = "0" + month;
	}
	return month;
};

let formatDay = (date: Date, format: string) => {
	let day = 0;

	if (format === "ddd" || format === "dddd") {
		day = date.getDay();
	} else if (format === "D" || format === "DD") {
		day = date.getDate();
	}

	return day.toString();
};

let formatHours = (hours: number, format: string) => {
	return hours.toString();
};

let formatMinutes = (minutes: number | string) => {
	if (minutes.toString().length === 1) {
		minutes = "0" + minutes;
	}

	return minutes;
};

let formatSeconds = (seconds: number | string) => {
	if (seconds.toString().length === 1) {
		seconds = "0" + seconds;
	}

	return seconds;
};

let convertMiliseconds = (miliseconds: number, format: string) => {
	let formattedTime = format;
	let formats = format.split(regExp);
	let days = 0;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;

	let totalSeconds: number = Math.floor(miliseconds / 1000);
	let totalMinutes: number = Math.floor(totalSeconds / 60);
	let totalHours: number = Math.floor(totalMinutes / 60);

	days = Math.floor(totalHours / 24);

	seconds = totalSeconds % 60;
	minutes = totalMinutes % 60;
	hours = totalHours % 24;

	formats.map((value) => {
		if (value.indexOf("D") !== -1 || value.indexOf("d") !== -1) {
			formattedTime = formattedTime.replace(value, days.toString());
		} else if (value.indexOf("H") !== -1 || value.indexOf("h") !== -1) {
			formattedTime = formattedTime.replace(value, hours.toString());
		} else if (value.indexOf("m") !== -1) {
			formattedTime = formattedTime.replace(value, minutes.toString());
		} else if (value.indexOf("s") !== -1) {
			formattedTime = formattedTime.replace(
				value,
				formatSeconds(seconds).toString()
			);
		}
	});

	return formattedTime;
};
