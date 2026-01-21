import {
  getBankByUniqueKey,
  GetBankDataType,
} from "@/app/action/bank-data-actions";
import { getMonthlyAverageBNM } from "@/app/action/get-currency-mdl";

import BankPage from "@/features/bank/bank-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { month, year, currency } = await searchParams;
  if (!month || !year) return;
  const uniqueKey = `${year}-${month}`;
  const bankData = await getBankByUniqueKey(uniqueKey);

  const avgMDLtoEUR = await getMonthlyAverageBNM(uniqueKey, "EUR");
  const avgMDLtoUSD = await getMonthlyAverageBNM(uniqueKey, "USD");

  const currencyRates = {
    USD: avgMDLtoUSD.toFixed(2),
    EUR: avgMDLtoEUR.toFixed(2),
    MDL: "1",
  } as const;
  return (
    <BankPage
      bankData={bankData as GetBankDataType}
      month={month}
      year={year}
      currencyRates={currencyRates[currency as "USD" | "EUR" | "MDL"]}
      currency={currency as "USD" | "EUR" | "MDL"}
    />
  );
}
