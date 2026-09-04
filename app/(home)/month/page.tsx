import { getCurrencyData } from "@/app/action/get-currency";

import { MonthPage } from "@/features/month";
import { getExpenseByYear } from "@/features/month/actions/get-expense";

import { ParamsValue } from "@/type/params-value";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const paramsValue = (await searchParams) as ParamsValue;
  const { month, year, currency, mode } = paramsValue;
  if (!month || !year || !currency || !mode) return;
  const [expenseData, currencyData] = await Promise.all([
    getExpenseByYear(year),
    getCurrencyData(Number(year)),
  ]);

  const indexMonth = Number(month) - 1;
  const expenseDataByMonth =
    expenseData?.find((item) => item.id === month) || null;
  const currencyRatesByMonth = {
    USD: currencyData?.USD?.find((_i, index) => index === indexMonth)!,
    EUR: currencyData?.EUR?.find((_i, index) => index === indexMonth)!,
    MDL: currencyData?.MDL?.find((_i, index) => index === indexMonth)!,
  };

  if (!expenseData || !currencyData) return null;

  return (
    <MonthPage
      paramsValue={paramsValue}
      expenseDataByMonth={expenseDataByMonth}
      currencyRatesByMonth={currencyRatesByMonth}
      mode={mode}
    />
  );
}
