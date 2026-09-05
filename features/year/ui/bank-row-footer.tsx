import { TableCell, TableRow } from "@/components/ui/table";
import { GetBankDataType } from "@/features/bank/model/type";
import { cn } from "@/lib/utils";
import { MONTHS } from "@/utils/get-month-days";

export default function BankRowFooter({
  totalByMonth,
  currencyArray,
  bankData,
}: {
  totalByMonth: number[];
  currencyArray: number[];
  bankData: GetBankDataType[] | null;
}) {
  const roundSafe = (value: number) => Number(value.toFixed(0)) || 0;
  return (
    <TableRow className="border-0">
      <TableCell className="bg-background sticky left-0 z-10 px-1 py-0.5 text-end text-xs font-bold" />

      <TableCell className="bg-background sticky left-13.5" />

      {MONTHS?.map((value, index) => {
        const rate = Number(currencyArray?.[index]) || 1;

        const totalsRaw = bankData?.find((i) => i.id === value)?.dataBank
          .totals;
        const total = Number.isFinite(Number(totalsRaw))
          ? Number(totalsRaw)
          : 0;

        const bankValue = roundSafe(total / rate);

        const monthTotal = totalByMonth[index];
        const diff =
          monthTotal !== undefined ? roundSafe(bankValue - monthTotal) : 0;

        return (
          <TableCell
            key={index}
            className={cn(
              "py-0 text-center text-xs",
              diff > 0 ? "text-green-600" : "text-red-600",
              (bankValue === 0 || diff === 0) && "text-muted",
            )}
          >
            <div>{diff}</div>
          </TableCell>
        );
      })}
    </TableRow>
  );
}
