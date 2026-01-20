import { GetExpenseDataType } from "@/app/action/month-data-actions";
import { addCash, expenseCategories } from "@/constants/expense";
import { MONTHS } from "./get-month-days";

type Input = Record<string, (string | undefined)[] | undefined> | undefined;
type Output = Record<string, number>;

type Totals = Record<string, number>;

export function calculateTotals(data: Input): Output {
  const result: Output = {};

  for (const key in data) {
    const arr = data[key];
    const total =
      arr?.reduce((sum, val) => {
        const num = parseFloat(val || "0");
        return sum + (isNaN(num) ? 0 : num);
      }, 0) ?? 0;
    result[key] = total;
  }

  return result;
}

export function calculateOverallTotals(data: Totals) {
  const expenseTotal = expenseCategories.reduce(
    (sum, key) => sum + (data[key] ?? 0),
    0,
  );
  const addCashTotal = addCash.reduce((sum, key) => sum + (data[key] ?? 0), 0);

  return { expenseTotal, addCashTotal };
}

export function calculateCategoryTotalsByMonths(
  data: GetExpenseDataType[],
  currencyRates: number[],
): Record<string, number[]> {
  const result: Record<string, number[]> = {};

  const allCategories = new Set<string>();

  data.forEach((item) => {
    Object.keys(item.rowExpenseData).forEach((key) => {
      allCategories.add(key);
    });
  });

  allCategories.forEach((category) => {
    result[category] = MONTHS.map((month) => {
      const monthData = data.find((item) => item.month === month);
      const rate = currencyRates[Number(Number(month) - 1)];

      if (!monthData) {
        return 0;
      }

      const values = monthData.rowExpenseData[category];

      if (!Array.isArray(values)) {
        return 0;
      }

      return Math.round(
        values.reduce((sum, value) => sum + Number(value || 0), 0) /
          (rate || 1),
      );
    });
  });

  return result;
}
