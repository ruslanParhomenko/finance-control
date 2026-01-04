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
];

export default function MonthHeaderTable({
  month,
  monthDays,
}: {
  month: string;
  monthDays: ReturnType<typeof getMonthDays> | [];
}) {
  const todayDay = new Date().getDate();
  return (
    <TableHeader>
      <TableRow className="h-10">
        <TableCell
          colSpan={2}
          className="p-0 px-1 front-bold text-center text-xs"
        >
          {MONTH_STRINGS[parseInt(month) - 1].toUpperCase()}
        </TableCell>

        {monthDays.map((day) => {
          return (
            <TableCell
              key={day.day}
              className={cn(
                "w-12 cursor-pointer p-0 ",
                day.day === todayDay && "text-blue-900 front-bold"
              )}
            >
              <div className="text-sm font-semibold text-center">{day.day}</div>
              <div className="text-xs text-muted-foreground text-center">
                {day.weekday}
              </div>
            </TableCell>
          );
        })}
        <TableCell />
      </TableRow>
    </TableHeader>
  );
}
