// "use server";

// type FrankfurterResponse = {
//   rates: Record<string, Record<string, number>>;
// };

// export async function getMonthlyAverage(
//   yearMonth: string, // "2026-1"
//   base: string,
//   target: string,
// ): Promise<number> {
//   const [yearStr, monthStr] = yearMonth.split("-");
//   const year = Number(yearStr);
//   const month = Number(monthStr);

//   if (!year || !month || month < 1 || month > 12) {
//     throw new Error("Invalid year-month format. Expected YYYY-M");
//   }

//   // month: 1–12
//   const startDate = new Date(year, month - 1, 1);
//   const endDate = new Date(year, month, 0);

//   const start = startDate.toISOString().slice(0, 10);
//   const end = endDate.toISOString().slice(0, 10);

//   const res = await fetch(
//     `https://api.frankfurter.app/${start}..${end}?from=${base}&to=${target}`,
//     {
//       next: { revalidate: 86400 },
//     },
//   );

//   if (!res.ok) {
//     throw new Error(`Failed to fetch exchange rates: ${res.status}`);
//   }

//   const data: FrankfurterResponse = await res.json();

//   const rates = Object.values(data.rates)
//     .map((r) => r[target])
//     .filter((v): v is number => typeof v === "number");

//   if (rates.length === 0) {
//     throw new Error("No exchange rate data for this month");
//   }

//   const average = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;

//   return Number(average.toFixed(4));
// }
