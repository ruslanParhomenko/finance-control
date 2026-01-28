import { getBankByYear, GetBankDataType } from "@/app/action/bank-data-actions";
import { getYearMonthlyAverageBNM } from "@/app/action/get-currency-year";
import { getTodayEurRateBNM } from "@/app/action/get-current-currency";
import { getInitialState } from "@/app/action/initial-state-actions";
import {
  getExpenseByYear,
  GetExpenseDataType,
} from "@/app/action/month-data-actions";
import { InitialStateFormType } from "@/features/initial-state/schema";
import YearPage from "@/features/year/year-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { month, year, currency } = await searchParams;
  if (!month || !year) return;

  const [
    data,
    initialState,
    bankByYear,
    [avgMDLtoEUR, avgMDLtoUSD],
    [currentRatesEUR, currentRatesUSD],
  ] = await Promise.all([
    getExpenseByYear(year),
    getInitialState(year),
    getBankByYear(year),
    Promise.all([
      getYearMonthlyAverageBNM(Number(year), "EUR"),
      getYearMonthlyAverageBNM(Number(year), "USD"),
    ]),
    Promise.all([getTodayEurRateBNM("EUR"), getTodayEurRateBNM("USD")]),
  ]);

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
      initialState={initialState as InitialStateFormType}
      bankData={bankByYear as GetBankDataType[]}
    />
  );
}
