"use client";
import CustomChart from "@/components/chart-custom";
import {
  MonthPicker,
  MonthRange,
} from "@/components/input-controlled/month-range";
import { addCash, expenseCategories } from "@/constants/expense";
import { MONTH_STRINGS, MONTHS } from "@/utils/get-month-days";
import { TrashIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { GetExpenseDataType } from "../../month/actions/get-expense";
import CustomLegend from "@/components/chart-custom/chart-legend";

const DATA_EXPENSES = [...expenseCategories, ...addCash, "expenses"];

type ExpenseType = (typeof DATA_EXPENSES)[number];

type ChartDataItem = { name: string } & { [key in ExpenseType]: number };
type BarKey = keyof Omit<ChartDataItem, "name">;

export default function YearViewChart({
  data,
  currency,
}: {
  data: GetExpenseDataType[] | null;
  currency: string;
}) {
  const [range, setRange] = useState<MonthRange>();
  const [visibleBars, setVisibleBars] = useState<Record<BarKey, boolean>>(
    DATA_EXPENSES.reduce(
      (acc, key) => ({ ...acc, [key]: key === "expenses" ? true : false }),
      {} as Record<BarKey, boolean>,
    ),
  );
  function getCategoryTotalsByMonths(
    value: GetExpenseDataType[],
  ): ChartDataItem[] {
    const totals: Record<string, Record<string, number>> = Object.fromEntries(
      MONTH_STRINGS.map((month) => [
        month,
        Object.fromEntries(DATA_EXPENSES.map((cat) => [cat, 0])),
      ]),
    );

    value.forEach((data) => {
      const currencyRates =
        data.data.currencyRates[
          currency as keyof typeof data.data.currencyRates
        ];
      const month = MONTH_STRINGS[+data.id - 1];

      Object.entries(data.data.dataExpense).forEach(([key, days]) => {
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

  const chartDataByMonth = getCategoryTotalsByMonths(data || []);

  function getCategoryTotalsByExpense(data: GetExpenseDataType[]) {
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

  const chartDataByExpense = getCategoryTotalsByExpense(dataExpenses || []);

  const BAR_KEYS_BY_EXPENSE = [
    { key: "value", color: "var(--color-chart-1)", label: "value" },
  ];
  const BAR_KEYS_BY_MONTH = DATA_EXPENSES.map((item) => ({
    key: item,
    color: "var(--color-blue-600)",
    label: item.trim(),
  }));

  const chartData = visibleBars.expenses
    ? chartDataByExpense
    : chartDataByMonth;

  const BAR_KEYS = visibleBars.expenses
    ? BAR_KEYS_BY_EXPENSE
    : BAR_KEYS_BY_MONTH.filter((item) => visibleBars[item.key]);

  const activeBarKey = BAR_KEYS.find(
    ({ key }) => visibleBars[key as BarKey],
  )?.key;

  const totalValue = visibleBars.expenses
    ? chartDataByExpense.reduce((acc, item) => acc + item.value, 0)
    : chartDataByMonth.reduce(
        (acc, item) => acc + item[activeBarKey as BarKey],
        0,
      ) || 0;
  const toggleBar = (key: BarKey) => {
    setVisibleBars(() => {
      return {
        ...(Object.fromEntries(
          DATA_EXPENSES.map((item) => [item, false]),
        ) as Record<BarKey, boolean>),
        [key]: true,
      };
    });
  };
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
      <CustomLegend
        items={BAR_KEYS_BY_MONTH}
        visibleItems={visibleBars}
        onToggle={toggleBar}
      />
    </div>
  );
}
