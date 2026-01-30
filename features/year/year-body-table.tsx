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
import { YearMonthlyRates } from "@/app/action/get-currency-year";

export type Currency = "EUR" | "USD" | "MDL";

type Props = {
  data: GetExpenseDataType[];
  currency: Currency;
  initialState: InitialStateFormType;
  bankData?: GetBankDataType[];
  currencyRates: YearMonthlyRates;
};

export default function YearBodyTable({
  data,
  currency,
  initialState,
  bankData,
  currencyRates,
}: Props) {
  const currencyArray = currencyRates[currency as "USD" | "EUR" | "MDL"];
  const value = calculateCategoryTotalsByMonths(data, currencyArray);
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
        currencyArray={currencyArray}
        currency={currency}
        bankData={bankData}
        currencyRates={currencyRates}
      />
    </TableBody>
  );
}
