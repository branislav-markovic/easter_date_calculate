/* in progress ......... */

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

function getHolidayDate(ortEaster, numOfDays, sign = false, setDay = false) {
	let ortDate = new Date(ortEaster);
	
	if (sign) {
		return ortDate.setDate(ortDate.getDate() + numOfDays);
	}
	
	if (setDay) {
		var currentDay = ortDate.getDay();
		var diff;
		
		switch(setDay) {
			case "mitrovdan":
			case "miholjdan":
				if (currentDay != 6) {
					diff = 6 - currentDay;
					
					ortDate.setDate(ortDate.getDate() + diff);
				}
				
			break;
			case "teodor":
				diff = 5;
				ortDate.setDate(ortDate.getDate() + diff);
			break;
			case "oci":
				ortDate.setDate(ortDate.getDate() - currentDay);
			break;
				
		}
	}
	
	return ortDate.setDate(ortDate.getDate() - numOfDays);
}

function holidaysDateCalc(year = new Date().getFullYear()) {
	//get orthodox easter date
	let ortEaster = dateEasterCalculate(year).orthodox;
	var numOfDays;
	
	//holiday => Cveti
	numOfDays = 7;
	var cveti = getHolidayDate(ortEaster, numOfDays);
	
	//holiday => Lazareva subota
	numOfDays = 8;
	var lazarevaSubota = getHolidayDate(ortEaster, numOfDays);
	
	//holiday => Veliki cetvrtak
	numOfDays = 3;
	var velikiCetvrtak = getHolidayDate(ortEaster, numOfDays);
	
	//holiday => Veliki petak
	numOfDays = 2;
	var velikiPetak = getHolidayDate(ortEaster, numOfDays);
	
	//holiday => Velika subota
	numOfDays = 1;
	var velikaSubota = getHolidayDate(ortEaster, numOfDays);
	
	//holiday => Vaskrsni ponedeljak
	numOfDays = 1;
	var vaskrsniPonedeljak = getHolidayDate(ortEaster, numOfDays, true);
	
	//holiday => Vaskrsni utorak
	numOfDays = 2;
	var vaskrsniUtorak = getHolidayDate(ortEaster, numOfDays, true);
	
	//holiday => Spasovdan
	numOfDays = 39;
	var spasovdan = getHolidayDate(ortEaster, numOfDays, true);
	
	//holiday => Pedesetnica, Trojica, Duhovi
	numOfDays = 49;
	var duhovi = getHolidayDate(ortEaster, numOfDays, true);
	
	//holiday => Duhovski ponedeljak
	numOfDays = 1;
	var duhovskiPonedeljak = getHolidayDate(duhovi, numOfDays, true);
	
	//holiday => Duhovski utorak
	numOfDays = 2;
	var duhovskiUtorak = getHolidayDate(duhovi, numOfDays, true);
	
	//holiday => Prvo bdenije
	numOfDays = 11; //sreda
	var prvoBdenije = getHolidayDate(cveti, numOfDays);
	
	//holiday => Drugo bdenije
	numOfDays = 9; //petak
	var drugoBdenije = getHolidayDate(cveti, numOfDays);
	
	//holiday => Veliki post
	numOfDays = 48;
	var velikiPost = getHolidayDate(ortEaster, numOfDays);
	
	//holiday => Teodorova subota
	numOfDays = 0;
	var teodorovaSubota = getHolidayDate(velikiPost, numOfDays, false, "teodor");
	
	//holiday => Bele poklade
	numOfDays = 1;
	var belePoklade = getHolidayDate(velikiPost, numOfDays);
	
	//holiday => Mesne poklade
	numOfDays = 8;
	var mesnePoklade = getHolidayDate(velikiPost, numOfDays);
	
	//holiday => Petrovske poklade
	numOfDays = 7;
	var petrovskePoklade = getHolidayDate(duhovi, numOfDays, true);
	
	//holiday => Zadusnice
	numOfDays = 1;
	var zadusnice = getHolidayDate(mesnePoklade, numOfDays); // velike zimske zadusnice
	
	//holiday => Duhovske zadusnice
	numOfDays = 1;
	var duhovskeZadusnice = getHolidayDate(duhovi, numOfDays);
	
	//holiday => Miholjske zadusnice
	numOfDays = 7;  //subota
	var miholjdan = new Date(ortEaster.getFullYear() + "-10-12");
	var miholjskeZadusnice = getHolidayDate(miholjdan, numOfDays, false, "miholjdan");
	
	//holiday => Mitrovske zadusnice
	numOfDays = 7;  //subota
	var mitrovdan = new Date(ortEaster.getFullYear() + "-11-08");
	var mitrovskeZadusnice = getHolidayDate(mitrovdan, numOfDays, false, "mitrovdan");
	
	//holiday => Oci
	numOfDays = 0; 
	var bozic = new Date(ortEaster.getFullYear() + "-01-07");
	var oci = getHolidayDate(bozic, numOfDays, false, "oci");
	
	//holiday => Materice
	numOfDays = 7; 
	var materice = getHolidayDate(oci, numOfDays);
	
	//holiday => Detinci
	numOfDays = 7; 
	var detinci = getHolidayDate(materice, numOfDays);
	
	return {
		"cveti" : new Date(cveti),
		"lazarevaSubota" : new Date(lazarevaSubota),
		"velikiCetvrtak" : new Date(velikiCetvrtak),
		"velikiPetak" : new Date(velikiPetak),
		"velikaSubota" : new Date(velikaSubota),
		"vaskrsniPonedeljak" : new Date(vaskrsniPonedeljak),
		"vaskrsniUtorak" : new Date(vaskrsniUtorak),
		"spasovdan" : new Date(spasovdan),
		"duhovi" : new Date(duhovi),
		"duhovskiPonedeljak" : new Date(duhovskiPonedeljak),
		"duhovskiUtorak" : new Date(duhovskiUtorak),
		"teodorovaSubota" : new Date(teodorovaSubota),
		"prvoBdenije" : new Date(prvoBdenije),
		"drugoBdenije" : new Date(drugoBdenije),
		"velikiPost" : new Date(velikiPost),
		"belePoklade" : new Date(belePoklade),
		"mesnePoklade" : new Date(mesnePoklade),
		"petrovskePoklade" : new Date(petrovskePoklade),
		"zadusnice" : new Date(zadusnice),
		"duhovskeZadusnice" : new Date(duhovskeZadusnice),
		"miholjskeZadusnice" : new Date(miholjskeZadusnice),
		"mitrovskeZadusnice" : new Date(mitrovskeZadusnice),
		"oci" : new Date(oci),
		"materice" : new Date(materice),
		"detinci" : new Date(detinci)
	};
}

console.log(holidaysDateCalc());