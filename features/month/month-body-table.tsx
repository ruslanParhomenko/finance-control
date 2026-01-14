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
}: {
  form: UseFormReturn<ExpenseFormTypeInput>;
  monthDays: ReturnType<typeof getMonthDays> | [];
}) {
  const { watch } = form;
  const value = watch("rowExpenseData");

  const totalExpenses = expenseCategories.reduce((acc, category) => {
    const rowTotal =
      value?.[category as keyof ExpenseFormType["rowExpenseData"]]?.reduce(
        (rowAcc, val) => rowAcc + Number(val || 0),
        0
      ) || 0;

    return acc + rowTotal;
  }, 0);

  const totalAddCash = addCash.reduce((acc, category) => {
    const rowTotal =
      value?.[category as keyof ExpenseFormType["rowExpenseData"]]?.reduce(
        (rowAcc, val) => rowAcc + Number(val || 0),
        0
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
      />
      <RenderRow dataRow={addCash} monthDays={monthDays} form={form} />
      <TableRow>
        <TableCell
          colSpan={monthDays.length + 3}
          className={cn(
            "font-bold text-end p-0 px-2",
            Number(difference) > 0 ? "text-green-600" : "text-red-600"
          )}
        >
          {difference.toFixed(0)}
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
