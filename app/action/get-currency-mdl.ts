"use server";

import { CurrencyData } from "@/type/currency-data";
import { unstable_cache } from "next/cache";

function parseBnmXml(xml: string, currency: string): number | null {
  const regex = new RegExp(
    `<CharCode>${currency}</CharCode>[\\s\\S]*?<Value>([\\d,.]+)</Value>`,
  );

  const match = xml.match(regex);
  if (!match) return null;

  return Number(match[1].replace(",", "."));
}

async function fetchMonthlyAverageBNM(
  yearMonth: string,
): Promise<CurrencyData> {
  const [yearStr, monthStr] = yearMonth.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);

  if (!year || !month || month < 1 || month > 12) {
    throw new Error("Invalid format. Expected YYYY-M");
  }

  const now = new Date();
  const startDate = new Date(year, month - 1, 1);

  if (startDate > now) {
    return { USD: 1, EUR: 1, MDL: 1 };
  }

  const endDate =
    year === now.getFullYear() && month === now.getMonth() + 1
      ? now
      : new Date(year, month, 0);

  const ratesUSD: number[] = [];
  const ratesEUR: number[] = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const day = String(d.getDate()).padStart(2, "0");
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const date = `${day}.${m}.${d.getFullYear()}`;

    const res = await fetch(
      `https://www.bnm.md/ru/official_exchange_rates?get_xml=1&date=${date}`,
    );

    if (!res.ok) continue;

    const xml = await res.text();

    const rateUSD = parseBnmXml(xml, "USD");
    const rateEUR = parseBnmXml(xml, "EUR");

    if (rateUSD) ratesUSD.push(rateUSD);
    if (rateEUR) ratesEUR.push(rateEUR);
  }

  if (ratesUSD.length === 0 || ratesEUR.length === 0) {
    throw new Error(`No BNM data   in ${yearMonth}`);
  }

  const averageUSD = ratesUSD.reduce((sum, r) => sum + r, 0) / ratesUSD.length;

  const averageEUR = ratesEUR.reduce((sum, r) => sum + r, 0) / ratesEUR.length;

  return {
    USD: Number(averageUSD.toFixed(4)),
    EUR: Number(averageEUR.toFixed(4)),
    MDL: 1,
  };
}

export const getMonthlyAverageBNM = unstable_cache(
  fetchMonthlyAverageBNM,
  ["bnm-average"],
  {
    revalidate: 60 * 60 * 24,
  },
);
