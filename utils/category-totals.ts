import { addCash, expenseCategories } from "@/constants/expense";

/* ---------------- types ---------------- */

type InputValue = number | string | null | undefined;
export type Input = Record<string, InputValue[]>;

type Totals = Record<string, number>;

export function calculateOverallTotals(data: Totals | undefined): Totals {
  const expenseTotal = expenseCategories.reduce(
    (sum, key) => sum + (data?.[key] ?? 0),
    0,
  );

  const addCashTotal = addCash.reduce(
    (sum, key) => sum + (data?.[key] ?? 0),
    0,
  );

  return { expenseTotal, addCashTotal };
}
