"use client";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import { GetInitialStateType } from "@/app/action/initial-state-actions";
import { ExpenseDataType } from "@/app/action/month-data-actions";
import { CurrencyData } from "@/type/currency-data";
import { ParamsValue } from "@/type/params-value";
import { useSearchParams } from "next/navigation";
import BankPage from "../bank/bank-page";
import InitialForm from "../initial-state/initial-form";
import MonthPage from "../month/month-page";
import { YearPage } from "../year";

export default function HomePage({
  paramsValue,
  expenseData,
  initialState,
  bankByYear,
  currencyData,
}: {
  paramsValue: ParamsValue;
  expenseData: ExpenseDataType[] | null;
  initialState: GetInitialStateType | null;
  bankByYear: GetBankDataType[] | null;
  currencyData: CurrencyData | null;
}) {
  const tab = useSearchParams().get("tab");

  if (!tab || !currencyData) return null;

  switch (tab) {
    case "month":
      return (
        <MonthPage
          paramsValue={paramsValue}
          currencyData={currencyData}
          expenseData={expenseData}
        />
      );
    case "year":
      return (
        <YearPage
          expenseData={expenseData}
          paramsValue={paramsValue}
          initialState={initialState}
          bankData={bankByYear}
          currencyData={currencyData}
        />
      );
    case "bank":
      return (
        <BankPage
          bankByYear={bankByYear}
          paramsValue={paramsValue}
          currencyData={currencyData}
          initialState={initialState}
        />
      );
    case "initial-state":
      return (
        <InitialForm
          initialState={initialState}
          year={paramsValue.year}
          currencyData={currencyData}
        />
      );
    default:
      return null;
  }
}
