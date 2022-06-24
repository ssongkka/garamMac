package com.garam.Utils;

import java.time.LocalDate;
import java.time.Period;

public class Utils {
	static public String getAge(String date) {

		String rtn = "";

		if (date == null || date.equals("")) {
			rtn = "";
		} else {
			String[] arr = date.split("-");

			LocalDate today = LocalDate.now();
			LocalDate hiredDate = LocalDate.of(Integer.parseInt(arr[0]), Integer.parseInt(arr[1]),
					Integer.parseInt(arr[2]));

			Period period = hiredDate.until(today);

			rtn = "만 " + period.getYears() + "세";
		}

		return rtn;
	}

	static public String getYearMonth(String date) {

		String rtn = "";

		if (date == null || date.equals("")) {
			rtn = "";
		} else {
			String[] arr = date.split("-");

			LocalDate today = LocalDate.now();
			LocalDate hiredDate = LocalDate.of(Integer.parseInt(arr[0]), Integer.parseInt(arr[1]),
					Integer.parseInt(arr[2]));

			Period period = hiredDate.until(today);

			if (period.getYears() > 0) {
				rtn = period.getYears() + "년 " + period.getMonths() + "개월";
			} else {
				rtn = period.getMonths() + "개월";
			}

		}

		return rtn;
	}

	static public String getFileName(String name, String unique) {
		String rtn;

		String fileN1 = name.replaceAll("\\\\", ",");
		String[] fileN2 = fileN1.split(",");
		String fileN3 = fileN2[fileN2.length - 1];
		String[] fileN4 = fileN3.split("\\.");
		String fileN5 = fileN4[fileN4.length - 1];

		rtn = unique + "." + fileN5;

		return rtn;
	}

	static public String splitVehicle(String vehicle) {

		int nnn = vehicle.length();

		String rtn = vehicle.substring(nnn - 4);

		return rtn;
	}

	static public String coma_Money_Int(int money) {
		String str = Integer.toString(money);
		String combine = str;
		String coma1;
		String coma2;
		String coma3;
		String coma4;

		if (money >= 0) {
			if (!Integer.toString(money).contains(",")) {
				switch (str.length()) {

				case 4:
					coma1 = str.substring(0, 1);
					coma2 = str.substring(1);
					combine = coma1 + "," + coma2;

					break;

				case 5:
					coma1 = str.substring(0, 2);
					coma2 = str.substring(2, 5);
					combine = coma1 + "," + coma2;

					break;

				case 6:
					coma1 = str.substring(0, 3);
					coma2 = str.substring(3);
					combine = coma1 + "," + coma2;

					break;

				case 7:
					coma1 = str.substring(0, 1);
					coma2 = str.substring(1, 4);
					coma3 = str.substring(4);
					combine = coma1 + "," + coma2 + "," + coma3;
					break;
				case 8:
					coma1 = str.substring(0, 2);
					coma2 = str.substring(2, 5);
					coma3 = str.substring(5);
					combine = coma1 + "," + coma2 + "," + coma3;
					break;
				case 9:
					coma1 = str.substring(0, 3);
					coma2 = str.substring(3, 6);
					coma3 = str.substring(6);
					combine = coma1 + "," + coma2 + "," + coma3;
					break;
				case 10:
					coma1 = str.substring(0, 1);
					coma2 = str.substring(1, 4);
					coma3 = str.substring(4, 7);
					coma4 = str.substring(7);
					combine = coma1 + "," + coma2 + "," + coma3 + "," + coma4;
					break;
				case 11:
					coma1 = str.substring(0, 2);
					coma2 = str.substring(2, 5);
					coma3 = str.substring(5, 8);
					coma4 = str.substring(8);
					combine = coma1 + "," + coma2 + "," + coma3 + "," + coma4;
					break;
				case 12:
					coma1 = str.substring(0, 3);
					coma2 = str.substring(3, 6);
					coma3 = str.substring(6, 9);
					coma4 = str.substring(9);
					combine = coma1 + "," + coma2 + "," + coma3 + "," + coma4;
					break;
				default:
					combine = str;
					break;
				}
			}
		}

		if (money < 0) {
			if (!Integer.toString(money).contains(",")) {
				String[] tmp_arr = combine.split("-");
				for (int i = 1; i < tmp_arr.length; i++) {
					str = tmp_arr[i];
				}

				switch (str.length()) {

				case 4:
					coma1 = str.substring(0, 1);
					coma2 = str.substring(1);
					combine = "-" + coma1 + "," + coma2;

					break;

				case 5:
					coma1 = str.substring(0, 2);
					coma2 = str.substring(2, 5);
					combine = "-" + coma1 + "," + coma2;

					break;

				case 6:
					coma1 = str.substring(0, 3);
					coma2 = str.substring(3);
					combine = "-" + coma1 + "," + coma2;

					break;

				case 7:
					coma1 = str.substring(0, 1);
					coma2 = str.substring(1, 4);
					coma3 = str.substring(4);
					combine = "-" + coma1 + "," + coma2 + "," + coma3;
					break;
				case 8:
					coma1 = str.substring(0, 2);
					coma2 = str.substring(2, 5);
					coma3 = str.substring(5);
					combine = "-" + coma1 + "," + coma2 + "," + coma3;
					break;
				case 9:
					coma1 = str.substring(0, 3);
					coma2 = str.substring(3, 6);
					coma3 = str.substring(6);
					combine = "-" + coma1 + "," + coma2 + "," + coma3;
					break;
				case 10:
					coma1 = str.substring(0, 1);
					coma2 = str.substring(1, 4);
					coma3 = str.substring(4, 7);
					coma4 = str.substring(7);
					combine = "-" + coma1 + "," + coma2 + "," + coma3 + "," + coma4;
					break;
				case 11:
					coma1 = str.substring(0, 2);
					coma2 = str.substring(2, 5);
					coma3 = str.substring(5, 8);
					coma4 = str.substring(8);
					combine = "-" + coma1 + "," + coma2 + "," + coma3 + "," + coma4;
					break;
				case 12:
					coma1 = str.substring(0, 3);
					coma2 = str.substring(3, 6);
					coma3 = str.substring(6, 9);
					coma4 = str.substring(9);
					combine = "-" + coma1 + "," + coma2 + "," + coma3 + "," + coma4;
					break;
				default:
					combine = "-" + str;
					break;
				}
			}
		}
		return combine;
	}

