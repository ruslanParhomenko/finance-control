import { getExpenseByYear, GetExpenseDataType } from "@/app/action/month-data-actions";
import YearPage from "@/features/year/year-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}
) {
  const { year } = await searchParams;
  if (!year) return;

  const data = await getExpenseByYear(year);
  return <YearPage data={data as GetExpenseDataType[]} year={year} />;
}
