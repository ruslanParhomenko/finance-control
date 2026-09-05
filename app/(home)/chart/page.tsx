import { getBankByYear } from "@/features/bank/actions/get-bank-data";
import { ChartPage } from "@/features/chart";
import { getExpenseByYear } from "@/features/month/actions/get-expense";
import { ParamsValue } from "@/type/params-value";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const paramsValue = (await searchParams) as ParamsValue;
  const { month, year, currency } = paramsValue;
  if (!month || !year || !currency) return;
  const [expenseData, bankByYear] = await Promise.all([
    getExpenseByYear(year),
    getBankByYear(year),
  ]);

  return (
    <ChartPage
      paramsValue={paramsValue}
      dataBank={bankByYear}
      dataExpense={expenseData}
    />
  );
}
