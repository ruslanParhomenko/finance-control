import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MONTHS } from "@/utils/get-month-days";
import { CURRENCY_ICON } from "../../month/constants";
import { Currency } from "./year-body-table";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import { CurrencyData } from "@/type/currency-data";
import { GetInitialStateType } from "@/app/action/initial-state-actions";

type Props = {
  initialState: GetInitialStateType | null;
  currencyArray: number[];
  currency: Currency;
  bankData?: GetBankDataType[];
  remainingByMonth: number[];
  currencyData: CurrencyData;
};

const roundSafe = (value: number) => Number(value.toFixed(0)) || 0;

export default function YearResultTable({
  initialState,
  currencyArray,
  currency,
  bankData,
  remainingByMonth,
  currencyData,
}: Props) {
  const initialStateInEur = initialState?.initialState?.EUR || 0;

  const initialStateByCurrency =
    Number(initialState?.initialState.MDL) / (currencyArray[0] || 1);

  const cumulativeDiff = remainingByMonth.reduce<number[]>(
    (acc, value, index) => {
      const previous = acc[index - 1] ?? 0;

      acc.push(previous + Number(value || 0));

      return acc;
    },
    [],
  );

  const getInitialStateForMonth = (index: number) => {
    if (currency === "MDL") {
      const monthRate = currencyData.EUR[index];

      return initialStateInEur * monthRate;
    }

    return initialStateByCurrency;
  };

  const totalByMonth = cumulativeDiff.map(
    (diffSum, index) => diffSum + getInitialStateForMonth(index),
  );

  const difference = remainingByMonth.reduce(
    (sum, val) => sum + Number(val),
    0,
  );

  const finalBank = roundSafe(
    totalByMonth[totalByMonth.length - 1] ??
      getInitialStateForMonth(Math.max(currencyArray.length - 1, 0)),
  );

  const diffClass =
    difference > 0
      ? "text-green-600"
      : difference < 0
        ? "text-red-600"
        : "text-muted-foreground";

  return (
    <>
      <TableRow className="border-0">
        <TableCell
          className={cn(
            "bg-background sticky left-0 z-10 px-1 py-0.5 text-end text-xs font-bold",
            diffClass,
          )}
        >
          {roundSafe(difference)} {CURRENCY_ICON[currency]}
        </TableCell>

        <TableCell className="bg-background sticky left-13.5" />

        {remainingByMonth.map((diff, index) => (
          <TableCell
            key={index}
            className={cn("py-0.5 text-center text-xs", diffClass)}
          >
            {roundSafe(diff)}
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
            {roundSafe(value)}
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
          const rate = Number(currencyArray?.[index]) || 1;

          const totalsRaw = bankData?.find((i) => i.id === value)?.dataBank
            .totals;
          const total = Number.isFinite(Number(totalsRaw))
            ? Number(totalsRaw)
            : 0;

          console.log("total", total);

          const bankValue = roundSafe(total / rate);

          console.log("bankValue", bankValue);

          // Может быть undefined, если MONTHS длиннее remainingByMonth
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
              <div>
                {bankValue}
                {CURRENCY_ICON[currency]}
              </div>
              <div>
                {diff}
                {CURRENCY_ICON[currency]}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
}
