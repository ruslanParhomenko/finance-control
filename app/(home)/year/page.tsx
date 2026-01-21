import { getYearMonthlyAverageBNM } from "@/app/action/get-currency-year";
import { getTodayEurRateBNM } from "@/app/action/get-current-currency";
import {
  getExpenseByYear,
  GetExpenseDataType,
} from "@/app/action/month-data-actions";
import YearPage from "@/features/year/year-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { month, year, currency } = await searchParams;
  if (!month || !year) return;

  const data = await getExpenseByYear(year);

  const avgMDLtoEUR = await getYearMonthlyAverageBNM(Number(year), "EUR");
  const avgMDLtoUSD = await getYearMonthlyAverageBNM(Number(year), "USD");

  const currentRatesEUR = await getTodayEurRateBNM("EUR");
  const currentRatesUSD = await getTodayEurRateBNM("USD");

  const currencyRates = {
    USD: avgMDLtoUSD,
    EUR: avgMDLtoEUR,
    MDL: [1],
  } as const;
  const currencyArray = currencyRates[
    currency as "USD" | "EUR" | "MDL"
  ] as number[];
  return (
    <YearPage
      data={data as GetExpenseDataType[]}
      year={year}
      currencyRates={currencyArray}
      currency={currency as "USD" | "EUR" | "MDL"}
      currentRatesEUR={currentRatesEUR}
      currentRatesUSD={currentRatesUSD}
    />
  );
}
