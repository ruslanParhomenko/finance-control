import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { addCash, expenseCategories } from "@/constants/expense";
import { getMonthDays } from "@/utils/get-month-days";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { ExpenseFormType, ExpenseFormTypeInput } from "./schema";
import React from "react";
import { cn } from "@/lib/utils";
import { handleTableNavigation } from "@/utils/handleTableNavigation";

export default function MonthBodyTable({
  form,
  monthDays,
}: {
  form: UseFormReturn<ExpenseFormTypeInput>;
  monthDays: ReturnType<typeof getMonthDays> | [];
}) {
  const { register, watch } = form;
  const value = watch("rowExpenseData");

  return (
    <>
      <TableBody>
        {expenseCategories.map((row, index) => {
          const total = (
            value?.[row as keyof ExpenseFormType["rowExpenseData"]] as string[]
          )
            ?.reduce((acc: number, val: string) => acc + Number(val || 0), 0)
            .toFixed(0);
          return (
            <React.Fragment key={index + row}>
              <TableRow>
                <TableCell
                  colSpan={2}
                  className={cn(
                    "font-medium sticky left-0  text-start truncate p-1.5 bg-background"
                  )}
                >
                  {row}
                </TableCell>

                {monthDays.map((_, dayIndex) => {
                  return (
                    <TableCell
                      key={dayIndex}
                      className="p-0 text-center border-x md:py-2"
                    >
                      <input
                        type="text"
                        data-row={index}
                        data-col={dayIndex}
                        {...register(
                          `rowExpenseData.${row}.${dayIndex}` as FieldPath<ExpenseFormType>
                        )}
                        className={cn(
                          "border-0  p-0 h-6 md:h-7 text-center  shadow-none   w-10"
                        )}
                        onKeyDown={(e) =>
                          handleTableNavigation(e, +index, dayIndex)
                        }
                      />
                    </TableCell>
                  );
                })}
                <TableCell className="font-bold w-22 p-0 px-2 text-end">
                  {total}
                </TableCell>
              </TableRow>
            </React.Fragment>
          );
        })}
        <TableRow>
          <TableCell></TableCell>
        </TableRow>
        {addCash.map((row, index) => {
          const total = (
            value?.[row as keyof ExpenseFormType["rowExpenseData"]] as string[]
          )
            ?.reduce((acc: number, val: string) => acc + Number(val || 0), 0)
            .toFixed(0);
          return (
            <TableRow key={index}>
              <TableCell
                colSpan={2}
                className="font-medium sticky left-0 text-start truncate"
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
                        `rowExpenseData.${row}.${dayIndex}` as FieldPath<ExpenseFormType>
                      )}
                      className={cn(
                        "border-0  p-0 h-6 md:h-7 text-center  shadow-none   w-10"
                      )}
                    />
                  </TableCell>
                );
              })}
              <TableCell className="font-bold w-22 p-0 px-2 text-end">
                {total}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
}
