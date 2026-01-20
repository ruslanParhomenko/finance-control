import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { addCash, expenseCategories } from "@/constants/expense";
import { getMonthDays } from "@/utils/get-month-days";
import { UseFormReturn } from "react-hook-form";
import { ExpenseFormTypeInput } from "./schema";
import { cn } from "@/lib/utils";
import {
  calculateOverallTotals,
  calculateTotals,
} from "@/utils/category-totals";
import RowBodyRender from "@/components/table/row-body-render";
import RowFooterRender from "@/components/table/row-footer-render";
import { CURRENCY_ICON } from "./constants";

export default function MonthBodyTable({
  form,
  monthDays,
  currencyRates,
  currency,
}: {
  form: UseFormReturn<ExpenseFormTypeInput>;
  monthDays: ReturnType<typeof getMonthDays> | [];
  currencyRates: string;
  currency: string;
}) {
  const { watch } = form;
  const value = watch("rowExpenseData");
  const totals = calculateTotals(value);

  const { expenseTotal, addCashTotal } = calculateOverallTotals(totals);

  const difference = Number(addCashTotal) - Number(expenseTotal);

  return (
    <TableBody>
      <RowBodyRender
        rowArray={expenseCategories}
        cellArray={monthDays.map((day) => day.weekday)}
        currencyRates={currencyRates}
        currency={currency}
        form={form}
        totals={totals}
      />
      <RowFooterRender
        rowArray={expenseCategories}
        cellArray={monthDays.map((day) => day.weekday)}
        currencyRates={currencyRates}
        currency={currency}
        totals={expenseTotal}
        value={value}
      />
      <RowBodyRender
        rowArray={addCash}
        cellArray={monthDays.map((day) => day.weekday)}
        form={form}
        currencyRates={currencyRates}
        currency={currency}
        totals={totals}
      />
      <TableRow>
        <TableCell
          className={cn(
            "bg-background sticky left-0 z-10 px-2 text-end text-xs font-bold",
            Number(difference) > 0 ? "text-green-600" : "text-red-600",
          )}
        >
          {(difference / Number(currencyRates)).toFixed(0)}{" "}
          {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
        </TableCell>
        <TableCell
          colSpan={monthDays.length + 1}
          className="bg-background text-xs"
        />
      </TableRow>
    </TableBody>
  );
}
