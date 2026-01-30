import { getBankByYear, GetBankDataType } from "@/app/action/bank-data-actions";
import { getYearMonthlyAverageBNM } from "@/app/action/get-currency-year";
// import { getTodayEurRateBNM } from "@/app/action/get-current-currency";
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

  const [data, initialState, bankByYear, currencyRates] = await Promise.all([
    getExpenseByYear(year),
    getInitialState(year),
    getBankByYear(year),
    getYearMonthlyAverageBNM(Number(year)),
  ]);

  return (
    <YearPage
      data={data as GetExpenseDataType[]}
      year={year}
      currency={currency as "USD" | "EUR" | "MDL"}
      initialState={initialState as InitialStateFormType}
      bankData={bankByYear as GetBankDataType[]}
      currencyRates={currencyRates}
    />
  );
}
