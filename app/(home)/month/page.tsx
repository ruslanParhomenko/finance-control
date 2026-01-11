import { getExpenseByUniqueKey } from "@/app/action/month-data-actions";
import MonthPage from "@/features/month/month-page";
import { ExpenseFormType } from "@/features/month/schema";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { month, year } = await searchParams;
  if (!month || !year) return;
  const uniqueKey = `${year}-${month}`;
  const expenseData = await getExpenseByUniqueKey(uniqueKey);
  return (
    <MonthPage
      expenseData={expenseData as ExpenseFormType & { id: string }}
      month={month?.toString()}
      year={year}
    />
  );
}
