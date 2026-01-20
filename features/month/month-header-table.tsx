import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getMonthDays, MONTH_STRINGS } from "@/utils/get-month-days";
import { Table } from "lucide-react";

export default function MonthHeaderTable({
  month,
  monthDays,
  currencyRates,
}: {
  month: string;
  monthDays: ReturnType<typeof getMonthDays> | [];
  currencyRates: string;
}) {
  const todayDay = new Date().getDate();
  return (
    <TableHeader className="bg-background sticky top-0 z-10">
      <TableRow className="md:h-10">
        <TableCell className="bg-background sticky left-0 w-12" />
        <TableCell className="front-bold bg-background sticky left-11 w-20 p-0 px-1 text-center text-xs">
          {MONTH_STRINGS[parseInt(month) - 1].toUpperCase()} : {currencyRates}
        </TableCell>

        {monthDays.map((day) => {
          return (
            <TableCell key={day.day} className={"w-12 cursor-pointer p-0"}>
              <div
                className={cn(
                  "text-center text-xs font-semibold md:text-sm",
                  day.day === todayDay && "text-blue-900",
                )}
              >
                {day.day}
              </div>
              <div className="text-muted-foreground text-center text-xs">
                {day.weekday}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}
