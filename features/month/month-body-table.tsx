import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { addCash, expenseCategories } from "@/constants/expense";
import { getMonthDays } from "@/utils/get-month-days";
import { UseFormReturn } from "react-hook-form";
import { ExpenseFormType, ExpenseFormTypeInput } from "./schema";
import { cn } from "@/lib/utils";
import RenderRow from "./render-row";

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

  const totalExpenses = expenseCategories.reduce((acc, category) => {
    const rowTotal =
      value?.[category as keyof ExpenseFormType["rowExpenseData"]]?.reduce(
        (rowAcc, val) => rowAcc + Number(val || 0),
        0,
      ) || 0;

    return acc + rowTotal;
  }, 0);

  const totalAddCash = addCash.reduce((acc, category) => {
    const rowTotal =
      value?.[category as keyof ExpenseFormType["rowExpenseData"]]?.reduce(
        (rowAcc, val) => rowAcc + Number(val || 0),
        0,
      ) || 0;

    return acc + rowTotal;
  }, 0);

  const difference = totalAddCash - totalExpenses;

  return (
    <TableBody>
      <RenderRow
        viewTotalByDay={true}
        dataRow={expenseCategories}
        monthDays={monthDays}
        form={form}
        currencyRates={currencyRates}
        currency={currency}
      />
      <RenderRow
        dataRow={addCash}
        monthDays={monthDays}
        form={form}
        currencyRates={currencyRates}
        currency={currency}
      />
      <TableRow>
        <TableCell
          colSpan={2}
          className={cn(
            "bg-background sticky left-0 z-10 text-start font-bold",
            Number(difference) > 0 ? "text-green-600" : "text-red-600",
          )}
        >
          {(difference / Number(currencyRates)).toFixed(0)} {currency}
        </TableCell>
        <TableCell colSpan={monthDays.length + 1} className="bg-background" />
      </TableRow>
    </TableBody>
  );
}
