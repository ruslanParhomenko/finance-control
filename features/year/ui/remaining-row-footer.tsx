import { TableCell, TableRow } from "@/components/ui/table";
import { CURRENCY_ICON } from "@/features/month/constants";

import { Currency } from "./year-body-table";

export default function RemainingRowFooter({
  remainingByMonth,
  currency,
}: {
  remainingByMonth: number[];
  currency: Currency;
}) {
  const roundSafe = (value: number) => Number(value.toFixed(0)) || 0;

  const difference = remainingByMonth.reduce(
    (sum, val) => sum + Number(val),
    0,
  );

  return (
    <TableRow className="border-0 [&>td]:px-0 [&>td]:py-0.5">
      <TableCell className="bg-background sticky left-0 z-10 text-center text-xs">
        {roundSafe(difference)} {CURRENCY_ICON[currency]}
      </TableCell>

      <TableCell className="bg-background sticky left-12" />

      {remainingByMonth.map((diff, index) => (
        <TableCell key={index} className="text-center text-xs">
          {roundSafe(diff)}
        </TableCell>
      ))}
    </TableRow>
  );
}
