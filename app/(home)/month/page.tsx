import { getMonthlyAverageBNM } from "@/app/action/get-currency-mdl";
import { getExpenseByUniqueKey } from "@/app/action/month-data-actions";
import MonthPage from "@/features/month/month-page";
import { ExpenseFormType } from "@/features/month/schema";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { month, year, currency } = await searchParams;
  if (!month || !year) return;
  const uniqueKey = `${year}-${month}`;
  const [expenseData, avgMDLtoEUR, avgMDLtoUSD] = await Promise.all([
    getExpenseByUniqueKey(uniqueKey),
    getMonthlyAverageBNM(uniqueKey, "EUR"),
    getMonthlyAverageBNM(uniqueKey, "USD"),
  ]);

  const currencyRates = {
    USD: avgMDLtoUSD.toFixed(2),
    EUR: avgMDLtoEUR.toFixed(2),
    MDL: "1",
  } as const;

  return (
    <MonthPage
      expenseData={expenseData as ExpenseFormType & { id: string }}
      month={month?.toString()}
      year={year}
      currencyRates={currencyRates[currency as "USD" | "EUR" | "MDL"]}
      currency={currency as "USD" | "EUR" | "MDL"}
    />
  );
}
