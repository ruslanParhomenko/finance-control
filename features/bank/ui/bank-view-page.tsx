"use client";
import { GetBankDataType } from "../model/type";
import { useState } from "react";
import { TabsLine } from "@/components/ui/tabs-line";
import BankViewTable from "./bank-view-table";
import ChartBankMonth from "@/features/chart/chart-bank-month";
import { ParamsValue } from "@/type/params-value";
import { useSwipeable } from "react-swipeable";

const OPTIONS = ["table", "chart"];

export function BankViewPage({
  bankData,
  paramsValue,
}: {
  bankData: GetBankDataType[] | null;
  paramsValue: ParamsValue;
}) {
  const { month, currency } = paramsValue;
  const [activeTab, setActiveTab] = useState<(typeof OPTIONS)[number]>("table");

  const bankDataByMonth = bankData?.find((item) => item.id === month) || null;
  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveTab("chart"),
    onSwipedRight: () => setActiveTab("table"),
  });

  return (
    <div className="flex h-[88dvh] flex-col items-center justify-between p-1">
      {activeTab === "table" && (
        <BankViewTable bankData={bankDataByMonth} currency={currency} />
      )}
      {activeTab === "chart" && (
        <ChartBankMonth dataBank={bankData} paramsValue={paramsValue} />
      )}
      <div {...handlers} className="mt-0 flex items-center justify-center">
        <TabsLine
          options={OPTIONS}
          value={activeTab}
          onChange={setActiveTab}
          className="flex items-center justify-center py-2"
        />
      </div>
    </div>
  );
}
