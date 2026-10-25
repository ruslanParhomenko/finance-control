import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { CURRENCY_ICON } from "@/features/month/model/constants";
import { cn } from "@/lib/utils";
import { MONTH_STRINGS, MONTHS } from "@/utils/get-month-days";

export default function YearHeaderTable({
  year,
  currencyArray,
  currency,
}: {
  year: string;
  currencyArray: number[];
  currency: string;
}) {
  return (
    <TableHeader>
      <TableRow>
        <TableCell className="bg-background sticky left-0 w-9">
          {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
        </TableCell>

        <TableCell className="front-bold bg-background sticky left-9 w-16 p-0 text-xs">
          {year}
        </TableCell>

        {MONTHS.map((month, index) => (
          <TableCell key={month} className="w-10 cursor-pointer p-0">
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
