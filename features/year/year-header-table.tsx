import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MONTH_STRINGS, MONTHS } from "@/utils/get-month-days";

export default function YearHeaderTable({ year }: { year: string }) {
  const todayMonth = new Date().getMonth() + 1;
  return (
    <TableHeader className="bg-background sticky top-0 z-10">
      <TableRow className="h-8 md:h-10">
        <TableCell
          colSpan={2}
          className="front-bold bg-background sticky left-0 p-0 px-1 text-center"
        >
          {year}
        </TableCell>

        {MONTHS.map((month) => {
          return (
            <TableCell key={month} className={"cursor-pointer p-0 px-0.5"}>
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
