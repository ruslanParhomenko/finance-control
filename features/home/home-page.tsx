import { Suspense } from "react";
import { ParamsValue } from "@/type/params-value";
import { CurrencyData } from "@/type/currency-data";
import { ExpenseDataType } from "@/app/action/month-data-actions";
import { InitialStateFormType } from "../initial-state/schema";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import HomePageClient from "./home-page-client";

export default function HomePage({
  paramsValue,
  expenseData,
  initialState,
  bankByYear,
  currencyData,
}: {
  paramsValue: ParamsValue;
  expenseData: ExpenseDataType[] | null;
  initialState: InitialStateFormType;
  bankByYear: GetBankDataType[] | null;
  currencyData: CurrencyData;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageClient
        paramsValue={paramsValue}
        expenseData={expenseData}
        initialState={initialState}
        bankByYear={bankByYear}
        currencyData={currencyData}
      />
    </Suspense>
  );
}
