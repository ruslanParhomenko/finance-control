"use client";
import { ExpenseDataType } from "@/app/action/month-data-actions";
import CustomChart from "@/components/chart-custom";
import {
  MonthPicker,
  MonthRange,
} from "@/components/input-controlled/month-range";
import { Label } from "@/components/ui/label";
import { addCash } from "@/constants/expense";
import { MONTHS } from "@/utils/get-month-days";
import { TrashIcon } from "lucide-react";
import { useMemo, useState } from "react";

export default function ChartExpenses({
  data,
  currency,
}: {
  data: ExpenseDataType[] | null;
  currency: string;
}) {
  const [range, setRange] = useState<MonthRange>();

  function getCategoryTotals(data: ExpenseDataType[]) {
    const totals: Record<string, number> = {};

    const addCashSet = new Set(addCash);

    data.forEach((month) => {
      const currencyRates = month.currencyRates[currency];
      Object.entries(month.rowExpenseData)
        .filter(([key]) => !addCashSet.has(key as (typeof addCash)[number]))
        .forEach(([key, days]) => {
          const sum = days.reduce((acc, val) => {
            const value = +val / currencyRates;
            const num = parseFloat(value.toFixed(0));
            return acc + (isNaN(num) ? 0 : num);
          }, 0);

          totals[key] = (totals[key] || 0) + sum;
        });
    });

    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }

  const dataExpenses = useMemo(() => {
    if (range?.from === undefined || range?.to === undefined) {
      return data;
    }

    const from = +MONTHS[range.from];
    const to = +MONTHS[range.to];

    return (
      data?.filter((data) => {
        const idx = +data.month;
        return idx >= from && idx <= to;
      }) || null
    );
  }, [range, data]);

  const chartData = getCategoryTotals(dataExpenses || []);

  const BAR_KEYS = [
    { key: "value", color: "var(--color-chart-1)", label: "value" },
  ];

  const totalValue = chartData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="flex flex-col">
      <div className="text-muted-foreground w-full px-6 text-center text-xs font-medium">
        {totalValue.toFixed(0)} {currency}
      </div>
      <CustomChart chartData={chartData} barItem={BAR_KEYS} />
      <div className="flex items-center justify-center gap-2 px-6 md:gap-6">
        <MonthPicker value={range} onChange={setRange} />
        <button
          disabled={!range}
          type="button"
          onClick={() => setRange(undefined)}
          className="w-4"
        >
          {range && <TrashIcon className="text-rd h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
