import { getBankByYear } from "@/features/bank/actions/get-bank-data";
import { getInitialState } from "@/features/initial-state/actions/get-init-bal";
import { getExpenseByYear } from "@/features/month/actions/get-expense";
import { YearChart } from "@/features/year-chart/ui/year-chart";
import { YearTable } from "@/features/year-table/ui/year-table";
import type { ParamsValue } from "@/type/params-value";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const paramsValue = (await searchParams) as ParamsValue;
  const { month, year, currency, viewMode } = paramsValue;
  if (!month || !year || !currency) return;
  const [expenseData, initialState, bankByYear] = await Promise.allSettled([
    getExpenseByYear(year),
    getInitialState(year),
    getBankByYear(year),
  ]);

  if (viewMode === "chart") {
    return (
      <YearChart
        data={expenseData.status === "fulfilled" ? expenseData.value : null}
        currency={currency}
      />
    );
  }

  if (viewMode === "table") {
    return (
      <YearTable
        expenseData={
          expenseData.status === "fulfilled" ? expenseData.value : null
        }
        paramsValue={paramsValue}
        initialState={
          initialState.status === "fulfilled" ? initialState.value : null
        }
        bankData={bankByYear.status === "fulfilled" ? bankByYear.value : null}
      />
    );
  }

  return null;
}
