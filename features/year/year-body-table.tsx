import { ExpenseDataType } from "@/app/action/month-data-actions";
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
import { GetBankDataType } from "@/app/action/bank-data-actions";
import YearResultTable from "./year-result-table";

export type Currency = "EUR" | "USD" | "MDL";

type Props = {
  data: ExpenseDataType[];
  currency: Currency;
  initialState: number;
  bankData?: GetBankDataType[];
  currencyArray: number[];
};

export default function YearBodyTable({
  data,
  currency,
  initialState,
  bankData,
  currencyArray,
}: Props) {
  const value = calculateCategoryTotalsByMonths(data, currencyArray);
  const totals = value ? calculateTotals(value) : undefined;

  const remainingByMonth = MONTHS.map((_, monthIndex) => {
    const monthData = data[monthIndex];
    const remaining =
      Number(monthData?.difference || 0) / Number(currencyArray?.[monthIndex]);
    return Number(remaining.toFixed(0));
  });

  const { expenseTotal } = calculateOverallTotals(totals ?? {});

  return (
    <TableBody>
      <RowBodyRender
        rowArray={expenseCategories}
        cellArray={MONTHS}
        currencyRates={1}
        currency={currency}
        totals={totals}
        value={value}
      />

      <RowFooterRender
        rowArray={expenseCategories}
        cellArray={MONTHS}
        currencyRates={1}
        currency={currency}
        totals={expenseTotal}
        value={value}
      />

      <RowBodyRender
        rowArray={addCash}
        cellArray={MONTHS}
        currencyRates={1}
        currency={currency}
        totals={totals}
        value={value}
      />
      <YearResultTable
        initialState={initialState}
        currencyArray={currencyArray}
        currency={currency}
        bankData={bankData}
        remainingByMonth={remainingByMonth}
      />
    </TableBody>
  );
}
