/*
	Author: Branislav Markovic
	Github URL: https://branislav-markovic.github.io/ 
*/

DROP PROCEDURE IF EXISTS returnEasterDates;

DELIMITER $$
CREATE PROCEDURE returnEasterDates(IN yearParam VARCHAR(4))
BEGIN

	IF yearParam = "" THEN
		SET @G = YEAR(CURDATE());
	ELSE
		SET @G = yearParam;
	END IF;

	-- orthodox easter
	-- formula default d + e − 9  mesec april
	-- formula condition d + e < 10 = (d + e + 22)  march
	-- Julian Calendar
	
	SET @M = 15, 
		 @N = 6,
		 @a = @G % 19,
		 @b = @G % 4,
		 @c = @G % 7,
		 @d = (19 * @a + @M) % 30,
		 @e = (2 * @b + 4 * @c + 6 * @d + @N) % 7,
		 @monthFixed = 4, -- april
		 @sumCalc = @d + @e,
		 @finalDateOrthodox = "",
		 @dayJulian = @d + @e - 9;
		 
	IF @sumCalc < 10 THEN
		SET @dayJulian = @d + @e + 22;
		SET @monthFixed = 3; -- march
	END IF;
	
	
	/* special cases */
	-- if 26 april => 19 april 
	-- if 25 april && d = 28 && e = 6 && a > 10 => 18 april
	
	IF @dayJulian = 26 AND @monthFixed = 4 THEN
		SET @dayJulian = 19;
	ELSEIF @dayJulian = 25 AND @d = 28 AND @e = 6 AND @a > 10 THEN
		SET @dayJulian = 18;
	END IF;
	
	/* end special cases */
	
	-- convert to Gregorian date
	SET @finalDateOrthodox = DATE_ADD(CONCAT(@G, '-', @monthFixed, '-', @dayJulian), INTERVAL 13 DAY);
	 
	-- catholic easter
	-- M and N depending on range of years
	-- Gregorian calendar
	
	IF @G BETWEEN 1583 AND 1699 THEN
		SET @M = 22,
			 @N = 2;
	ELSEIF @G BETWEEN 1700 AND 1799 THEN
		SET @M = 23,
			 @N = 3;
	ELSEIF @G BETWEEN 1800 AND 1899 THEN
		SET @M = 23,
			 @N = 4;
	ELSEIF @G BETWEEN 1900 AND 2099 THEN
		SET @M = 24,
			 @N = 5;
	ELSEIF @G BETWEEN 2100 AND 2199 THEN
		SET @M = 24,
			 @N = 6;
	ELSEIF @G BETWEEN 2200 AND 2299 THEN
		SET @M = 25,
			 @N = 0;
	END IF;
	
	SET @d = (19 * @a + @M) % 30,
		 @e = (2 * @b + 4 * @c + 6 * @d + @N) % 7,
		 @monthFixed = 4, -- april
		 @sumCalc = @d + @e,
		 @finalDateCat = "",
		 @dayGregorian = @d + @e - 9;
		 
	IF @sumCalc < 10 THEN
		SET @dayGregorian = @d + @e + 22;
		SET @monthFixed = 3; -- march
	END IF;
	
	/* special cases */
	-- if 26 april => 19 april 
	-- if 25 april && d = 28 && e = 6 && a > 10 => 18 april
	
	IF @dayGregorian = 26 AND @monthFixed = 4 THEN
		SET @dayGregorian = 19;
	ELSEIF @dayGregorian = 25 AND @d = 28 AND @e = 6 AND @a > 10 THEN
		SET @dayGregorian = 18;
	END IF;
	
	/* end special cases */

	SET @finalDateCat = DATE(CONCAT(@G, '-', @monthFixed, '-', @dayGregorian));
	
	 
	SELECT @finalDateOrthodox AS 'pravoslavni', @finalDateCat AS 'katolicki';
	 
END$$

DELIMITER ;

-- tests
/*
CALL checkReligionDays("");
CALL checkReligionDays(2020);
CALL checkReligionDays(2021);
CALL checkReligionDays(2022);
CALL checkReligionDays(2023);
CALL checkReligionDays(2024);
CALL checkReligionDays(2025);
CALL checkReligionDays(2026);
CALL checkReligionDays(2027);
CALL checkReligionDays(2028);
*/

/*
CALL checkReligionDays(2029);
CALL checkReligionDays(2030);
*/

/*
CALL checkReligionDays(2031);
CALL checkReligionDays(2032);
CALL checkReligionDays(2033);
CALL checkReligionDays(2034);
CALL checkReligionDays(2035);
CALL checkReligionDays(2036);
CALL checkReligionDays(2037);
CALL checkReligionDays(2038);
CALL checkReligionDays(2039);
CALL checkReligionDays(2040);
*/

/*
CALL checkReligionDays(2041);
CALL checkReligionDays(2042);
CALL checkReligionDays(2043);
CALL checkReligionDays(2044);
CALL checkReligionDays(2045);
CALL checkReligionDays(2046);
CALL checkReligionDays(2047);
CALL checkReligionDays(2048);
CALL checkReligionDays(2049);
CALL checkReligionDays(2050);
*/