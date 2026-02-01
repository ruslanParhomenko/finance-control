import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MONTHS } from "@/utils/get-month-days";
import { CURRENCY_ICON } from "../month/constants";
import { InitialStateFormType } from "../initial-state/schema";
import { addCash, expenseCategories } from "@/constants/expense";
import { Currency } from "./year-body-table";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import { YearMonthlyRates } from "@/app/action/get-currency-year";

type Props = {
  addCashTotal: number;
  expenseTotal: number;
  initialState: InitialStateFormType;
  value?:
    | Record<string, (string | number | undefined)[] | undefined>
    | undefined;
  currencyArray: number[];
  currency: Currency;
  bankData?: GetBankDataType[];
  currencyRates: YearMonthlyRates;
};

export default function YearResultTable({
  addCashTotal,
  expenseTotal,
  initialState,
  value,
  currencyArray,
  currency,
  bankData,
  currencyRates,
}: Props) {
  const difference = addCashTotal - expenseTotal;
  const diffClass = difference > 0 ? "text-green-600" : "text-red-600";

  const monthlyDiff: number[] = MONTHS.map((_, monthIndex) => {
    const addCashSum = addCash.reduce(
      (acc, category) => acc + Number(value?.[category]?.[monthIndex] || 0),
      0,
    );

    const expenseSum = expenseCategories.reduce(
      (acc, category) => acc + Number(value?.[category]?.[monthIndex] || 0),
      0,
    );

    return addCashSum - expenseSum;
  });

  const getInitialBankByMonth = (monthIndex: number): number => {
    const base = Number(initialState.initialState) || 0;

    switch (currency) {
      case "MDL":
        return base * Number(currencyRates.EUR[monthIndex]);
      case "USD":
        return (
          (base * Number(currencyRates.EUR[monthIndex])) /
          Number(currencyRates.USD[monthIndex])
        );
      default:
        return base;
    }
  };

  const initialBank = getInitialBankByMonth(0);

  const remainingByMonth: number[] = [];

  monthlyDiff.reduce((currentBank, diff, index) => {
    const rate = Number(currencyArray[index]) || 1;

    const convertedDiff =
      currency === "MDL"
        ? diff * rate
        : currency === "USD"
          ? diff / rate
          : diff;

    const nextBank = currentBank + convertedDiff;

    remainingByMonth[index] = nextBank;
    return nextBank;
  }, initialBank);

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

        {monthlyDiff.map((diff, index) => (
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
          {(initialBank + difference).toFixed(0)} {CURRENCY_ICON[currency]}
        </TableCell>

        <TableCell className="bg-background sticky left-13.5" />

        {remainingByMonth.map((value, index) => (
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
          const diff = bankValue - Number(remainingByMonth[index]);

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
