import { Table } from "@/components/ui/table";

import { GetBankDataType } from "@/app/action/bank-data-actions";
import { ParamsValue } from "@/type/params-value";
import { Currency, CurrencyData } from "@/type/currency-data";
import { MONTHS } from "@/utils/get-month-days";
import { GetInitialStateType } from "@/app/action/initial-state-actions";
import YearHeaderTable from "./year-header-table";
import YearFooterTable from "./year-footer-table";
import { GetExpenseDataType } from "@/features/month/actions/get-expense";
import YearBodyTable from "./year-body-table";

export function YearPage({
  expenseData,
  paramsValue,
  initialState,
  bankData,
  currencyData,
}: {
  expenseData: GetExpenseDataType[] | null;
  paramsValue: ParamsValue;
  initialState: GetInitialStateType | null;
  bankData: GetBankDataType[] | null;
  currencyData: CurrencyData;
}) {
  const { year, currency } = paramsValue;

  const currencyArray = MONTHS.reduce((acc: number[], month: string) => {
    const sortedExpenseData = [...(expenseData ?? [])].sort(
      (a, b) => Number(a.id) - Number(b.id),
    );
    const item = expenseData?.find((item) => +item.id === Number(month))?.data;

    const lastItem = sortedExpenseData[sortedExpenseData.length - 1].data;

    const currencyByItem = item
      ? Number(item.currencyRates[currency as Currency])
      : Number(lastItem?.currencyRates?.[currency as Currency]);
    const value = currencyByItem;
    return [...acc, value];
  }, []);

  const remainingByMonth = MONTHS.map((_, monthIndex) => {
    const monthData = expenseData?.find(
      (item) => +item.id === monthIndex + 1,
    )?.data;
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
