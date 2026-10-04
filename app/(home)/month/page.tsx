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

  const [expenseData, currencyData] = await Promise.allSettled([
    getExpenseByYear(year),
    getCurrencyData(Number(year)),
  ]);

  const indexMonth = Number(month) - 1;
  const expenseDataFulfilled =
    expenseData?.status === "fulfilled" ? expenseData.value : null;
  const currencyDataFulfilled =
    currencyData?.status === "fulfilled" ? currencyData.value : null;
  const expenseDataByMonth =
    expenseDataFulfilled?.find((item) => item.id === month) || null;

  if (mode === "edit") {
    const currencyRatesByMonth = {
      USD:
        currencyDataFulfilled?.USD?.find(
          (_i, index) => index === indexMonth,
        )! ?? 18,
      EUR:
        currencyDataFulfilled?.EUR?.find(
          (_i, index) => index === indexMonth,
        )! ?? 20,
      MDL:
        currencyDataFulfilled?.MDL?.find(
          (_i, index) => index === indexMonth,
        )! ?? 1,
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
