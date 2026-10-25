import { TableCell, TableRow } from "@/components/ui/table";
import { CURRENCY_ICON } from "@/features/month/model/constants";
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
          <TableRow key={index + row} className="[&>td]:p-0">
            <TableCell className="bg-background sticky left-0 z-10 text-xs text-blue-700">
              {isNaN(Number(total)) ? 0 : total}{" "}
            </TableCell>
            <TableCell
              className={cn(
                "bg-background sticky left-9 z-10 text-start text-xs",
              )}
            >
              {row}
            </TableCell>

            {cellArray.map((_, dayIndex) => {
              const dayValue = Number(value?.[row]?.[dayIndex] || 0);
              return (
                <TableCell
                  key={dayIndex + row}
                  className={"h-6 border-x px-0 text-center md:h-8.5"}
                >
                  <span className="text-center text-xs shadow-none">
                    {dayValue === 0 ? "" : dayValue}
                  </span>
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
      {withFooterTotals && (
        <TableRow className="[&>td]:px-0 [&>td]:py-1 [&>td]:text-xs [&>td]:text-red-600">
          <TableCell className="bg-background sticky left-0 md:bg-transparent">
            {(Number(expenseTotal) / Number(currencyRates)).toFixed(0)}{" "}
          </TableCell>
          <TableCell className="bg-background sticky left-9 md:bg-transparent" />
          {cellArray.map((_, dayIndex) => {
            const totalByDay = rowArray
              .reduce((acc, category) => {
                const dayValue = value?.[category]?.[dayIndex];

                return acc + Number(dayValue || 0);
              }, 0)
              .toFixed(0);
            return (
              <TableCell key={dayIndex} className="text-center">
                {(Number(totalByDay) / Number(currencyRates)).toFixed(0)}
              </TableCell>
            );
          })}
        </TableRow>
      )}
    </>
  );
}
