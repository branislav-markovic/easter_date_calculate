<?php 
/* in progress ......... */
require_once("EasterCalculate.php");

class OrthodoxHolidays extends EasterCalculate {
	private function getHolidayDate($ortD, $numOfDays, $sign = false, $setDay = false) {
		$ortDate = date("Y-m-d", strtotime($ortD));
		$returnDate = "";
		
		if ($sign) {
			$returnDate = date("Y-m-d", strtotime($ortDate . " + " . $numOfDays . " days"));
			return $returnDate;
		}
		
		if ($setDay) {
			$currentDay = date("N", strtotime($ortDate));
			$diff;
			
			switch($setDay) {
				case "mitrovdan":
				case "miholjdan":
					//must be saturday
					if ($currentDay != 6) {
						$diff = 6 - $currentDay;
						
						if ($currentDay == 7) {
							$diff = 6;
						}
						
						$returnDate = date("Y-m-d", strtotime($ortDate . " + " . $diff . " days"));
					}
					
				break;
				case "teodor":
					$diff = 5;
					$returnDate = date("Y-m-d", strtotime($ortDate . " + " .  $diff . " days"));
				break;
				case "oci":
					$returnDate = date("Y-m-d", strtotime($ortDate . "-" . $currentDay . " days"));
				break;	
			}
		}
		
		if ($returnDate != "") {
			return date("Y-m-d", strtotime($returnDate . " - " . $numOfDays. " days "));
		} 
		
		return date("Y-m-d", strtotime($ortDate . " - " . $numOfDays. " days "));
	}

