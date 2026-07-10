"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import NumericInput from "@/components/input/numeric-input";
import { UseFormReturn } from "react-hook-form";
import { handleTableNavigation } from "@/utils/table-navigation";
import { CURRENCY_ICON } from "@/features/month/constants";
import { ExpenseFormType } from "@/features/month/schema";
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
  currencyRates: number;
  currency: string;
  form?: UseFormReturn<ExpenseFormType>;
  totals: Record<string, number> | undefined;
  value?:
    Record<string, (string | number | undefined)[] | undefined> | undefined;
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
        const total = (Number(totals?.[row]) / Number(currencyRates)).toFixed(
          0,
        );
        return (
          <TableRow key={index + row} className="[&>td]:py-0">
            <TableCell className="bg-background sticky left-0 z-10 text-end text-xs font-bold text-blue-700 md:text-center md:text-sm">
              {isNaN(Number(total)) ? 0 : total}{" "}
              {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
            </TableCell>
            <TableCell
              className={cn(
                "bg-background sticky left-13.5 z-10 text-start text-xs font-medium md:text-sm",
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
                      "h-7.5 border-x px-0 text-center md:hidden",
                      selectedDay === dayIndex &&
                        selectedRow === index &&
                        "bg-border",
                    )}
                  >
                    {register && !value && (
                      <NumericInput
                        fieldName={`rowExpenseData.${row}.${dayIndex}`}
                        className="h-7.5 w-10 rounded-none border-0 text-center text-xs text-red-700 shadow-none"
                        onFocus={() => handleSelect(index, dayIndex)}
                        onBlur={() => handleSelect(null, null)}
                      />
                    )}
                    <span className="text-center text-xs shadow-none md:text-sm">
                      {(!register && value && value[row]?.[dayIndex]) || ""}
                    </span>
                  </TableCell>
                  <TableCell
                    key={dayIndex}
                    className={cn(
                      "hidden border-x p-0 text-center md:table-cell",
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
                          "h-9 w-10 border-0 text-center text-xs shadow-none"
                        }
                        onKeyDown={(e) =>
                          handleTableNavigation(e, +index, dayIndex)
                        }
                        onFocus={() => handleSelect(index, dayIndex)}
                        onBlur={() => handleSelect(null, null)}
                      />
                    )}
                    {!register && value && (
                      <div className="flex h-8 items-center justify-center md:h-8.5">
                        <span className="text-center text-xs md:text-sm">
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
