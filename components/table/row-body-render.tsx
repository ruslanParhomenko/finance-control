"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import NumericInput from "@/components/input/numeric-input";
import { UseFormReturn } from "react-hook-form";
import { handleTableNavigation } from "@/utils/table-navigation";
import { CURRENCY_ICON } from "@/features/month/constants";
import { ExpenseFormTypeInput } from "@/features/month/schema";
import { cn } from "@/lib/utils";

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
  value?:
    | Record<string, (string | number | undefined)[] | undefined>
    | undefined;
}) {
  const register = form?.register;

  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const [selectedDay, setSelectedDay] = React.useState<number | null>(null);

  const handleSelect = (row: number | null, day: number | null) => {
    setSelectedRow(row);
    setSelectedDay(day);
  };
  return (
    <>
      {rowArray.map((row, index) => {
        return (
          <TableRow key={index + row}>
            <TableCell className="bg-background sticky left-0 z-10 p-0 px-2 text-end text-xs font-bold text-blue-700">
              {(Number(totals?.[row]) / Number(currencyRates)).toFixed(0)}{" "}
              {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
            </TableCell>
            <TableCell
              className={cn(
                "bg-background sticky left-13.5 p-0 px-1 py-1.25 text-start text-xs font-medium",
                selectedRow === index && "text-red-700",
              )}
            >
              {row}
            </TableCell>

            {cellArray.map((_, dayIndex) => {
              return (
                <React.Fragment key={dayIndex}>
                  <TableCell
                    className={cn(
                      "border-x p-0 text-center md:hidden",
                      selectedDay === dayIndex &&
                        selectedRow === index &&
                        "bg-border",
                    )}
                  >
                    {register && !value && (
                      <NumericInput
                        fieldName={`rowExpenseData.${row}.${dayIndex}`}
                        className="text-md h-6 w-10 rounded-none border-0 text-center text-xs shadow-none"
                        onFocus={() => handleSelect(index, dayIndex)}
                        onBlur={() => handleSelect(null, null)}
                      />
                    )}
                    <span className="text-center text-xs shadow-none">
                      {(!register && value && value[row]?.[dayIndex]) || ""}
                    </span>
                  </TableCell>
                  <TableCell
                    key={dayIndex}
                    className={cn(
                      "hidden border-x text-center md:table-cell",
                      selectedDay === dayIndex &&
                        selectedRow === index &&
                        "bg-border",
                    )}
                  >
                    {register && !value && (
                      <input
                        type="text"
                        data-row={index}
                        data-col={dayIndex}
                        {...register(`rowExpenseData.${row}.${dayIndex}`)}
                        className={
                          "border-0 p-0 text-center text-xs shadow-none md:h-5 md:w-10"
                        }
                        onKeyDown={(e) =>
                          handleTableNavigation(e, +index, dayIndex)
                        }
                        onFocus={() => handleSelect(index, dayIndex)}
                        onBlur={() => handleSelect(null, null)}
                      />
                    )}
                    {!register && value && (
                      <div className="flex h-5 w-full items-center justify-center">
                        <span className="text-xs">
                          {value[row]?.[dayIndex] || ""}
                        </span>
                      </div>
                    )}
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
