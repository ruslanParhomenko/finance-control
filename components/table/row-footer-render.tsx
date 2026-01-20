import { TableCell, TableRow } from "@/components/ui/table";
import { CURRENCY_ICON } from "@/features/month/constants";

export default function RowFooterRender({
  rowArray,
  cellArray,
  currencyRates,
  currency,
  totals,
  value,
}: {
  rowArray: readonly string[];
  cellArray: string[];
  currencyRates: string;
  currency: string;
  totals: number;
  value?: Record<string, (string | undefined)[] | undefined> | undefined;
}) {
  return (
    <TableRow>
      <TableCell className="bg-background sticky left-0 px-2 py-0.5 text-end text-xs font-bold">
        {totals.toFixed(0)} {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
      </TableCell>
      <TableCell className="bg-background sticky left-11" />
      {cellArray.map((_, dayIndex) => {
        const totalByDay = rowArray
          .reduce((acc, category) => {
            const dayValue = value?.[category]?.[dayIndex];

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
  );
}
