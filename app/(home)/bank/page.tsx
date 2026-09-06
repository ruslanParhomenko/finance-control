import { getCurrencyData } from "@/app/action/get-currency";
import { BankEditPage, BankViewPage } from "@/features/bank";
import { getBankByYear } from "@/features/bank/actions/get-bank-data";
import { ParamsValue } from "@/type/params-value";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const paramsValue = (await searchParams) as ParamsValue;
  const { month, year, currency, mode } = paramsValue;
  if (!month || !year || !currency || !mode) return;

  const monthIndex = Number(month) - 1;

  const bankByYear = await getBankByYear(year);
  const bankByMonth = bankByYear?.find((item) => item.id === month) || null;

  if (mode === "edit") {
    const currencyData = await getCurrencyData(Number(year));
    const currencyRatesByMonth = {
      USD: currencyData.USD.find((_item, index) => index === monthIndex)!,
      EUR: currencyData.EUR.find((_item, index) => index === monthIndex)!,
      MDL: currencyData.MDL.find((_item, index) => index === monthIndex)!,
    };

    return (
      <BankEditPage
        bankByMonth={bankByMonth}
        paramsValue={paramsValue}
        currencyRatesByMonth={currencyRatesByMonth}
      />
    );
  }

  return <BankViewPage bankData={bankByYear} paramsValue={paramsValue} />;
}
