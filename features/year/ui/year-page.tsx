import { ExpenseDataType } from "@/app/action/month-data-actions";
import { Table } from "@/components/ui/table";

import { GetBankDataType } from "@/app/action/bank-data-actions";
import { ParamsValue } from "@/type/params-value";
import { CurrencyData } from "@/type/currency-data";
import { MONTHS } from "@/utils/get-month-days";
import { GetInitialStateType } from "@/app/action/initial-state-actions";
import YearBodyTable, { Currency } from "./year-body-table";
import YearHeaderTable from "./year-header-table";
import YearFooterTable from "./year-footer-table";

export function YearPage({
  expenseData,
  paramsValue,
  initialState,
  bankData,
  currencyData,
}: {
  expenseData: ExpenseDataType[] | null;
  paramsValue: ParamsValue;
  initialState: GetInitialStateType | null;
  bankData: GetBankDataType[] | null;
  currencyData: CurrencyData;
}) {
  const { year, currency } = paramsValue;

  const currencyArray = MONTHS.reduce((acc: number[], month: string) => {
    const sortedExpenseData = [...(expenseData ?? [])].sort(
      (a, b) => Number(a.month) - Number(b.month),
    );
    const item = expenseData?.find((item) => +item.month === Number(month));

    const lastItem = sortedExpenseData[sortedExpenseData.length - 1];

    const currencyByItem = item
      ? Number(item.currencyRates[currency as Currency])
      : Number(lastItem?.currencyRates[currency as Currency]);
    const value = currencyByItem;
    return [...acc, value];
  }, []);

  const remainingByMonth = MONTHS.map((_, monthIndex) => {
    const monthData = expenseData?.[monthIndex];
    const remaining =
      Number(monthData?.difference || 0) / Number(currencyArray?.[monthIndex]);
    return Number(remaining.toFixed(0));
  });

  if (!expenseData) return null;

  return (
    <Table className="table-fixed">
      <YearHeaderTable year={year} currencyArray={currencyArray} />
      <YearBodyTable
        data={expenseData}
        currency={currency}
        currencyArray={currencyArray}
      />
      <YearFooterTable
        initialState={initialState}
        currencyArray={currencyArray}
        currency={currency}
        bankData={bankData}
        remainingByMonth={remainingByMonth}
        currencyData={currencyData}
      />
    </Table>
  );
}
