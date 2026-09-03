import { ExpenseDataType } from "@/app/action/month-data-actions";
import { MONTHS } from "@/utils/get-month-days";

export function calculateCategoryTotalsByMonths(
  data: ExpenseDataType[],
  currencyRates: number[],
): Record<string, number[]> {
  const result: Record<string, number[]> = {};

  const dataByMonth = new Map<string, ExpenseDataType>();
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

  allCategories.forEach((category) => {
    result[category] = MONTHS.map((month, monthIndex) => {
      const monthData = dataByMonth.get(month);
      if (!monthData) return 0;

      const values = monthData.rowExpenseData[category];
      if (!Array.isArray(values)) return 0;

      const rate = currencyRates?.[monthIndex] || 1;

      const sum = values.reduce((acc, value) => acc + Number(value), 0);

      return Math.round(sum / rate);
    });
  });

  return result;
}
