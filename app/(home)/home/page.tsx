import {
  getBankByUniqueKey,
  getBankByYear,
} from "@/app/action/bank-data-actions";
import { getMonthlyAverageBNM } from "@/app/action/get-currency-mdl";
import { getYearMonthlyAverageBNM } from "@/app/action/get-currency-year";
import { getInitialState } from "@/app/action/initial-state-actions";
import {
  getExpenseByUniqueKey,
  getExpenseByYear,
} from "@/app/action/month-data-actions";
import HomePage from "@/features/home/home-page";
import { ParamsValue } from "@/type/params-value";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const paramsValue = (await searchParams) as ParamsValue;
  const { month, year, currency } = paramsValue;
  if (!month || !year || !currency) return;
  const uniqueKey = `${year}-${month}`;
  const [
    bankData,
    expenseData,
    currencyRates,
    currencyYear,
    initialState,
    bankByYear,
  ] = await Promise.all([
    getBankByUniqueKey(uniqueKey),
    getExpenseByYear(year),
    getMonthlyAverageBNM(uniqueKey),
    getYearMonthlyAverageBNM(Number(year)),
    getInitialState(year),
    getBankByYear(year),
  ]);

  return (
    <HomePage
      paramsValue={paramsValue}
      expenseData={expenseData}
      bankData={bankData}
      currencyRates={currencyRates}
      currencyYear={currencyYear}
      initialState={initialState}
      bankByYear={bankByYear}
    />
  );
}
