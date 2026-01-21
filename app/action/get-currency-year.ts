"use server";

import { MONTHS } from "@/utils/get-month-days";
import { getMonthlyAverageBNM } from "./get-currency-mdl";

type MonthlyAverageResult = (number | "")[];

export async function getYearMonthlyAverageBNM(
  year: number,
  currency: "EUR" | "USD" | string,
): Promise<MonthlyAverageResult> {
  const now = new Date();

  const results: MonthlyAverageResult = [];

  for (const month of MONTHS) {
    const monthNumber = Number(month);
    const startDate = new Date(year, monthNumber - 1, 1);

    if (startDate > now) {
      results.push("");
      continue;
    }

    try {
      const average = await getMonthlyAverageBNM(
        `${year}-${monthNumber}`,
        currency,
      );

      results.push(average);
    } catch {
      results.push("");
    }
  }

  return results;
}
