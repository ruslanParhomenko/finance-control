import { getBankByYear } from "@/app/action/bank-data-actions";
import { getCurrencyData } from "@/app/action/get-currency";

import { getInitialState } from "@/app/action/initial-state-actions";
import { getExpenseByYear } from "@/app/action/month-data-actions";
import HomePage from "@/features/home/home-page";
import { ParamsValue } from "@/type/params-value";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const paramsValue = (await searchParams) as ParamsValue;
  const { month, year, currency } = paramsValue;
  if (!month || !year || !currency) return;
  const [expenseData, initialState, bankByYear, currencyData] =
    await Promise.allSettled([
      getExpenseByYear(year),
      getInitialState(year),
      getBankByYear(year),
      getCurrencyData(Number(year)),
    ]);

  return (
    <Suspense fallback={null}>
      <HomePage
        paramsValue={paramsValue}
        expenseData={
          expenseData.status === "fulfilled" ? expenseData.value : null
        }
        initialState={
          initialState.status === "fulfilled" ? initialState.value : null
        }
        bankByYear={bankByYear.status === "fulfilled" ? bankByYear.value : null}
        currencyData={
          currencyData.status === "fulfilled" ? currencyData.value : null
        }
      />
    </Suspense>
  );
}
