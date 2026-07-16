"use client";
import { ExpenseDataType } from "@/app/action/month-data-actions";
import { ParamsValue } from "@/type/params-value";
import { InitialStateFormType } from "../initial-state/schema";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import { CurrencyData } from "@/type/currency-data";

import MonthPage from "../month/month-page";
import { useSearchParams } from "next/navigation";
import YearPage from "../year/year-page";
import BankPage from "../bank/bank-page";
import InitialForm from "../initial-state/initial-form";

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
  const tab = useSearchParams().get("tab");

  if (!tab) return null;
  return (
    <>
      {tab === "month" && (
        <MonthPage
          paramsValue={paramsValue}
          currencyData={currencyData}
          expenseData={expenseData}
        />
      )}
      {tab === "year" && (
        <YearPage
          expenseData={expenseData}
          paramsValue={paramsValue}
          initialState={initialState as InitialStateFormType}
          bankData={bankByYear as GetBankDataType[]}
          currencyData={currencyData}
        />
      )}
      {tab === "bank" && (
        <BankPage
          bankByYear={bankByYear}
          paramsValue={paramsValue}
          currencyData={currencyData}
          initialState={initialState as InitialStateFormType}
        />
      )}
      {tab === "initial-state" && (
        <InitialForm initialState={initialState} year={paramsValue.year} />
      )}
    </>
  );
}
