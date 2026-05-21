import { getBankByYear } from "@/app/action/bank-data-actions";
import { getCurrencyData } from "@/app/action/get-currency";

import { getInitialState } from "@/app/action/initial-state-actions";
import { getExpenseByYear } from "@/app/action/month-data-actions";
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
  const [expenseData, initialState, bankByYear, currencyData] =
    await Promise.all([
      getExpenseByYear(year),
      getInitialState(year),
      getBankByYear(year),
      getCurrencyData(Number(year)),
    ]);

  return (
    <HomePage
      paramsValue={paramsValue}
      expenseData={expenseData}
      initialState={initialState}
      bankByYear={bankByYear}
      currencyData={currencyData}
    />
  );
}
