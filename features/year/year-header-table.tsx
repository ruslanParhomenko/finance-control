import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MONTH_STRINGS, MONTHS } from "@/utils/get-month-days";
import { CURRENCY_ICON } from "../month/constants";

export default function YearHeaderTable({
  year,
  currency,
  currencyRates,
}: {
  year: string;
  currency: string;
  currencyRates: number[];
}) {
  const todayMonth = new Date().getMonth() + 1;
  return (
    <TableHeader className="bg-background sticky top-0 z-10">
      <TableRow className="md:h-10">
        <TableCell className="bg-background sticky left-0 w-14 text-end text-xs">
          {CURRENCY_ICON[currency as "USD" | "EUR" | "MDL"]}
        </TableCell>

        <TableCell className="front-bold bg-background sticky left-12 w-18 p-0 px-2 text-start text-xs">
          {year}
        </TableCell>

        {MONTHS.map((month, index) => (
          <TableCell key={month} className="w-12 cursor-pointer p-0">
            <div
              className={cn(
                "text-center text-xs md:text-sm",
                Number(month) === todayMonth && "text-blue-900",
              )}
            >
              {month}
            </div>

            <div className="text-muted-foreground text-center text-xs">
              {currency == "MDL" ? (
                MONTH_STRINGS[Number(month) - 1].toLowerCase().slice(0, 3)
              ) : (
                <span className="text-muted-foreground text-center text-[10px]">
                  {MONTH_STRINGS[Number(month) - 1].toLowerCase().slice(0, 1) +
                    ":" +
                    Number(currencyRates[index]).toFixed(2)}
                </span>
              )}
            </div>
          </TableCell>
        ))}
      </TableRow>
    </TableHeader>
  );
}
