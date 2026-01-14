import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { addCash, expenseCategories } from "@/constants/expense";
import { getMonthDays } from "@/utils/get-month-days";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { ExpenseFormType, ExpenseFormTypeInput } from "./schema";
import React from "react";
import { cn } from "@/lib/utils";
import { handleTableNavigation } from "@/utils/handleTableNavigation";
import NumericInput from "@/components/input/numeric-input";

export default function MonthBodyTable({
  form,
  monthDays,
}: {
  form: UseFormReturn<ExpenseFormTypeInput>;
  monthDays: ReturnType<typeof getMonthDays> | [];
}) {
  const { register, watch } = form;
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
                  "font-medium sticky left-0  text-start truncate p-0 bg-background"
                )}
              >
                {row}
              </TableCell>

              {monthDays.map((_, dayIndex) => {
                return (
                  <React.Fragment key={dayIndex}>
                    <TableCell className="border-x p-0 md:hidden">
                      <NumericInput
                        fieldName={`rowExpenseData.${row}.${dayIndex}`}
                        className="border-0 shadow-none rounded-none w-full h-7 text-center text-md"
                      />
                    </TableCell>
                    <TableCell
                      key={dayIndex}
                      className="p-0 text-center border-x md:py-1 hidden md:table-cell"
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
                  </React.Fragment>
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
        <TableCell colSpan={2}></TableCell>
        {monthDays.map((_, dayIndex) => {
          const totalByDay = expenseCategories
            .reduce((acc, category) => {
              const dayValue =
                value?.[category as keyof ExpenseFormType["rowExpenseData"]]?.[
                  dayIndex
                ];

              return acc + Number(dayValue || 0);
            }, 0)
            .toFixed(0);
          return (
            <TableCell
              key={dayIndex}
              className="p-0 text-center text-xs font-bold"
            >
              {totalByDay}
            </TableCell>
          );
        })}
        <TableCell className="font-bold text-end px-2 py-0.5">
          {expenseCategories
            .reduce((acc, category) => {
              const rowTotal =
                value?.[
                  category as keyof ExpenseFormType["rowExpenseData"]
                ]?.reduce((rowAcc, val) => rowAcc + Number(val || 0), 0) || 0;

              return acc + rowTotal;
            }, 0)
            .toFixed(0)}
        </TableCell>
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
                <TableCell key={dayIndex} className="p-0 text-center border-x">
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
