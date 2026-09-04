import { getBankByYear } from "@/app/action/bank-data-actions";
import { getCurrencyData } from "@/app/action/get-currency";
import BankPage from "@/features/bank/bank-page";
import { ParamsValue } from "@/type/params-value";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const paramsValue = (await searchParams) as ParamsValue;
  const { month, year, currency, mode } = paramsValue;
  if (!month || !year || !currency || !mode) return;

  const [bankByYear, currencyData] = await Promise.all([
    getBankByYear(year),
    getCurrencyData(Number(year)),
  ]);

  return (
    <BankPage
      bankByYear={bankByYear}
      paramsValue={paramsValue}
      currencyData={currencyData}
    />
  );
}
