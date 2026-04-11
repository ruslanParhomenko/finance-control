"use client";

import { useHashParam } from "@/hooks/use-hash";
import { Activity } from "react";
import MonthPage from "../month/month-page";
import { ParamsValue } from "@/type/params-value";
import { CurrencyData } from "@/type/currency-data";
import { ExpenseDataType } from "@/app/action/month-data-actions";
import YearPage from "../year/year-page";
import { YearMonthlyRates } from "@/app/action/get-currency-year";
import { InitialStateFormType } from "../initial-state/schema";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import BankPage from "../bank/bank-page";

export default function HomePage({
  paramsValue,
  expenseData,
  bankData,
  currencyRates,
  initialState,
  bankByYear,
  currencyYear,
}: {
  paramsValue: ParamsValue;
  expenseData: ExpenseDataType[] | null;
  bankData: GetBankDataType | null;
  currencyRates: CurrencyData;
  initialState: InitialStateFormType;
  bankByYear: GetBankDataType[] | null;
  currencyYear: YearMonthlyRates;
}) {
  const [tab] = useHashParam("tab");

  if (!tab) return null;

  return (
    <>
      <Activity mode={tab === "month" ? "visible" : "hidden"}>
        <MonthPage
          paramsValue={paramsValue}
          currencyRates={currencyRates}
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
          currencyYear={currencyYear}
        />
      </Activity>
      <Activity mode={tab === "bank" ? "visible" : "hidden"}>
        <BankPage
          bankData={bankData}
          paramsValue={paramsValue}
          currencyRates={currencyRates}
          initialState={initialState as InitialStateFormType}
          formId={tab}
        />
      </Activity>
    </>
  );
}
