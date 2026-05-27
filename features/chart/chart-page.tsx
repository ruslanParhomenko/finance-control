"use client";

import { useSearchParams } from "next/navigation";
import ChartBank from "./chart-bank";
import { ParamsValue } from "@/type/params-value";
import { CurrencyData } from "@/type/currency-data";
import { ExpenseDataType } from "@/app/action/month-data-actions";

import { GetBankDataType } from "@/app/action/bank-data-actions";
import ChartExpenses from "./chart-expenses";
import ChartExpenseMonth from "./chart-expense-month";

export default function ChartPage({
  paramsValue,
  data,
  currencyData,
}: {
  paramsValue: ParamsValue;
  data: {
    bank: GetBankDataType[] | null;
    expense: ExpenseDataType[] | null;
  };
  currencyData: CurrencyData;
}) {
  const { currency } = paramsValue;
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <>
      {tab === "bank" && (
        <ChartBank
          dataBank={data.bank}
          currencyData={currencyData}
          paramsValue={paramsValue}
        />
      )}

      {tab === "expenses" && (
        <ChartExpenses data={data.expense} currency={currency} />
      )}
      {tab === "month" && (
        <ChartExpenseMonth data={data.expense} currency={currency} />
      )}
    </>
  );
}