	static public String coma_Money_Str(String money) {
		String combine = money;
		String coma1;
		String coma2;
		String coma3;
		String coma4;
		if (!money.contains(",")) {
			if (money != null && money.length() > 0) {
				if (Integer.parseInt(money) >= 0) {
					if (!money.contains(",")) {
						switch (money.length()) {

						case 4:
							coma1 = money.substring(0, 1);
							coma2 = money.substring(1);
							combine = coma1 + "," + coma2;
							break;
						case 5:
							coma1 = money.substring(0, 2);
							coma2 = money.substring(2, 5);
							combine = coma1 + "," + coma2;
							break;
						case 6:
							coma1 = money.substring(0, 3);
							coma2 = money.substring(3);
							combine = coma1 + "," + coma2;
							break;
						case 7:
							coma1 = money.substring(0, 1);
							coma2 = money.substring(1, 4);
							coma3 = money.substring(4);
							combine = coma1 + "," + coma2 + "," + coma3;
							break;
						case 8:
							coma1 = money.substring(0, 2);
							coma2 = money.substring(2, 5);
							coma3 = money.substring(5);
							combine = coma1 + "," + coma2 + "," + coma3;
							break;
						case 9:
							coma1 = money.substring(0, 3);
							coma2 = money.substring(3, 6);
							coma3 = money.substring(6);
							combine = coma1 + "," + coma2 + "," + coma3;
							break;
						case 10:
							coma1 = money.substring(0, 1);
							coma2 = money.substring(1, 4);
							coma3 = money.substring(4, 7);
							coma4 = money.substring(7);
							combine = coma1 + "," + coma2 + "," + coma3 + "," + coma4;
							break;
						case 11:
							coma1 = money.substring(0, 2);
							coma2 = money.substring(2, 5);
							coma3 = money.substring(5, 8);
							coma4 = money.substring(8);
							combine = coma1 + "," + coma2 + "," + coma3 + "," + coma4;
							break;
						case 12:
							coma1 = money.substring(0, 3);
							coma2 = money.substring(3, 6);
							coma3 = money.substring(6, 9);
							coma4 = money.substring(9);
							combine = coma1 + "," + coma2 + "," + coma3 + "," + coma4;
							break;
						default:
							combine = money;
							break;
						}
					}
				}
				if (Integer.parseInt(money) < 0) {
					if (!money.contains(",")) {
						money = money.replaceAll("-", "");
						switch (money.length()) {

						case 4:
							coma1 = money.substring(0, 1);
							coma2 = money.substring(1);
							combine = "-" + coma1 + "," + coma2;
							break;
						case 5:
							coma1 = money.substring(0, 2);
							coma2 = money.substring(2, 5);
							combine = "-" + coma1 + "," + coma2;
							break;
						case 6:
							coma1 = money.substring(0, 3);
							coma2 = money.substring(3);
							combine = "-" + coma1 + "," + coma2;
							break;
						case 7:
							coma1 = money.substring(0, 1);
							coma2 = money.substring(1, 4);
							coma3 = money.substring(4);
							combine = "-" + coma1 + "," + coma2 + "," + coma3;
							break;
						case 8:
							coma1 = money.substring(0, 2);
							coma2 = money.substring(2, 5);
							coma3 = money.substring(5);
							combine = "-" + coma1 + "," + coma2 + "," + coma3;
							break;
						case 9:
							coma1 = money.substring(0, 3);
							coma2 = money.substring(3, 6);
							coma3 = money.substring(6);
							combine = "-" + coma1 + "," + coma2 + "," + coma3;
							break;
						case 10:
							coma1 = money.substring(0, 1);
							coma2 = money.substring(1, 4);
							coma3 = money.substring(4, 7);
							coma4 = money.substring(7);
							combine = "-" + coma1 + "," + coma2 + "," + coma3 + "," + coma4;
							break;
						case 11:
							coma1 = money.substring(0, 2);
							coma2 = money.substring(2, 5);
							coma3 = money.substring(5, 8);
							coma4 = money.substring(8);
							combine = "-" + coma1 + "," + coma2 + "," + coma3 + "," + coma4;
							break;
						case 12:
							coma1 = money.substring(0, 3);
							coma2 = money.substring(3, 6);
							coma3 = money.substring(6, 9);
							coma4 = money.substring(9);
							combine = "-" + coma1 + "," + coma2 + "," + coma3 + "," + coma4;
							break;
						default:
							combine = money;
							break;
						}
					}
				}
			}
		} else {
			return money;
		}
		return combine;
	}
}
