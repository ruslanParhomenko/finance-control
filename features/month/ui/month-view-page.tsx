import { Table } from "@/components/ui/table";
import MonthHeaderTable from "./month-header-table";
import { getMonthDays } from "@/utils/get-month-days";
import { ParamsValue } from "@/type/params-value";
import { CurrencyRatesByMonth } from "@/type/currency-data";
import MonthBodyData from "./month-body-data";
import { GetExpenseDataType } from "../actions/get-expense";

export default function MonthViewPage({
  paramsValue,
  expenseDataByMonth,
  currencyRatesByMonth,
}: {
  paramsValue: ParamsValue;
  expenseDataByMonth: GetExpenseDataType | null;
  currencyRatesByMonth: CurrencyRatesByMonth;
}) {
  const { month, year, currency } = paramsValue;

  const monthDays = getMonthDays({ month, year });

  return (
    <Table className="table-fixed">
      <MonthHeaderTable
        month={month}
        monthDays={monthDays}
        currencyRates={
          currencyRatesByMonth[currency as keyof CurrencyRatesByMonth]
        }
      />

      <MonthBodyData
        data={expenseDataByMonth?.data || null}
        monthDays={monthDays}
        currencyRates={
          currencyRatesByMonth[currency as keyof CurrencyRatesByMonth]
        }
        currency={currency}
      />
    </Table>
  );
}
