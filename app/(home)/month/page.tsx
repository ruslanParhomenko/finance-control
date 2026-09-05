import { getCurrencyData } from "@/app/action/get-currency";
import { MonthEditPage, MonthViewPage } from "@/features/month";
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

  const expenseData = await getExpenseByYear(year);

  const indexMonth = Number(month) - 1;
  const expenseDataByMonth =
    expenseData?.find((item) => item.id === month) || null;

  if (mode === "edit") {
    const currencyData = await getCurrencyData(Number(year));
    const currencyRatesByMonth = {
      USD: currencyData?.USD?.find((_i, index) => index === indexMonth)!,
      EUR: currencyData?.EUR?.find((_i, index) => index === indexMonth)!,
      MDL: currencyData?.MDL?.find((_i, index) => index === indexMonth)!,
    };
    return (
      <MonthEditPage
        paramsValue={paramsValue}
        expenseDataByMonth={expenseDataByMonth}
        currencyRatesByMonth={currencyRatesByMonth}
      />
    );
  }

  return (
    <MonthViewPage
      paramsValue={paramsValue}
      expenseDataByMonth={expenseDataByMonth}
    />
  );
}
