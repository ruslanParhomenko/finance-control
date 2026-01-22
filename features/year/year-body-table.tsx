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

export type Currency = "EUR" | "USD" | "MDL";

type Props = {
  data: GetExpenseDataType[];
  currencyRates: number[];
  currency: Currency;
  currentRatesEUR: number;
  currentRatesUSD: number;
  initialState: InitialStateFormType;
};

export default function YearBodyTable({
  data,
  currencyRates,
  currency,
  currentRatesEUR,
  currentRatesUSD,
  initialState,
}: Props) {
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

      <TableRow>
        <TableCell
          className={cn(
            "bg-background sticky left-0 z-10 px-1 py-0.5 text-end text-xs font-bold",
            diffClass,
          )}
        >
          {difference.toFixed(0)} {CURRENCY_ICON[currency]}
        </TableCell>

        <TableCell className="bg-background sticky left-13.5 z-10" />

        {monthlyDiff.map((diff, index) => (
          <TableCell
            key={index}
            className="text-muted-foreground py-0.5 text-center text-xs"
          >
            {diff.toFixed(0)}
          </TableCell>
        ))}
      </TableRow>

      <TableRow>
        <TableCell
          className={cn(
            "bg-background sticky left-0 z-10 px-1 py-0.5 text-end text-xs font-bold",
            diffClass,
          )}
        >
          {(initialBank + difference).toFixed(0)} {CURRENCY_ICON[currency]}
        </TableCell>

        <TableCell className="bg-background sticky left-13.5 z-10" />

        {remainingByMonth.map((value, index) => (
          <TableCell
            key={index}
            className="text-muted-foreground py-0 text-center text-xs"
          >
            {value.toFixed(0)}
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  );
}
