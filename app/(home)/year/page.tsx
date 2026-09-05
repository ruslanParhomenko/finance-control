import { getBankByYear } from "@/features/bank/actions/get-bank-data";
import { getInitialState } from "@/features/initial-state/actions/get-init-bal";
import { getExpenseByYear } from "@/features/month/actions/get-expense";
import { YearPage } from "@/features/year";
import { ParamsValue } from "@/type/params-value";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const paramsValue = (await searchParams) as ParamsValue;
  const { month, year, currency } = paramsValue;
  if (!month || !year || !currency) return;
  const [expenseData, initialState, bankByYear] = await Promise.all([
    getExpenseByYear(year),
    getInitialState(year),
    getBankByYear(year),
  ]);

  return (
    <YearPage
      expenseData={expenseData}
      paramsValue={paramsValue}
      initialState={initialState}
      bankData={bankByYear}
    />
  );
}
