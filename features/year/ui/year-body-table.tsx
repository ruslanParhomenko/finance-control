import { TableBody } from "@/components/ui/table";
import { addCash, expenseCategories } from "@/constants/expense";
import { MONTHS } from "@/utils/get-month-days";
import { calculateCategoryTotalsByMonths } from "../utils/get-totals-category-month";
import { calculateTotals } from "@/utils/calculate-totals";
import { GetExpenseDataType } from "@/features/month/actions/get-expense";
import { Currency } from "@/type/currency-data";
import RowYearBody from "./row-year-body";

type Props = {
  data: GetExpenseDataType[];
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
      <RowYearBody
        rowArray={expenseCategories}
        cellArray={MONTHS}
        currencyRates={1}
        currency={currency}
        totals={totals}
        value={value}
        withFooterTotals={true}
      />

      <RowYearBody
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
