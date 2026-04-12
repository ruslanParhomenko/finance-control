import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MONTHS } from "@/utils/get-month-days";
import { CURRENCY_ICON } from "../month/constants";
import { Currency } from "./year-body-table";
import { GetBankDataType } from "@/app/action/bank-data-actions";

type Props = {
  initialState: number;
  currencyArray: number[];
  currency: Currency;
  bankData?: GetBankDataType[];
  remainingByMonth: number[];
};

export default function YearResultTable({
  initialState,
  currencyArray,
  currency,
  bankData,
  remainingByMonth,
}: Props) {
  const calculateMonthlyBalance = (initial: number, diffs: number[]) => {
    let sum = initial;

    return diffs.map((val) => (sum += Number(val || 0)));
  };

  const totalByMonth = calculateMonthlyBalance(initialState, remainingByMonth);
  const difference = remainingByMonth.reduce(
    (sum, val) => sum + Number(val),
    0,
  );

  const finalBank = difference + initialState;
  const diffClass = difference > 0 ? "text-green-600" : "text-red-600";

  return (
    <>
      <TableRow className="border-0">
        <TableCell
          className={cn(
            "bg-background sticky left-0 z-10 px-1 py-0.5 text-end text-xs font-bold",
            diffClass,
          )}
        >
          {difference.toFixed(0)} {CURRENCY_ICON[currency]}
        </TableCell>

        <TableCell className="bg-background sticky left-13.5" />

        {remainingByMonth.map((diff, index) => (
          <TableCell
            key={index}
            className={cn("py-0.5 text-center text-xs", diffClass)}
          >
            {diff.toFixed(0)}
            {CURRENCY_ICON[currency]}
          </TableCell>
        ))}
      </TableRow>

      <TableRow className="border-0">
        <TableCell
          className={cn(
            "bg-background text-md sticky left-0 z-10 px-1 py-0.5 text-end font-bold",
          )}
        >
          {finalBank} {CURRENCY_ICON[currency]}
        </TableCell>

        <TableCell className="bg-background sticky left-13.5" />

        {totalByMonth.map((value, index) => (
          <TableCell key={index} className="py-0 text-center text-xs">
            {value.toFixed(0)}
            {CURRENCY_ICON[currency]}
          </TableCell>
        ))}
      </TableRow>
      <TableRow className="border-0">
        <TableCell
          className={cn(
            "bg-background sticky left-0 z-10 px-1 py-0.5 text-end text-xs font-bold",
            diffClass,
          )}
        />

        <TableCell className="bg-background sticky left-13.5" />

        {MONTHS?.map((value, index) => {
          const rate = Number(currencyArray[index]) || 1;
          const total =
            Number(bankData?.find((i) => i.month === value)?.totals) || 0;

          const bankValue = Number((total / rate).toFixed(0));
          const diff = bankValue - Number(totalByMonth[index]);

          return (
            <TableCell
              key={index}
              className={cn(
                "py-0 text-center text-xs",
                diff > 0 ? "text-green-600" : "text-red-600",
                (bankValue === 0 || diff === 0) && "hidden",
              )}
            >
              {diff.toFixed(0)}
              {CURRENCY_ICON[currency]}
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
}
