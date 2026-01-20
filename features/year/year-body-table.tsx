import { GetExpenseDataType } from "@/app/action/month-data-actions";
import RowBodyRender from "@/components/table/row-body-render";
import RowFooterRender from "@/components/table/row-footer-render";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { addCash, expenseCategories } from "@/constants/expense";
import { cn } from "@/lib/utils";
import {
  calculateCategoryTotalsByMonths,
  calculateOverallTotals,
  calculateTotals,
} from "@/utils/category-totals";
import { MONTHS } from "@/utils/get-month-days";

export default function YearBodyTable({
  data,
  currencyRates,
  currency,
}: {
  data: GetExpenseDataType[];
  currencyRates: number[];
  currency: string;
}) {
  console.log(currencyRates);
  const value = calculateCategoryTotalsByMonths(data, currencyRates);

  console.log(value);
  const totals = value && calculateTotals(value as any);
  const { expenseTotal, addCashTotal } = calculateOverallTotals(totals);

  const difference = Number(addCashTotal) - Number(expenseTotal);

  return (
    <TableBody>
      <RowBodyRender
        rowArray={expenseCategories}
        cellArray={MONTHS}
        currencyRates={"1"}
        currency={currency}
        totals={totals}
        value={value as any}
      />
      <RowFooterRender
        rowArray={expenseCategories}
        cellArray={MONTHS}
        currencyRates={"1"}
        currency={"MDL"}
        totals={expenseTotal}
        value={value as any}
      />
      <RowBodyRender
        rowArray={addCash}
        cellArray={MONTHS}
        currencyRates={"1"}
        currency={"MDL"}
        totals={totals}
        value={value as any}
      />
      <TableRow>
        <TableCell
          colSpan={2}
          className={cn(
            "bg-background sticky left-0 z-10 px-1 text-start text-xs font-bold",
            Number(difference) > 0 ? "text-green-600" : "text-red-600",
          )}
        >
          {difference} {currency}
        </TableCell>
        <TableCell colSpan={MONTHS.length + 1} className="bg-background" />
      </TableRow>
    </TableBody>
  );
}
