import { TableCell, TableRow } from "@/components/ui/table";

export default function RemainingRowFooter({
  remainingByMonth,
}: {
  remainingByMonth: number[];
}) {
  const roundSafe = (value: number) => Number(value.toFixed(0)) || 0;

  const difference = remainingByMonth.reduce(
    (sum, val) => sum + Number(val),
    0,
  );

  return (
    <TableRow className="border-0 [&>td]:p-0">
      <TableCell className="bg-background sticky left-0 z-10 text-end text-xs">
        {roundSafe(difference)}
      </TableCell>

      <TableCell className="bg-background sticky left-11" />

      {remainingByMonth.map((diff, index) => (
        <TableCell key={index} className="h-6.5 text-center text-xs">
          {roundSafe(diff)}
        </TableCell>
      ))}
    </TableRow>
  );
}
