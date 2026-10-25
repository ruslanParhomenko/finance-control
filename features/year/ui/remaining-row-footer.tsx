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
    <TableRow className="border-0 [&>td]:px-0 [&>td]:py-0.5">
      <TableCell className="bg-background sticky left-0 z-10 text-xs">
        {roundSafe(difference)}
      </TableCell>

      <TableCell className="bg-background sticky left-9" />

      {remainingByMonth.map((diff, index) => (
        <TableCell key={index} className="text-center text-xs">
          {roundSafe(diff)}
        </TableCell>
      ))}
    </TableRow>
  );
}
