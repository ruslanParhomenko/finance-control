import { ExpenseDataType } from "@/app/action/month-data-actions";
import RowBodyRender from "@/components/table/row-body-render";
import { TableBody } from "@/components/ui/table";
import { addCash, expenseCategories } from "@/constants/expense";

import { MONTHS } from "@/utils/get-month-days";
import { calculateCategoryTotalsByMonths } from "../utils/get-totals-category-month";
import { calculateTotals } from "@/utils/calculate-totals";

export type Currency = "EUR" | "USD" | "MDL";

type Props = {
  data: ExpenseDataType[];
  currency: Currency;
  currencyArray: number[];
};

export default function YearBodyTable({
  data,
  currency,
  currencyArray,
}: Props) {
  const value = calculateCategoryTotalsByMonths(data, currencyArray);
  const totals = calculateTotals(value);

  return (
    <TableBody>
      <RowBodyRender
        rowArray={expenseCategories}
        cellArray={MONTHS}
        currencyRates={1}
        currency={currency}
        totals={totals}
        value={value}
        withFooterTotals={true}
      />

      <RowBodyRender
        rowArray={addCash}
        cellArray={MONTHS}
        currencyRates={1}
        currency={currency}
        totals={totals}
        value={value}
      />
    </TableBody>
  );
}
