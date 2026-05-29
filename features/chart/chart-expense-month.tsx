"use client";
import { ExpenseDataType } from "@/app/action/month-data-actions";
import CustomChart from "@/components/chart-custom/chart-bar-label-custom";
import CustomLegend from "@/components/chart-custom/chart-legend";

import { addCash, expenseCategories } from "@/constants/expense";
import { useIsMobile } from "@/hooks/use-mobile";
import { MONTH_STRINGS } from "@/utils/get-month-days";
import { useState } from "react";

const DATA_EXPENSES = [...expenseCategories, ...addCash];

type ExpenseType = (typeof DATA_EXPENSES)[number];

type ChartDataItem = { name: string } & { [key in ExpenseType]: number };
type BarKey = keyof Omit<ChartDataItem, "name">;

export default function ChartExpenseMonth({
  data,
  currency,
}: {
  data: ExpenseDataType[] | null;
  currency: string;
}) {
  const isMobile = useIsMobile();

  const [visibleBars, setVisibleBars] = useState<Record<BarKey, boolean>>(
    DATA_EXPENSES.reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {} as Record<BarKey, boolean>,
    ),
  );
  function getCategoryTotals(value: ExpenseDataType[]): ChartDataItem[] {
    const totals: Record<string, Record<string, number>> = Object.fromEntries(
      MONTH_STRINGS.map((month) => [
        month,
        Object.fromEntries(DATA_EXPENSES.map((cat) => [cat, 0])),
      ]),
    );

    value.forEach((data) => {
      const currencyRates = data.currencyRates[currency];
      const month = MONTH_STRINGS[+data.month - 1];

      Object.entries(data.rowExpenseData).forEach(([key, days]) => {
        if (!DATA_EXPENSES.includes(key as ExpenseType)) return;

        const sum = days.reduce((acc, val) => {
          const converted = +val / currencyRates;
          const num = parseFloat(converted.toFixed(0));
          return acc + (isNaN(num) ? 0 : num);
        }, 0);

        totals[month][key] = (totals[month][key] || 0) + sum;
      });
    });

    return Object.entries(totals).map(([name, categories]) => ({
      name,
      ...categories,
    })) as ChartDataItem[];
  }

  const chartData = getCategoryTotals(data || []);

  const BAR_KEYS = DATA_EXPENSES.map((item, index) => ({
    key: item,
    color: "var(--color-blue-600)",
    label: item.trim(),
  }));

  const toggleBar = (key: BarKey) => {
    setVisibleBars((prev) => {
      return {
        ...(Object.fromEntries(
          DATA_EXPENSES.map((item) => [item, false]),
        ) as Record<BarKey, boolean>),
        [key]: true,
      };
    });
  };

  return (
    <div className="flex flex-col items-center">
      <CustomChart
        chartData={chartData}
        barItem={BAR_KEYS.filter(({ key }) => visibleBars[key as BarKey])}
        vertical={isMobile}
        className={isMobile ? "h-[70dvh]" : "h-[80dvh]"}
      />
      <CustomLegend
        items={BAR_KEYS}
        visibleItems={visibleBars}
        onToggle={toggleBar}
      />
    </div>
  );
}
