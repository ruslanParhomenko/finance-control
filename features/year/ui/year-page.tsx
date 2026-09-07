"use client";

import { ParamsValue } from "@/type/params-value";
import { GetExpenseDataType } from "@/features/month/actions/get-expense";
import { GetInitialStateType } from "@/features/initial-state/model/type";
import { GetBankDataType } from "@/features/bank/model/type";
import { TabsLine } from "@/components/ui/tabs-line";
import YearViewTable from "./year-view-table";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import YearViewChart from "@/features/year/ui/year-view-chart";

const OPTIONS = ["table", "chart"];

export function YearPage({
  expenseData,
  paramsValue,
  initialState,
  bankData,
}: {
  expenseData: GetExpenseDataType[] | null;
  paramsValue: ParamsValue;
  initialState: GetInitialStateType | null;
  bankData: GetBankDataType[] | null;
}) {
  const { currency } = paramsValue;

  const [activeTab, setActiveTab] = useState<(typeof OPTIONS)[number]>("table");

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveTab("chart"),
    onSwipedRight: () => setActiveTab("table"),
  });

  return (
    <div className="flex h-[88dvh] flex-col items-center justify-between p-1">
      {activeTab === "table" && (
        <YearViewTable
          expenseData={expenseData}
          paramsValue={paramsValue}
          initialState={initialState}
          bankData={bankData}
        />
      )}
      {activeTab === "chart" && (
        <YearViewChart data={expenseData} currency={currency} />
      )}
      <div {...handlers} className="flex items-center justify-center">
        <TabsLine options={OPTIONS} value={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}
