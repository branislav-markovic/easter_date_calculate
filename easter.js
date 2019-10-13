/*
	Author: Branislav Markovic
	Github URL: https://branislav-markovic.github.io/ 
*/

function dateEasterCalculate(year = new Date().getFullYear()) {
	//year must contain 4 digits
	var chechDate = /^[0-9]{4}$/;
	
	if (!chechDate.test(year) || year.toString().length != 4) {
		alert("Enter valid year");
		
		return false;
	}
	
	return {
		orthodox : orthodoxEaster(year),
		catholic : catholicEaster(year)
	}
	
	//orthodox    catholic
	//28.04.2019 21.04.2019
	//19.04.2020 12.04.2020
	//02.05.2021 04.04.2021
	//24.04.2022 17.04.2022
	//16.04.2023 09.04.2023
}

//orthodox easter
function orthodoxEaster(year) {
	//Julian Calendar
	var M = 15,
		N = 6,
		G = year,
		a = G % 19,
		b = G % 4,
		c = G % 7,
		d = (19 * a + M) % 30,
		e = (2 * b + 4 * c + 6 * d + N) % 7,
		month = 4,
		date = d + e - 9; //april

	if (d + e < 10) {
		date = d + e + 22; //march
		month = 3;
	}

	/* special cases */
	// if 26 april => 19 april 
	// if 25 april && d = 28 && e = 6 && a > 10 => 18 april
	
	if (date == 26 && month == 4) {
		date = 19;
	} else if (date == 25 && d == 28 && e == 6 && a > 10) {
		date = 18;
	}
	
	/* end special cases */

	//convert to Gregorian date
	date = new Date(G + "-" + month + "-" + date);
	date.setDate(date.getDate() + 13);

	return date;
}

//catholic easter
function catholicEaster(year) {
	//M and N depending on range of years
	//Gregorian calendar
	if (year >= 1583 && year <= 1699) {
		var M = 22,
			N = 2;
	} else if (year >= 1700 && year <= 1799) {
		var M = 23,
			N = 3;
	} else if (year >= 1800 && year <= 1899) {
		var M = 23,
			N = 4;
	} else if (year >= 1900 && year <= 2099) {
		var M = 24,
			N = 5;
	} else if (year >= 2100 && year <= 2199) {
		var M = 24,
			N = 6;
	} else if (year >= 2200 && year <= 2299) {
		var M = 25,
			N = 0;
	}

	var G = year,
		a = G % 19,
		b = G % 4,
		c = G % 7,
		d = (19 * a + M) % 30,
		e = (2 * b + 4 * c + 6 * d + N) % 7,
		month = 4,
		date = d + e - 9; //april

	if (d + e < 10) {
		date = d + e + 22; //march
		month = 3;
	}

	/* special cases */
	// if 26 april => 19 april 
	// if 25 april && d = 28 && e = 6 && a > 10 => 18 april
	
	if (date == 26 && month == 4) {
		date = 19;
	} else if (date == 25 && d == 28 && e == 6 && a > 10) {
		date = 18;
	}
	
	/* end special cases */

	date = new Date(G + "-" + month + "-" + date);

	return date;
}

console.log(dateEasterCalculate());
console.log(dateEasterCalculate(2020));
console.log(dateEasterCalculate(2021));
console.log(dateEasterCalculate(2022));
console.log(dateEasterCalculate(2023));