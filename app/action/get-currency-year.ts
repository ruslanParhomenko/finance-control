"use server";

import { MONTHS } from "@/utils/get-month-days";
import { getMonthlyAverageBNM } from "./get-currency-mdl";

export type YearMonthlyRates = {
  EUR: number[];
  USD: number[];
  MDL: number[];
};

export async function getYearMonthlyAverageBNM(
  year: number,
): Promise<YearMonthlyRates> {
  const now = new Date();

  const result: YearMonthlyRates = {
    EUR: [],
    USD: [],
    MDL: Array(12).fill(1),
  };

  for (let i = 0; i < MONTHS.length; i++) {
    const month = Number(MONTHS[i]);
    const startDate = new Date(year, month - 1, 1);

    if (startDate > now) {
      result.EUR.push(1);
      result.USD.push(1);
      continue;
    }

    try {
      const [eur, usd] = await Promise.all([
        getMonthlyAverageBNM(`${year}-${month}`, "EUR"),
        getMonthlyAverageBNM(`${year}-${month}`, "USD"),
      ]);

      result.EUR.push(Number(eur) || 1);
      result.USD.push(Number(usd) || 1);
    } catch {
      result.EUR.push(1);
      result.USD.push(1);
    }
  }

  return result;
}
