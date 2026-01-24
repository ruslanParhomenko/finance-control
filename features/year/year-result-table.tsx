import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MONTHS } from "@/utils/get-month-days";
import { CURRENCY_ICON } from "../month/constants";
import { InitialStateFormType } from "../initial-state/schema";
import { addCash, expenseCategories } from "@/constants/expense";
import { Currency } from "./year-body-table";
import { GetBankDataType } from "@/app/action/bank-data-actions";

type Props = {
  addCashTotal: number;
  expenseTotal: number;
  initialState: InitialStateFormType;
  value?:
    | Record<string, (string | number | undefined)[] | undefined>
    | undefined;
  currencyRates: number[];
  currency: Currency;
  currentRatesEUR: number;
  currentRatesUSD: number;
  bankData?: GetBankDataType[];
};

export default function YearResultTable({
  addCashTotal,
  expenseTotal,
  initialState,
  value,
  currencyRates,
  currency,
  currentRatesEUR,
  currentRatesUSD,
  bankData,
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

  const getInitialBank = (): number => {
    const base = Number(initialState.initialState) || 0;

    switch (currency) {
      case "MDL":
        return base * currentRatesEUR;
      case "USD":
        return (base * currentRatesEUR) / currentRatesUSD;
      default:
        return base;
    }
  };

  const initialBank = getInitialBank();

  const remainingByMonth: number[] = [];
  monthlyDiff.reduce((currentBank, diff, index) => {
    console.log(currentBank, diff);
    const nextBank = currentBank + diff;
    remainingByMonth[index] = diff === 0 ? 0 : nextBank;
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

        <TableCell className="bg-background sticky left-13.5 z-10 p-0 px-1 text-xs">
          remain
        </TableCell>

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
            "bg-background sticky left-0 z-10 px-1 py-0.5 text-end text-xs",
          )}
        >
          {(initialBank + difference).toFixed(0)} {CURRENCY_ICON[currency]}
        </TableCell>

        <TableCell className="bg-background sticky left-13.5 z-10 p-0 px-1 text-xs">
          final
        </TableCell>

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
        ></TableCell>

        <TableCell className="bg-background sticky left-13.5 z-10 p-0 px-1 text-xs">
          bank
        </TableCell>

        {MONTHS?.map((value, index) => {
          const bankByMonth = bankData?.find((item) => item.month === value);
          const currencyRatesByMonth = currencyRates[index];
          const bankValue = (() => {
            const rate = Number(currencyRatesByMonth);
            const total = Number(bankByMonth?.totals);

            const safeRate = Number.isFinite(rate) && rate !== 0 ? rate : 1;

            const result = total / safeRate;

            return Number.isFinite(result) ? result.toFixed(0) : "0";
          })();

          const diff = Number(bankValue) - Number(remainingByMonth[index]);
          return (
            <TableCell
              key={index}
              className="py-0 text-center text-xs text-blue-700"
            >
              <div className="flex flex-col items-center">
                <span>
                  {bankValue}
                  {CURRENCY_ICON[currency]}
                </span>
                <span
                  className={cn(diff > 0 ? "text-green-600" : "text-red-600")}
                >
                  {bankValue === "0" ? "0" : diff.toFixed(0)}
                  {CURRENCY_ICON[currency]}
                </span>
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
}
