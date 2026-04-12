"use client";

import { useHashParam } from "@/hooks/use-hash";
import { Activity } from "react";
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
    <>
      <Activity mode={tab === "month" ? "visible" : "hidden"}>
        <MonthPage
          paramsValue={paramsValue}
          currencyData={currencyData}
          expenseData={expenseData}
          formId={tab}
        />
      </Activity>
      <Activity mode={tab === "year" ? "visible" : "hidden"}>
        <YearPage
          expenseData={expenseData}
          paramsValue={paramsValue}
          initialState={initialState as InitialStateFormType}
          bankData={bankByYear as GetBankDataType[]}
          currencyData={currencyData}
        />
      </Activity>
      <Activity mode={tab === "bank" ? "visible" : "hidden"}>
        <BankPage
          bankData={bankData}
          paramsValue={paramsValue}
          currencyData={currencyData}
          initialState={initialState as InitialStateFormType}
          formId={tab}
        />
      </Activity>
      <Activity mode={tab === "initial-state" ? "visible" : "hidden"}>
        <InitialForm
          initialState={initialState}
          year={paramsValue.year}
          formId={tab}
        />
      </Activity>
    </>
  );
}
