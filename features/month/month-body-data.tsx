import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { addCash, expenseCategories } from "@/constants/expense";
import { getMonthDays } from "@/utils/get-month-days";

import { cn } from "@/lib/utils";
import {
  calculateOverallTotals,
  calculateTotals,
  Input,
} from "@/utils/category-totals";
import RowBodyRender from "@/components/table/row-body-render";
import RowFooterRender from "@/components/table/row-footer-render";
import { CURRENCY_ICON } from "./constants";

import { ExpenseDataType } from "@/app/action/month-data-actions";

export default function MonthBodyData({
  data,
  monthDays,
  currencyRates,
  currency,
}: {
  data: ExpenseDataType | null;
  monthDays: ReturnType<typeof getMonthDays> | [];
  currencyRates: number;
  currency: string;
}) {
  const value = data?.rowExpenseData;

  const totals = calculateTotals(value as Input);

  const { expenseTotal, addCashTotal } = calculateOverallTotals(totals);

  const difference = Number(addCashTotal) - Number(expenseTotal);

  return (
    <TableBody>
      {expenseCategories.map((row, index) => {
        const dataRow = value?.[row] || [];
        return (
          <TableRow key={index + row} className="[&>td]:py-0">
            <TableCell className="bg-background sticky left-0 z-10 text-end text-xs font-bold text-blue-700">
              {(Number(totals?.[row]) / Number(currencyRates)).toFixed(0)}{" "}
              {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
            </TableCell>
            <TableCell
              className={cn(
                "bg-background sticky left-13.5 z-10 text-start text-xs font-medium",
              )}
            >
              {row}
            </TableCell>

            {dataRow.map((_, dayIndex) => {
              return (
                <TableCell
                  key={dayIndex}
                  className={cn("h-8 border-x px-0 text-center")}
                >
                  <span className="text-center text-xs shadow-none">
                    {value?.[row]?.[dayIndex] || ""}
                  </span>
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
      <RowFooterRender
        rowArray={expenseCategories}
        cellArray={monthDays.map((day) => day.weekday)}
        currencyRates={currencyRates}
        currency={currency}
        totals={expenseTotal}
        value={value}
      />
      {addCash.map((row, index) => {
        const dataRow = value?.[row] || [];
        return (
          <TableRow key={index + row} className="[&>td]:py-0">
            <TableCell className="bg-background sticky left-0 z-10 text-end text-xs font-bold text-blue-700">
              {(Number(totals?.[row]) / Number(currencyRates)).toFixed(0)}{" "}
              {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
            </TableCell>
            <TableCell
              className={cn(
                "bg-background sticky left-13.5 z-10 text-start text-xs font-medium",
              )}
            >
              {row}
            </TableCell>

            {dataRow.map((_, dayIndex) => {
              return (
                <TableCell
                  key={dayIndex}
                  className={cn("h-8 border-x px-0 text-center")}
                >
                  <span className="text-center text-xs shadow-none">
                    {value?.[row]?.[dayIndex] || ""}
                  </span>
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
      <TableRow>
        <TableCell
          className={cn(
            "bg-background sticky left-0 z-10 text-end text-xs font-bold",
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
