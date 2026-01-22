import { GetExpenseDataType } from "@/app/action/month-data-actions";
import RowBodyRender from "@/components/table/row-body-render";
import RowFooterRender from "@/components/table/row-footer-render";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { addCash, expenseCategories } from "@/constants/expense";
import { cn } from "@/lib/utils";
import {
  calculateCategoryTotalsByMonths,
  calculateOverallTotals,
  calculateTotals,
} from "@/utils/category-totals";
import { MONTHS } from "@/utils/get-month-days";
import { CURRENCY_ICON } from "../month/constants";
import { InitialStateFormType } from "../initial-state/schema";
import { GetBankDataType } from "@/app/action/bank-data-actions";

export type Currency = "EUR" | "USD" | "MDL";

type Props = {
  data: GetExpenseDataType[];
  currencyRates: number[];
  currency: Currency;
  currentRatesEUR: number;
  currentRatesUSD: number;
  initialState: InitialStateFormType;
  bankData?: GetBankDataType[];
};

export default function YearBodyTable({
  data,
  currencyRates,
  currency,
  currentRatesEUR,
  currentRatesUSD,
  initialState,
  bankData,
}: Props) {
  console.log("bankData", bankData);

  const value = calculateCategoryTotalsByMonths(data, currencyRates);
  const totals = value ? calculateTotals(value) : undefined;

  const { expenseTotal, addCashTotal } = calculateOverallTotals(totals ?? {});

  const difference = addCashTotal - expenseTotal;

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

  const remainingByMonth: number[] = [];

  monthlyDiff.reduce((currentBank, diff, index) => {
    const nextBank = currentBank + diff;
    remainingByMonth[index] = nextBank;
    return nextBank;
  }, initialBank);

  const diffClass = difference > 0 ? "text-green-600" : "text-red-600";

  return (
    <TableBody>
      <RowBodyRender
        rowArray={expenseCategories}
        cellArray={MONTHS}
        currencyRates="1"
        currency={currency}
        totals={totals}
        value={value}
      />

      <RowFooterRender
        rowArray={expenseCategories}
        cellArray={MONTHS}
        currencyRates="1"
        currency={currency}
        totals={expenseTotal}
        value={value}
      />

      <RowBodyRender
        rowArray={addCash}
        cellArray={MONTHS}
        currencyRates="1"
        currency={currency}
        totals={totals}
        value={value}
      />

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
                <span>{bankValue}</span>
                <span
                  className={cn(diff > 0 ? "text-green-600" : "text-red-600")}
                >
                  {diff.toFixed(0)}
                </span>
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableBody>
  );
}
