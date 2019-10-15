<?php 
/*
	Author: Branislav Markovic
	Github URL: https://branislav-markovic.github.io/ 
*/

class EasterCalculate {
	private $year;
	private $chechDate;
	
	public function __construct($year = "") {
		//default => set to current year
		if ($year == "") {
			$year = date("Y");
		}
		
		$this->year = $year;
		
		//year must contain 4 digits
		$this->chechDate = "/^[0-9]{4}$/";
		
		try {
			if (!preg_match($this->chechDate, $this->year) || strlen($this->year) != 4) {
				$this->year = "";
				throw new Exception("Enter valid year", 4011);
				exit;
			}
		} catch(Exception $e) {
			echo $e->getMessage() . "<br>";
		}
	}
	
	//orthodox easter
	private function orthodoxEaster() {
		//Julian Calendar
		$M = 15;
		$N = 6;
		$G = $this->year;
		$a = $G % 19;
		$b = $G % 4;
		$c = $G % 7;
		$d = (19 * $a + $M) % 30;
		$e = (2 * $b + 4 * $c + 6 * $d + $N) % 7;
		$month = 4;
		$date = $d + $e - 9; //april

		if ($d + $e < 10) {
			$date = $d + $e + 22; //march
			$month = 3;
		}

		/* special cases */
		// if 26 april => 19 april 
		// if 25 april && d = 28 && e = 6 && a > 10 => 18 april
		
		if ($date == 26 && $month == 4) {
			$date = 19;
		} else if ($date == 25 && $d == 28 && $e == 6 && $a > 10) {
			$date = 18;
		}
		
		/* end special cases */

		//convert to Gregorian date
		$finalDate = date("Y-m-d", strtotime($G . "-" . $month . "-" . $date));
		$date = date("Y-m-d", strtotime($finalDate . " + 13 days"));

		return $date;
	}
	
	//catholic easter
	private function catholicEaster() {
		//M and N depending on range of years
		//Gregorian calendar
		if ($this->year >= 1583 && $this->year <= 1699) {
			$M = 22;
			$N = 2;
		} else if ($this->year >= 1700 && $this->year <= 1799) {
			$M = 23;
			$N = 3;
		} else if ($this->year >= 1800 && $this->year <= 1899) {
			$M = 23;
			$N = 4;
		} else if ($this->year >= 1900 && $this->year <= 2099) {
			$M = 24;
			$N = 5;
		} else if ($this->year >= 2100 && $this->year <= 2199) {
			$M = 24;
			$N = 6;
		} else if ($this->year >= 2200 && $this->year <= 2299) {
			$M = 25;
			$N = 0;
		}

		$G = $this->year;
		$a = $G % 19;
		$b = $G % 4;
		$c = $G % 7;
		$d = (19 * $a + $M) % 30;
		$e = (2 * $b + 4 * $c + 6 * $d + $N) % 7;
		$month = 4;
		$date = $d + $e - 9; //april

		if ($d + $e < 10) {
			$date = $d + $e + 22; //march
			$month = 3;
		}

		/* special cases */
		// if 26 april => 19 april 
		// if 25 april && d = 28 && e = 6 && a > 10 => 18 april
		
		if ($date == 26 && $month == 4) {
			$date = 19;
		} else if ($date == 25 && $d == 28 && $e == 6 && $a > 10) {
			$date = 18;
		}
		
		/* end special cases */

		$finalDate = $G . "-" . $month . "-" . $date;
		$date = date("Y-m-d", strtotime($finalDate));
		
		return $date;
	}
	
	public function returnEasterDates() {
		if ($this->year == "") {
			return false;
		}
		
		return [
			"catholicEaster" => $this->catholicEaster(),
			"orthodoxEaster" => $this->orthodoxEaster()
		];
	}
}

$easterCalc = new EasterCalculate(2019);
$dates = $easterCalc->returnEasterDates();

var_dump($dates);