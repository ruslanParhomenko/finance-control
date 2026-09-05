import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { addCash, expenseCategories } from "@/constants/expense";
import { getMonthDays } from "@/utils/get-month-days";
import { cn } from "@/lib/utils";
import { calculateOverallTotals } from "@/utils/category-totals";
import { calculateTotals } from "@/utils/calculate-totals";
import { CURRENCY_ICON } from "../model/constants";
import { ExpenseFormData } from "../actions/create-expense";

export default function MonthViewBody({
  data,
  monthDays,
  currency,
}: {
  data: ExpenseFormData | null;
  monthDays: ReturnType<typeof getMonthDays> | [];
  currency: string;
}) {
  const value = data?.dataExpense;
  const totals = value && calculateTotals(value);

  const currencyRates =
    data?.currencyRates[currency as keyof typeof data.currencyRates];

  const { expenseTotal, addCashTotal } = calculateOverallTotals(totals);

  const difference = Number(addCashTotal) - Number(expenseTotal);

  return (
    <TableBody>
      {expenseCategories.map((row, index) => {
        const dataRow = value?.[row] || [];
        const total = (Number(totals?.[row]) / Number(currencyRates)).toFixed(
          0,
        );
        return (
          <TableRow key={index + row} className="[&>td]:py-0">
            <TableCell className="bg-background sticky left-0 z-10 text-end text-xs font-bold text-blue-700">
              {isNaN(Number(total)) ? 0 : total}{" "}
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
                  className={"h-6.5 border-x px-0 text-center md:h-9"}
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

      <TableRow className="[&>td]:py-1.5 md:[&>td]:py-2.5">
        <TableCell className="bg-background sticky left-0 px-2 text-end text-xs font-bold">
          {(Number(expenseTotal) / Number(currencyRates)).toFixed(0)}{" "}
          {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
        </TableCell>
        <TableCell className="bg-background sticky left-12" />
        {monthDays
          .map((day) => day.weekday)
          .map((_, dayIndex) => {
            const totalByDay = expenseCategories
              .reduce((acc, category) => {
                const dayValue = value?.[category]?.[dayIndex];

                return acc + Number(dayValue || 0);
              }, 0)
              .toFixed(0);
            return (
              <TableCell
                key={dayIndex}
                className="p-0 text-center text-xs font-bold"
              >
                {(Number(totalByDay) / Number(currencyRates)).toFixed(0)}{" "}
                {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
              </TableCell>
            );
          })}
      </TableRow>

      {addCash.map((row, index) => {
        const dataRow = value?.[row] || [];
        const total = (Number(totals?.[row]) / Number(currencyRates)).toFixed(
          0,
        );
        return (
          <TableRow
            key={index + row}
            className="[&>td]:py-1.5 md:[&>td]:py-2.5"
          >
            <TableCell className="bg-background sticky left-0 z-10 text-end text-xs font-bold text-blue-700">
              {isNaN(Number(total)) ? 0 : total}{" "}
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
                  className={cn("border-x px-0 text-center")}
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
