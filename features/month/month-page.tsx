import MonthViewPage from "./ui/month-view-page";
import { ParamsValue } from "@/type/params-value";
import MonthEditPage from "./ui/month-edit-page";
import { CurrencyRatesByMonth } from "@/type/currency-data";
import { GetExpenseDataType } from "./actions/get-expense";

export function MonthPage({
  paramsValue,
  expenseDataByMonth,
  currencyRatesByMonth,
  mode,
}: {
  paramsValue: ParamsValue;
  expenseDataByMonth: GetExpenseDataType | null;
  currencyRatesByMonth: CurrencyRatesByMonth;
  mode: "view" | "edit";
}) {
  if (mode === "edit") {
    return (
      <MonthEditPage
        paramsValue={paramsValue}
        expenseDataByMonth={expenseDataByMonth}
        currencyRatesByMonth={currencyRatesByMonth}
      />
    );
  }

  return (
    <MonthViewPage
      paramsValue={paramsValue}
      expenseDataByMonth={expenseDataByMonth}
      currencyRatesByMonth={currencyRatesByMonth}
    />
  );
}
