import { TableCell, TableRow } from "@/components/ui/table";
import { getMonthDays } from "@/utils/get-month-days";
import { ExpenseFormType, ExpenseFormTypeInput } from "./schema";
import React from "react";
import NumericInput from "@/components/input/numeric-input";
import { UseFormReturn } from "react-hook-form";
import { handleTableNavigation } from "@/utils/handleTableNavigation";
import { cn } from "@/lib/utils";
import { CURRENCY_ICON } from "./constants";

export default function RenderRow({
  dataRow,
  monthDays,
  form,
  viewTotalByDay = false,
  currencyRates,
  currency,
}: {
  dataRow: readonly string[];
  monthDays: ReturnType<typeof getMonthDays> | [];
  form: UseFormReturn<ExpenseFormTypeInput>;
  viewTotalByDay?: boolean;
  currencyRates: string;
  currency: string;
}) {
  const { register, watch } = form;
  const value = watch("rowExpenseData");
  return (
    <>
      {dataRow.map((row, index) => {
        const total = (
          value?.[row as keyof ExpenseFormType["rowExpenseData"]] as string[]
        )
          ?.reduce((acc: number, val: string) => acc + Number(val || 0), 0)
          .toFixed(0);
        return (
          <TableRow key={index + row}>
            <TableCell className="w-8 p-0 px-1 text-end text-blue-700 sticky left-0 z-20 bg-background">
              {(Number(total) / Number(currencyRates)).toFixed(0)}{" "}
              {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
            </TableCell>
            <TableCell
              className={
                "w-8 font-medium sticky left-11  text-start  p-0 px-1 bg-background"
              }
            >
              {row}
            </TableCell>

            {monthDays.map((_, dayIndex) => {
              return (
                <React.Fragment key={dayIndex}>
                  <TableCell className="border-x p-0 md:hidden">
                    <NumericInput
                      fieldName={`rowExpenseData.${row}.${dayIndex}`}
                      className="border-0 shadow-none rounded-none w-10 h-6.5 text-center text-md"
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
                      {...register(`rowExpenseData.${row}.${dayIndex}`)}
                      className={
                        "border-0 h-6.5  p-0  text-center  shadow-none   w-10"
                      }
                      onKeyDown={(e) =>
                        handleTableNavigation(e, +index, dayIndex)
                      }
                    />
                  </TableCell>
                </React.Fragment>
              );
            })}
          </TableRow>
        );
      })}
      <TableRow className={cn(!viewTotalByDay && "hidden")}>
        <TableCell
          colSpan={2}
          className="font-semibold text-start px-2 py-0.5 sticky left-0 bg-background"
        >
          {dataRow
            .reduce((acc, category) => {
              const rowTotal =
                value?.[
                  category as keyof ExpenseFormType["rowExpenseData"]
                ]?.reduce((rowAcc, val) => rowAcc + Number(val || 0), 0) || 0;

              return acc + Number(rowTotal) / Number(currencyRates);
            }, 0)
            .toFixed(0)}{" "}
          {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
        </TableCell>
        {monthDays.map((_, dayIndex) => {
          const totalByDay = dataRow
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
              {(Number(totalByDay) / Number(currencyRates)).toFixed(0)}
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
}
