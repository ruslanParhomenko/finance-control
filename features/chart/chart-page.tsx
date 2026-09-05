"use client";

import { ParamsValue } from "@/type/params-value";
import { CurrencyData } from "@/type/currency-data";
import { GetExpenseDataType } from "../month/actions/get-expense";
import { TabsLine } from "@/components/ui/tabs-line";
import { TABS_LINE_BY_ROUTE } from "@/components/nav-layout/constants";
import { CHART_MAIN_ROUTE } from "@/constants/route-tag";
import { useState } from "react";
import ChartExpenses from "./chart-expenses";
import ChartExpenseMonth from "./chart-expense-month";
import ChartBankMonth from "./chart-bank-month";
import ChartBankYear from "./chart-bank-year";
import { GetBankDataType } from "../bank/model/type";

const OPTIONS =
  TABS_LINE_BY_ROUTE[CHART_MAIN_ROUTE as keyof typeof TABS_LINE_BY_ROUTE];

export function ChartPage({
  paramsValue,
  dataBank,
  dataExpense,
  currencyData,
}: {
  paramsValue: ParamsValue;

  dataBank: GetBankDataType[] | null;
  dataExpense: GetExpenseDataType[] | null;

  currencyData: CurrencyData;
}) {
  const { currency } = paramsValue;

  const [chartType, setChartType] =
    useState<(typeof OPTIONS)[number]>("expenses");

  return (
    <div className="flex h-[90dvh] flex-col items-center justify-between">
      <div className="flex items-center justify-center gap-12">
        <TabsLine
          options={OPTIONS}
          value={chartType}
          onChange={setChartType}
          className="flex items-center justify-center py-2"
        />
      </div>
      <div className="flex-1">
        {chartType === "bank-month" && (
          <ChartBankMonth
            dataBank={dataBank}
            currencyData={currencyData}
            paramsValue={paramsValue}
          />
        )}
        {chartType === "bank-year" && (
          <ChartBankYear
            dataBank={dataBank}
            currencyData={currencyData}
            paramsValue={paramsValue}
          />
        )}

        {chartType === "expenses" && (
          <ChartExpenses data={dataExpense} currency={currency} />
        )}
        {chartType === "expense" && (
          <ChartExpenseMonth data={dataExpense} currency={currency} />
        )}
      </div>
    </div>
  );
}
