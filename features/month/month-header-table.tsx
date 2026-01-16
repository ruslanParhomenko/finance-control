import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getMonthDays } from "@/utils/get-month-days";
const MONTH_STRINGS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
  ``,
];

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
    <TableHeader className="sticky top-0 z-10 bg-background">
      <TableRow className="md:h-10 h-8">
        <TableCell
          colSpan={2}
          className="p-0 px-1 front-bold text-center text-xs sticky left-0 bg-background"
        >
          {MONTH_STRINGS[parseInt(month) - 1].toUpperCase()} : {currencyRates}
        </TableCell>

        {monthDays.map((day) => {
          return (
            <TableCell key={day.day} className={"w-12 cursor-pointer p-0"}>
              <div
                className={cn(
                  "md:text-sm text-xs font-semibold text-center",
                  day.day === todayDay && "text-blue-900",
                )}
              >
                {day.day}
              </div>
              <div className="text-xs text-muted-foreground text-center">
                {day.weekday}
              </div>
            </TableCell>
          );
        })}
        <TableCell className="md:w-30" />
      </TableRow>
    </TableHeader>
  );
}
