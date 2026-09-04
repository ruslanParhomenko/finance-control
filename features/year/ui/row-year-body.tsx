"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import NumericInput from "@/components/input/numeric-input";
import { UseFormReturn } from "react-hook-form";
import { handleTableNavigation } from "@/utils/table-navigation";
import { CURRENCY_ICON } from "@/features/month/model/constants";
import { ExpenseFormType } from "@/features/month/model/schema";
import { cn } from "@/lib/utils";
import { calculateOverallTotals } from "@/utils/category-totals";

export default function RowYearBody({
  rowArray,
  cellArray,
  currencyRates,
  currency,
  totals,
  value,
  withFooterTotals = false,
}: {
  rowArray: readonly string[];
  cellArray: string[];
  currencyRates: number;
  currency: string;
  totals: Record<string, number> | undefined;
  value?:
    Record<string, (string | number | undefined)[] | undefined> | undefined;
  withFooterTotals?: boolean;
}) {
  const { expenseTotal } = calculateOverallTotals(totals ?? {});
  return (
    <>
      {rowArray.map((row, index) => {
        const total = (Number(totals?.[row]) / Number(currencyRates)).toFixed(
          0,
        );
        return (
          <TableRow
            key={index + row}
            className="[&>td]:px-0 [&>td]:py-1 md:[&>td]:py-2"
          >
            <TableCell className="bg-background sticky left-0 z-10 px-2 text-center text-xs font-bold text-blue-700">
              {isNaN(Number(total)) ? 0 : total}{" "}
              {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
            </TableCell>
            <TableCell
              className={cn(
                "bg-background sticky left-12 z-10 text-start text-xs",
              )}
            >
              {row}
            </TableCell>

            {cellArray.map((_, dayIndex) => {
              return (
                <TableCell
                  key={dayIndex + row}
                  className={cn("border-x px-0 text-center")}
                >
                  <span className="text-center text-xs shadow-none">
                    {value?.[row]?.[dayIndex]}
                  </span>
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
      {withFooterTotals && (
        <TableRow className="[&>td]:px-0 [&>td]:py-1 [&>td]:text-center [&>td]:text-xs [&>td]:text-red-600">
          <TableCell className="bg-background sticky left-0 font-bold md:bg-transparent">
            {(Number(expenseTotal) / Number(currencyRates)).toFixed(0)}{" "}
            {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
          </TableCell>
          <TableCell className="bg-background sticky left-12 md:bg-transparent" />
          {cellArray.map((_, dayIndex) => {
            const totalByDay = rowArray
              .reduce((acc, category) => {
                const dayValue = value?.[category]?.[dayIndex];

                return acc + Number(dayValue || 0);
              }, 0)
              .toFixed(0);
            return (
              <TableCell key={dayIndex} className="font-bold">
                {(Number(totalByDay) / Number(currencyRates)).toFixed(0)}{" "}
              </TableCell>
            );
          })}
        </TableRow>
      )}
    </>
  );
}
