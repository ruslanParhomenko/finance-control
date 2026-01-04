import MonthPage from "@/features/month/month-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { month, year } = await searchParams;
  if (!month || !year) return;
  return <MonthPage month={month?.toString()} year={year} />;
}
