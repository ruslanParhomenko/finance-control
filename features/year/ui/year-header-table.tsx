import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MONTH_STRINGS, MONTHS } from "@/utils/get-month-days";

export default function YearHeaderTable({
  year,
  currencyArray,
}: {
  year: string;
  currencyArray: number[];
}) {
  return (
    <TableHeader>
      <TableRow>
        <TableCell className="bg-background sticky left-0 w-12" />

        <TableCell className="front-bold bg-background sticky left-12 w-16 p-0 px-3 text-start text-xs">
          {year}
        </TableCell>

        {MONTHS.map((month, index) => (
          <TableCell key={month} className="w-12 cursor-pointer p-0">
            <div className="text-muted-foreground text-center text-xs">
              {MONTH_STRINGS[Number(month) - 1].toLowerCase().slice(0, 3)}
            </div>
            <div className={cn("text-center text-xs md:text-sm")}>
              <div className="text-[9px] text-red-600 md:text-[11px]">
                {Number(currencyArray?.[index]).toFixed(2).toLowerCase()}
              </div>
            </div>
          </TableCell>
        ))}
      </TableRow>
    </TableHeader>
  );
}
