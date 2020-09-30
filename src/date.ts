let dateFormat: string = "";

export class dateObject {
	date: Date;
	constructor(dateString: string) {
		this.date = new Date(dateString);
	}

	regExp: any = /[.\- /:]/;
	midday: string = "";
	allFormats: Array<string> = [
		"YYYY",
		"YY",
		"M",
		"MM",
		"D",
		"DD",
		"d",
		"ddd",
		"dddd",
		"H",
		"HH",
		"h",
		"hh",
		"m",
		"mm",
		"s",
		"ss",
	];

	format(formatString?: string) {
		let defaultLocaleFormat = dateFormat ? dateFormat : "MM/DD/YYYY";
		let format = formatString ? formatString : defaultLocaleFormat;
		let formats = format.split(this.regExp);
		let newDate = format;
		this.allFormats.map((value) => {
			if (formats.indexOf(value) !== -1) {
				let newValue: any = this.formatValue(this.date, value);
				newDate = newDate.replace(value, newValue);
			}
		});

		if (formatString.indexOf("HH") !== -1) {
			newDate = `${newDate} ${this.midday}`;
		}

		return newDate;
	}

	isDateAfter(compareTo: string | Date) {
		let secondDate = this.checkAndReturnDate(compareTo);

		return this.date.getTime() > secondDate.getTime();
	}

	isDateBefore(compareTo: string | Date) {
		let secondDate = this.checkAndReturnDate(compareTo);

		return this.date.getTime() < secondDate.getTime();
	}

	timeDifference(compareTo: string | Date, format: string) {
		let secondDate = this.checkAndReturnDate(compareTo);
		let milliseconds = this.date.getTime() - secondDate.getTime();

		return this.convertMiliseconds(milliseconds, format);
	}

	checkAndReturnDate(date: string | Date) {
		let newDate = typeof date === "string" ? new Date(date) : date;

		return newDate;
	}

	formatValue(date: Date, format: string) {
		let value: string | number = "";
		if (this.includes(format, "Y")) {
			value = this.formatYear(date.getFullYear(), format);
		} else if (this.includes(format, "M")) {
			value = this.formatMonth(date.getMonth());
		} else if (this.includes(format, "D") || this.includes(format, "d")) {
			value = this.formatDay(date, format);
		} else if (this.includes(format, "H") || this.includes(format, "h")) {
			value = this.formatHours(date.getHours(), format);
		} else if (this.includes(format, "m")) {
			value = this.formatMinutes(date.getMinutes());
		} else if (this.includes(format, "s")) {
			value = this.formatSeconds(date.getSeconds());
		}

		return value;
	}

	formatYear(year: number, format: string) {
		let formattedYear = year.toString();

		if (format.length === 2) {
			return formattedYear.substring(2, 4);
		} else {
			return formattedYear;
		}
	}

	formatMonth(month: number) {
		month = month + 1;

		let returnMonthValue = month.toString();

		if (returnMonthValue.length === 1) {
			returnMonthValue = "0" + returnMonthValue;
		}

		return returnMonthValue;
	}

	formatDay(date: Date, format: string) {
		let day = "";

		if (format === "ddd" || format === "dddd") {
			day = `0${date.getDay() + 1}`;
		} else if (format === "D" || format === "DD") {
			day = date.getDate().toString();
		}

		return day;
	}

	formatHours(hours: number, format: string) {
		if (format !== "HH") {
			this.midday = hours >= 12 ? "PM" : "AM";
			hours = hours % 12 || 12;
		}

		return hours.toString();
	}

	formatMinutes(minutes: number | string) {
		if (minutes.toString().length === 1) {
			minutes = "0" + minutes;
		}

		return minutes;
	}

	formatSeconds(seconds: number | string) {
		if (seconds.toString().length === 1) {
			seconds = "0" + seconds;
		}

		return seconds;
	}

	convertMiliseconds(miliseconds: number, format: string) {
		let time = format;
		let formats = format.split(this.regExp);
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
			if (this.includes(value, "D") || this.includes(value, "d")) {
				time = time.replace(value, days.toString());
			} else if (this.includes(value, "H") || this.includes(value, "h")) {
				time = time.replace(value, hours.toString());
			} else if (this.includes(value, "m")) {
				time = time.replace(value, minutes.toString());
			} else if (this.includes(value, "s")) {
				time = time.replace(value, this.formatSeconds(seconds).toString());
			}
		});

		return time;
	}

	includes(data: string | Array<string>, value: string) {
		return data.indexOf(value) !== -1;
	}
}

export default function date(dateString: string) {
	return new dateObject(dateString);
}

export let setDateFormat = (format: string) => {
	dateFormat = format;
};
