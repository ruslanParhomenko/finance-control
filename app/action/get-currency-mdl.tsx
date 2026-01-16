// app/actions/getMonthlyAverageBNM.ts
"use server";

type BnmRate = {
  CharCode: string;
  Value: string;
};

function parseBnmXml(xml: string, currency: string): number | null {
  const regex = new RegExp(
    `<CharCode>${currency}</CharCode>[\\s\\S]*?<Value>([\\d,.]+)</Value>`,
  );

  const match = xml.match(regex);
  if (!match) return null;

  return Number(match[1].replace(",", "."));
}

export async function getMonthlyAverageBNM(
  yearMonth: string, // "2026-1"
  currency: "EUR" | "USD" | string,
): Promise<number> {
  const [yearStr, monthStr] = yearMonth.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);

  if (!year || !month || month < 1 || month > 12) {
    throw new Error("Invalid format. Expected YYYY-M");
  }

  const now = new Date();
  const startDate = new Date(year, month - 1, 1);

  if (startDate > now) {
    throw new Error("BNM does not provide future exchange rates");
  }

  const endDate =
    year === now.getFullYear() && month === now.getMonth() + 1
      ? now
      : new Date(year, month, 0);

  const rates: number[] = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const day = String(d.getDate()).padStart(2, "0");
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const date = `${day}.${m}.${d.getFullYear()}`;

    const res = await fetch(
      `https://www.bnm.md/ru/official_exchange_rates?get_xml=1&date=${date}`,
      {
        // кэш на сутки — MUST HAVE
        next: { revalidate: 86400 },
      },
    );

    if (!res.ok) continue;

    const xml = await res.text();
    const rate = parseBnmXml(xml, currency);

    if (rate) {
      rates.push(rate);
    }
  }

  if (rates.length === 0) {
    throw new Error(`No BNM data for ${currency} in ${yearMonth}`);
  }

  const average = rates.reduce((sum, r) => sum + r, 0) / rates.length;

  return Number(average.toFixed(4));
}
