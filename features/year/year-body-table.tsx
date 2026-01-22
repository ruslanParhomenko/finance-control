import { GetExpenseDataType } from "@/app/action/month-data-actions";
import RowBodyRender from "@/components/table/row-body-render";
import RowFooterRender from "@/components/table/row-footer-render";
import { TableBody } from "@/components/ui/table";
import { addCash, expenseCategories } from "@/constants/expense";
import {
  calculateCategoryTotalsByMonths,
  calculateOverallTotals,
  calculateTotals,
} from "@/utils/category-totals";
import { MONTHS } from "@/utils/get-month-days";
import { InitialStateFormType } from "../initial-state/schema";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import YearResultTable from "./year-result-table";

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
  const value = calculateCategoryTotalsByMonths(data, currencyRates);
  const totals = value ? calculateTotals(value) : undefined;

  const { expenseTotal, addCashTotal } = calculateOverallTotals(totals ?? {});

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
      <YearResultTable
        addCashTotal={addCashTotal}
        expenseTotal={expenseTotal}
        initialState={initialState}
        value={value}
        currencyRates={currencyRates}
        currency={currency}
        currentRatesEUR={currentRatesEUR}
        currentRatesUSD={currentRatesUSD}
        bankData={bankData}
      />
    </TableBody>
  );
}
