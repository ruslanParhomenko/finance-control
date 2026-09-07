"use client";
import CustomChart from "@/components/chart-custom";
import {
  MonthPicker,
  MonthRange,
} from "@/components/input-controlled/month-range";
import { addCash } from "@/constants/expense";
import { MONTHS } from "@/utils/get-month-days";
import { TrashIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { GetExpenseDataType } from "../../month/actions/get-expense";

export default function YearViewChart({
  data,
  currency,
}: {
  data: GetExpenseDataType[] | null;
  currency: string;
}) {
  const [range, setRange] = useState<MonthRange>();

  function getCategoryTotals(data: GetExpenseDataType[]) {
    const totals: Record<string, number> = {};

    const addCashSet = new Set(addCash);

    data.forEach((month) => {
      const currencyRates =
        month?.data?.currencyRates[
          currency as keyof typeof month.data.currencyRates
        ];
      Object.entries(month.data.dataExpense)
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
        const idx = +data.id;
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
      <div className="my-1 flex items-center justify-center gap-2 px-4">
        <button
          disabled={!range}
          type="button"
          onClick={() => setRange(undefined)}
          className="w-4"
        >
          {range && <TrashIcon className="h-3.5 w-4 text-red-600" />}
        </button>
        <MonthPicker value={range} onChange={setRange} />
        <div className="text-muted-foreground px-6 text-center text-xs font-medium">
          Total: {totalValue.toFixed(0)} {currency}
        </div>
      </div>
      <CustomChart chartData={chartData} barItem={BAR_KEYS} />
    </div>
  );
}
