import { getBankByYear } from "@/app/action/bank-data-actions";
import { getCurrencyData } from "@/app/action/get-currency";
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
  const [expenseData, bankByYear, currencyData] = await Promise.all([
    getExpenseByYear(year),
    getBankByYear(year),
    getCurrencyData(Number(year)),
  ]);

  return (
    <ChartPage
      paramsValue={paramsValue}
      dataBank={bankByYear}
      dataExpense={expenseData}
      currencyData={currencyData}
    />
  );
}
