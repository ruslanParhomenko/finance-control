import {
  getBankByUniqueKey,
  GetBankDataType,
} from "@/app/action/bank-data-actions";
import { getMonthlyAverageBNM } from "@/app/action/get-currency-mdl";
import { getInitialState } from "@/app/action/initial-state-actions";

import BankPage from "@/features/bank/bank-page";
import { InitialStateFormType } from "@/features/initial-state/schema";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { month, year, currency } = await searchParams;
  if (!month || !year) return;
  const uniqueKey = `${year}-${month}`;
  const bankData = await getBankByUniqueKey(uniqueKey);
  const initialState = await getInitialState();

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
      currencyRates={currencyRates}
      currency={currency as "USD" | "EUR" | "MDL"}
      initialState={initialState as InitialStateFormType}
    />
  );
}
