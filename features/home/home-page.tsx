"use client";

import { useHashParam } from "@/hooks/use-hash";
import {  ViewTransition } from "react";
import MonthPage from "../month/month-page";
import { ParamsValue } from "@/type/params-value";
import { CurrencyData } from "@/type/currency-data";
import { ExpenseDataType } from "@/app/action/month-data-actions";
import YearPage from "../year/year-page";
import { InitialStateFormType } from "../initial-state/schema";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import BankPage from "../bank/bank-page";
import InitialForm from "../initial-state/initial-form";

export default function HomePage({
  paramsValue,
  expenseData,
  bankData,
  initialState,
  bankByYear,
  currencyData,
}: {
  paramsValue: ParamsValue;
  expenseData: ExpenseDataType[] | null;
  bankData: GetBankDataType | null;
  initialState: InitialStateFormType;
  bankByYear: GetBankDataType[] | null;
  currencyData: CurrencyData;
}) {
  const [tab] = useHashParam("tab");


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
          bankData={bankData}
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
