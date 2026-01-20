import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MONTH_STRINGS, MONTHS } from "@/utils/get-month-days";
import { CURRENCY_ICON } from "../month/constants";

export default function YearHeaderTable({
  year,
  currency,
}: {
  year: string;
  currency: string;
}) {
  const todayMonth = new Date().getMonth() + 1;
  return (
    <TableHeader className="bg-background sticky top-0 z-10">
      <TableRow className="md:h-10">
        <TableCell className="bg-background sticky left-0 w-12 text-end text-xs">
          {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
        </TableCell>
        <TableCell className="front-bold bg-background sticky left-11 w-20 p-0 px-2 text-start text-xs">
          {year}
        </TableCell>

        {MONTHS.map((month) => {
          return (
            <TableCell key={month} className={"w-12 cursor-pointer p-0"}>
              <div
                className={cn(
                  "text-center text-xs font-semibold md:text-sm",
                  Number(month) === todayMonth && "text-blue-900",
                )}
              >
                {month}
              </div>
              <div className="text-muted-foreground text-center text-xs">
                {MONTH_STRINGS[Number(month) - 1].toLowerCase().slice(0, 3)}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}
