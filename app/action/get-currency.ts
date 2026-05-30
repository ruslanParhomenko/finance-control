"use server";

import { unstable_cache } from "next/cache";
import { MONTHS } from "@/utils/get-month-days";
import { CurrencyData } from "@/type/currency-data";

import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: true,
});

function parseBnmXml(xml: string, currency: string): number | null {
  const data = parser.parse(xml);

  const volutes = data?.ValCurs?.Valute;
  if (!volutes) return null;

  const item = volutes.find((v: any) => v.CharCode === currency);

  if (!item?.Value) return null;

  return Number(String(item.Value).replace(",", "."));
}

async function fetchYearMonthlyAverageBNM(year: number): Promise<CurrencyData> {
  const now = new Date();

  const result: CurrencyData = {
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

    const endDate =
      year === now.getFullYear() && month === now.getMonth() + 1
        ? now
        : new Date(year, month, 0);

    const ratesUSD: number[] = [];
    const ratesEUR: number[] = [];

    // ⚡ CHANGE: step = 7 days
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 7)
    ) {
      const day = String(d.getDate()).padStart(2, "0");
      const m = String(d.getMonth() + 1).padStart(2, "0");

      const date = `${day}.${m}.${d.getFullYear()}`;

      try {
        const res = await fetch(
          `https://www.bnm.md/ru/official_exchange_rates?get_xml=1&date=${date}`,
        );

        if (!res.ok) continue;

        const xml = await res.text();

        const rateUSD = parseBnmXml(xml, "USD");
        const rateEUR = parseBnmXml(xml, "EUR");

        if (rateUSD) ratesUSD.push(rateUSD);
        if (rateEUR) ratesEUR.push(rateEUR);
      } catch {
        continue;
      }
    }

    if (ratesUSD.length === 0 || ratesEUR.length === 0) {
      result.EUR.push(1);
      result.USD.push(1);
      continue;
    }

    const averageUSD =
      ratesUSD.reduce((sum, r) => sum + r, 0) / ratesUSD.length;

    const averageEUR =
      ratesEUR.reduce((sum, r) => sum + r, 0) / ratesEUR.length;

    result.USD.push(Number(averageUSD.toFixed(2)) || 1);
    result.EUR.push(Number(averageEUR.toFixed(2)) || 1);
  }

  return result;
}

export const getCurrencyData = unstable_cache(
  fetchYearMonthlyAverageBNM,
  ["bnm-year-average"],
  {
    revalidate: 60 * 60 * 24,
  },
);