	public function holidaysDateCalc() {		
		//get orthodox easter date
		$ortEaster = $this->returnEasterDates()["orthodoxEaster"];

		//holiday => Cveti
		$numOfDays = 7;
		$cveti = $this->getHolidayDate($ortEaster, $numOfDays);
		
		//holiday => Lazareva subota
		$numOfDays = 8;
		$lazarevaSubota = $this->getHolidayDate($ortEaster, $numOfDays);
		
		//holiday => Veliki cetvrtak
		$numOfDays = 3;
		$velikiCetvrtak = $this->getHolidayDate($ortEaster, $numOfDays);
		
		//holiday => Veliki petak
		$numOfDays = 2;
		$velikiPetak = $this->getHolidayDate($ortEaster, $numOfDays);
		
		//holiday => Velika subota
		$numOfDays = 1;
		$velikaSubota = $this->getHolidayDate($ortEaster, $numOfDays);
		
		//holiday => Vaskrsni ponedeljak
		$numOfDays = 1;
		$vaskrsniPonedeljak = $this->getHolidayDate($ortEaster, $numOfDays, true);
		
		//holiday => Vaskrsni utorak
		$numOfDays = 2;
		$vaskrsniUtorak = $this->getHolidayDate($ortEaster, $numOfDays, true);
		
		//holiday => Spasovdan
		$numOfDays = 39;
		$spasovdan = $this->getHolidayDate($ortEaster, $numOfDays, true);
		
		//holiday => Pedesetnica, Trojica, Duhovi
		$numOfDays = 49;
		$duhovi = $this->getHolidayDate($ortEaster, $numOfDays, true);
		
		//holiday => Duhovski ponedeljak
		$numOfDays = 1;
		$duhovskiPonedeljak = $this->getHolidayDate($duhovi, $numOfDays, true);
		
		//holiday => Duhovski utorak
		$numOfDays = 2;
		$duhovskiUtorak = $this->getHolidayDate($duhovi, $numOfDays, true);
		
		//holiday => Prvo bdenije
		$numOfDays = 11; //sreda
		$prvoBdenije = $this->getHolidayDate($cveti, $numOfDays);
		
		//holiday => Drugo bdenije
		$numOfDays = 9; //petak
		$drugoBdenije = $this->getHolidayDate($cveti, $numOfDays);
		
		//holiday => Veliki post
		$numOfDays = 48;
		$velikiPost = $this->getHolidayDate($ortEaster, $numOfDays);
		
		//holiday => Teodorova subota
		$numOfDays = 0;
		$teodorovaSubota = $this->getHolidayDate($velikiPost, $numOfDays, false, "teodor");
		
		//holiday => Bele poklade
		$numOfDays = 1;
		$belePoklade = $this->getHolidayDate($velikiPost, $numOfDays);
		
		//holiday => Mesne poklade
		$numOfDays = 8;
		$mesnePoklade = $this->getHolidayDate($velikiPost, $numOfDays);
		
		//holiday => Petrovske poklade
		$numOfDays = 7;
		$petrovskePoklade = $this->getHolidayDate($duhovi, $numOfDays, true);
		
		//holiday => Zadusnice
		$numOfDays = 1;
		$zadusnice = $this->getHolidayDate($mesnePoklade, $numOfDays); // velike zimske zadusnice
		
		//holiday => Duhovske zadusnice
		$numOfDays = 1;
		$duhovskeZadusnice = $this->getHolidayDate($duhovi, $numOfDays);
		
		//holiday => Miholjske zadusnice
		$numOfDays = 7;  //subota
		$miholjdan = date("Y-m-d", strtotime(date("Y", strtotime($ortEaster)) . "-10-12"));
		$miholjskeZadusnice = $this->getHolidayDate($miholjdan, $numOfDays, false, "miholjdan");
		
		//holiday => Mitrovske zadusnice
		$numOfDays = 7;  //subota
		$mitrovdan = date("Y-m-d", strtotime(date("Y", strtotime($ortEaster)) . "-11-08"));
		$mitrovskeZadusnice = $this->getHolidayDate($mitrovdan, $numOfDays, false, "mitrovdan");
		
		//holiday => Oci
		$numOfDays = 0; 
		$bozic = date("Y-m-d", strtotime(date("Y", strtotime($ortEaster)) . "-01-07"));
		$oci = $this->getHolidayDate($bozic, $numOfDays, false, "oci");
		
		//holiday => Materice
		$numOfDays = 7; 
		$materice = $this->getHolidayDate($oci, $numOfDays);
		
		//holiday => Detinci
		$numOfDays = 7; 
		$detinci = $this->getHolidayDate($materice, $numOfDays);
		
		return [
			"cveti" => date("Y-m-d", strtotime($cveti)),
			"lazarevaSubota" => date("Y-m-d", strtotime($lazarevaSubota)),
			"velikiCetvrtak" => date("Y-m-d", strtotime($velikiCetvrtak)),
			"velikiPetak" => date("Y-m-d", strtotime($velikiPetak)),
			"velikaSubota" => date("Y-m-d", strtotime($velikaSubota)),
			"vaskrsniPonedeljak" => date("Y-m-d", strtotime($vaskrsniPonedeljak)),
			"vaskrsniUtorak" => date("Y-m-d", strtotime($vaskrsniUtorak)),
			"spasovdan" => date("Y-m-d", strtotime($spasovdan)),
			"duhovi" => date("Y-m-d", strtotime($duhovi)),
			"duhovskiPonedeljak" => date("Y-m-d", strtotime($duhovskiPonedeljak)),
			"duhovskiUtorak" => date("Y-m-d", strtotime($duhovskiUtorak)),
			"teodorovaSubota" => date("Y-m-d", strtotime($teodorovaSubota)),
			"prvoBdenije" => date("Y-m-d", strtotime($prvoBdenije)),
			"drugoBdenije" => date("Y-m-d", strtotime($drugoBdenije)),
			"velikiPost" => date("Y-m-d", strtotime($velikiPost)),
			"belePoklade" => date("Y-m-d", strtotime($belePoklade)),
			"mesnePoklade" => date("Y-m-d", strtotime($mesnePoklade)),
			"petrovskePoklade" => date("Y-m-d", strtotime($petrovskePoklade)),
			"zadusnice" => date("Y-m-d", strtotime($zadusnice)),
			"duhovskeZadusnice" => date("Y-m-d", strtotime($duhovskeZadusnice)),
			"miholjskeZadusnice" => date("Y-m-d", strtotime($miholjskeZadusnice)),
			"mitrovskeZadusnice" => date("Y-m-d", strtotime($mitrovskeZadusnice)),
			"oci" => date("Y-m-d", strtotime($oci)),
			"materice" => date("Y-m-d", strtotime($materice)),
			"detinci" => date("Y-m-d", strtotime($detinci))
		];
	}
}

$orthodoxHolidays = new OrthodoxHolidays(2022);
$dates = $orthodoxHolidays->holidaysDateCalc();

var_dump($dates);