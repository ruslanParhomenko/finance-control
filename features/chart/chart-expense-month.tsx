"use client";
import { ExpenseDataType } from "@/app/action/month-data-actions";
import CustomChart from "@/components/chart-custom/chart-bar-label-custom";
import SelectOptions from "@/components/select/select-options";
import { addCash, expenseCategories } from "@/constants/expense";
import { useIsMobile } from "@/hooks/use-mobile";
import { MONTH_STRINGS } from "@/utils/get-month-days";
import { useState } from "react";

const DATA_EXPENSES = [...expenseCategories, ...addCash];

export default function ChartExpenseMonth({
  data,
  currency,
}: {
  data: ExpenseDataType[] | null;
  currency: string;
}) {
  const isMobile = useIsMobile();
  const [selectedExpense, setSelectedExpense] = useState<string>("");
  function getCategoryTotals(value: ExpenseDataType[]) {
    const totals: Record<string, number> = Object.fromEntries(
      MONTH_STRINGS.map((month) => [month, 0]),
    );

    value.forEach((data) => {
      const currencyRates = data.currencyRates[currency];
      const month = MONTH_STRINGS[+data.month - 1];
      Object.entries(data.rowExpenseData)
        .filter(([key]) => key === selectedExpense)
        .forEach(([key, days]) => {
          const sum = days.reduce((acc, val) => {
            const value = +val / currencyRates;
            const num = parseFloat(value.toFixed(0));
            return acc + (isNaN(num) ? 0 : num);
          }, 0);

          totals[month] = (totals[month] || 0) + sum;
        });
    });

    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }

  const chartData = selectedExpense ? getCategoryTotals(data || []) : [];

  const BAR_KEYS = [
    { key: "value", color: "var(--color-chart-1)", label: "value" },
  ];

  const options = DATA_EXPENSES.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <div className="flex flex-col items-center">
      <SelectOptions
        options={options}
        value={selectedExpense}
        onChange={setSelectedExpense}
        className="h-6! w-40"
        mode={isMobile ? "grid" : "default"}
      />
      <CustomChart chartData={chartData} barItem={BAR_KEYS} withLegend />
    </div>
  );
}
