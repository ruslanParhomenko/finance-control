import { GetExpenseDataType } from "@/app/action/month-data-actions";
import { addCash, expenseCategories } from "@/constants/expense";
import { MONTHS } from "./get-month-days";

/* ---------------- types ---------------- */

type InputValue = number | string | null | undefined;
export type Input = Record<string, InputValue[]>;
type Output = Record<string, number>;
type Totals = Record<string, number>;

/* ---------------- helpers ---------------- */

function toNumber(value: InputValue): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const num = Number(value.replace(",", "."));
    return Number.isFinite(num) ? num : 0;
  }

  return 0;
}

/* ---------------- totals by category ---------------- */

export function calculateTotals(data: Input): Output {
  const result: Output = {};

  for (const key in data) {
    const arr = data[key] ?? [];

    const total = arr.reduce<number>((sum, val) => {
      return sum + toNumber(val);
    }, 0);

    result[key] = total;
  }

  return result;
}

/* ---------------- overall totals ---------------- */

export function calculateOverallTotals(data: Totals) {
  const expenseTotal = expenseCategories.reduce(
    (sum, key) => sum + (data[key] ?? 0),
    0,
  );

  const addCashTotal = addCash.reduce((sum, key) => sum + (data[key] ?? 0), 0);

  return { expenseTotal, addCashTotal };
}

/* ---------------- category totals by months ---------------- */

export function calculateCategoryTotalsByMonths(
  data: GetExpenseDataType[],
  currencyRates: number[],
): Record<string, number[]> {
  const result: Record<string, number[]> = {};

  /* индексируем данные по месяцу (O(n)) */
  const dataByMonth = new Map<string, GetExpenseDataType>();
  data.forEach((item) => {
    dataByMonth.set(item.month, item);
  });

  /* собираем все категории */
  const allCategories = new Set<string>();
  data.forEach((item) => {
    Object.keys(item.rowExpenseData).forEach((key) => {
      allCategories.add(key);
    });
  });

  /* считаем значения */
  allCategories.forEach((category) => {
    result[category] = MONTHS.map((month, monthIndex) => {
      const monthData = dataByMonth.get(month);
      if (!monthData) return 0;

      const values = monthData.rowExpenseData[category];
      if (!Array.isArray(values)) return 0;

      const rate = currencyRates[monthIndex] || 1;

      const sum = values.reduce((acc, value) => acc + toNumber(value), 0);

      return Math.round(sum / rate);
    });
  });

  return result;
}
