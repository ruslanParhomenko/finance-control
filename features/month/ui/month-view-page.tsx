import { Table } from "@/components/ui/table";
import { getMonthDays } from "@/utils/get-month-days";
import { ParamsValue } from "@/type/params-value";
import { GetExpenseDataType } from "../actions/get-expense";
import MonthViewBody from "./month-view-body";
import MonthHeader from "./month-header";

export function MonthViewPage({
  paramsValue,
  expenseDataByMonth,
}: {
  paramsValue: ParamsValue;
  expenseDataByMonth: GetExpenseDataType | null;
}) {
  const { month, year, currency } = paramsValue;

  const monthDays = getMonthDays({ month, year });
  const currencyRates = expenseDataByMonth?.data.currencyRates[currency] || 1;

  if (!expenseDataByMonth)
    return (
      <div className="flex h-full items-center justify-center text-red-600">
        not data
      </div>
    );
  return (
    <Table className="table-fixed">
      <MonthHeader
        month={month}
        monthDays={monthDays}
        currencyRates={currencyRates}
      />

      <MonthViewBody
        data={expenseDataByMonth?.data || null}
        monthDays={monthDays}
        currency={currency}
      />
    </Table>
  );
}
