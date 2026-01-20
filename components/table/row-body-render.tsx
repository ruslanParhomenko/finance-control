import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import NumericInput from "@/components/input/numeric-input";
import { UseFormReturn } from "react-hook-form";
import { handleTableNavigation } from "@/utils/table-navigation";
import { CURRENCY_ICON } from "@/features/month/constants";
import { ExpenseFormTypeInput } from "@/features/month/schema";

export default function RowBodyRender({
  rowArray,
  cellArray,
  currencyRates,
  currency,
  form,
  totals,
  value,
}: {
  rowArray: readonly string[];
  cellArray: string[];
  currencyRates: string;
  currency: string;
  form?: UseFormReturn<ExpenseFormTypeInput>;
  totals: Record<string, number> | undefined;
  value?: Record<string, (string | undefined)[] | undefined> | undefined;
}) {
  const register = form?.register;
  return (
    <>
      {rowArray.map((row, index) => {
        return (
          <TableRow key={index + row} className="h-7!">
            <TableCell className="bg-background sticky left-0 z-10 text-end text-xs font-bold text-blue-700">
              {(Number(totals?.[row]) / Number(currencyRates)).toFixed(0)}{" "}
              {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
            </TableCell>
            <TableCell
              className={
                "bg-background sticky left-11 text-start text-xs font-medium"
              }
            >
              {row}
            </TableCell>

            {cellArray.map((_, dayIndex) => {
              return (
                <React.Fragment key={dayIndex}>
                  <TableCell className="border-x p-0 text-center md:hidden">
                    {register && !value && (
                      <NumericInput
                        fieldName={`rowExpenseData.${row}.${dayIndex}`}
                        className="text-md h-6 w-10 rounded-none border-0 text-center text-xs shadow-none"
                      />
                    )}
                    <span className="text-center text-xs shadow-none">
                      {(!register && value && value[row]?.[dayIndex]) || ""}
                    </span>
                  </TableCell>
                  <TableCell
                    key={dayIndex}
                    className="hidden border-x text-center md:table-cell md:py-1"
                  >
                    {register && !value && (
                      <input
                        type="text"
                        data-row={index}
                        data-col={dayIndex}
                        {...register(`rowExpenseData.${row}.${dayIndex}`)}
                        className={
                          "h-6 w-10 border-0 p-0 text-center text-xs shadow-none"
                        }
                        onKeyDown={(e) =>
                          handleTableNavigation(e, +index, dayIndex)
                        }
                      />
                    )}
                    <span className="h-6.5 w-10 border-0 p-0 text-center text-xs shadow-none">
                      {(!register && value && value[row]?.[dayIndex]) || ""}
                    </span>
                  </TableCell>
                </React.Fragment>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
}
