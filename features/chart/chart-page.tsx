"use client";

import { useSearchParams } from "next/navigation";
import ChartBank from "./chart-bank";
import { ParamsValue } from "@/type/params-value";
import { CurrencyData } from "@/type/currency-data";
import { ExpenseDataType } from "@/app/action/month-data-actions";

import { GetBankDataType } from "@/app/action/bank-data-actions";
import ChartExpenses from "./chart-expenses";
import ChartExpenseMonth from "./chart-expense-month";
import ChartBankTotals from "./chart-bank-totals";

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
  const { month, currency } = paramsValue;
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  // bank
  const dataBankPrevMonth =
    data.bank?.find((item) => item.id === month) || null;

  return (
    <>
      {tab === "bank" && (
        <ChartBank
          data={dataBankPrevMonth}
          currencyData={currencyData}
          currency={currency}
        />
      )}
      {tab === "totals" && (
        <ChartBankTotals
          data={data.bank}
          currencyData={currencyData}
          currency={currency}
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
