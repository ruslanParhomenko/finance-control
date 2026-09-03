import { TableCell, TableRow } from "@/components/ui/table";
import { CURRENCY_ICON } from "@/features/month/constants";
import { Currency } from "./year-body-table";

export default function TotalsRowFooter({
  totalsByMonth,
  currency,
}: {
  totalsByMonth: number[];
  currency: Currency;
}) {
  const roundSafe = (value: number) => Number(value.toFixed(0)) || 0;

  const finalBank = roundSafe(totalsByMonth[totalsByMonth.length - 1]);

  return (
    <TableRow className="border-0 text-green-600 [&>td]:px-0 [&>td]:py-0.5">
      <TableCell className="bg-background sticky left-0 z-10 text-center text-xs">
        {finalBank} {CURRENCY_ICON[currency]}
      </TableCell>

      <TableCell className="bg-background sticky left-12" />

      {totalsByMonth.map((value, index) => (
        <TableCell key={index} className="py-0 text-center text-xs">
          {roundSafe(value)}
        </TableCell>
      ))}
    </TableRow>
  );
}
