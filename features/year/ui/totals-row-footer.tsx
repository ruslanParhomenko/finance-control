import { TableCell, TableRow } from "@/components/ui/table";

export default function TotalsRowFooter({
  totalsByMonth,
}: {
  totalsByMonth: number[];
}) {
  const roundSafe = (value: number) => Number(value.toFixed(0)) || 0;

  const finalBank = roundSafe(totalsByMonth[totalsByMonth.length - 1]);

  return (
    <TableRow className="border-0 text-green-600 [&>td]:p-0">
      <TableCell className="bg-background sticky left-0 z-10 text-xs">
        {finalBank}
      </TableCell>

      <TableCell className="bg-background sticky left-9" />

      {totalsByMonth.map((value, index) => (
        <TableCell key={index} className="py-0 text-center text-xs">
          {roundSafe(value)}
        </TableCell>
      ))}
    </TableRow>
  );
}
