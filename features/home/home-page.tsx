"use client";

import { ViewTransition } from "react";
import MonthPage from "../month/month-page";
import { ParamsValue } from "@/type/params-value";
import { CurrencyData } from "@/type/currency-data";
import { ExpenseDataType } from "@/app/action/month-data-actions";
import YearPage from "../year/year-page";
import { InitialStateFormType } from "../initial-state/schema";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import BankPage from "../bank/bank-page";
import InitialForm from "../initial-state/initial-form";
import { useSearchParams } from "next/navigation";

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

  console.log("bankByYear", bankByYear);

  if (!tab) return null;

  return (
    <ViewTransition>
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
    </ViewTransition>
  );
}
