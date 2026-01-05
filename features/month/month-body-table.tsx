import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { expenseCategories } from "@/constants/expense";
import { getMonthDays } from "@/utils/get-month-days";
import { FieldPath, UseFormReturn, useWatch } from "react-hook-form";
import { ExpenseFormType } from "./schema";
import React from "react";
import { cn } from "@/lib/utils";
import { handleTableNavigation } from "@/utils/handleTableNavigation";

export default function MonthBodyTable({
  form,
  monthDays,
}: {
  form: UseFormReturn<ExpenseFormType>;
  monthDays: ReturnType<typeof getMonthDays> | [];
}) {
  const { register, watch } = form;
  const value = watch("rowExpense");
  console.log("value", value);

  return (
    <TableBody>
      {expenseCategories.map((row, index) => {
        const total = (
          value[row as keyof ExpenseFormType["rowExpense"]] as string[]
        )
          ?.reduce((acc: number, val: string) => acc + Number(val || 0), 0)
          .toFixed(0);
        console.log("total", total);
        return (
          <React.Fragment key={index + row}>
            <TableRow>
              <TableCell
                colSpan={2}
                className={cn("font-medium sticky left-0  text-start truncate")}
              >
                {row}
              </TableCell>

              {monthDays.map((_, dayIndex) => {
                return (
                  <TableCell
                    key={dayIndex}
                    className="p-0 text-center border-x"
                  >
                    <input
                      type="text"
                      data-row={index}
                      data-col={dayIndex}
                      {...register(
                        `rowExpense.${row}.${dayIndex}` as FieldPath<ExpenseFormType>
                      )}
                      className={cn(
                        "border-0  p-0 h-7 text-center  shadow-none  w-12.5"
                      )}
                      onKeyDown={(e) =>
                        handleTableNavigation(e, +index, dayIndex)
                      }
                    />
                  </TableCell>
                );
              })}
              <TableCell className="text-rd font-bold w-22">{total}</TableCell>
            </TableRow>
          </React.Fragment>
        );
      })}
    </TableBody>
  );
}
