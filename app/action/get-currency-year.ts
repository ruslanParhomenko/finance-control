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
      const { EUR, USD } = await getMonthlyAverageBNM(`${year}-${month}`);
      const eur = EUR.toFixed(2);
      const usd = USD.toFixed(2);

      result.EUR.push(Number(eur) || 1);
      result.USD.push(Number(usd) || 1);
    } catch {
      result.EUR.push(1);
      result.USD.push(1);
    }
  }

  return result;
}
