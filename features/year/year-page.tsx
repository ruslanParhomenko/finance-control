import { ExpenseDataType } from "@/app/action/month-data-actions";
import { Table } from "@/components/ui/table";
import YearHeaderTable from "./year-header-table";
import YearBodyTable, { Currency } from "./year-body-table";
import { ViewTransition } from "react";
import { InitialStateFormType } from "../initial-state/schema";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import { YearMonthlyRates } from "@/app/action/get-currency-year";
import { ParamsValue } from "@/type/params-value";

export default function YearPage({
  expenseData,
  paramsValue,
  initialState,
  bankData,
  currencyYear,
}: {
  expenseData: ExpenseDataType[] | null;
  paramsValue: ParamsValue;
  initialState: InitialStateFormType;
  bankData?: GetBankDataType[];
  currencyYear: YearMonthlyRates;
}) {
  const { year, currency } = paramsValue;
  return (
    <ViewTransition>
      <Table className="table-fixed">
        <YearHeaderTable
          year={year}
          currency={currency}
          currencyRates={currencyYear}
        />
        <YearBodyTable
          data={expenseData ?? []}
          currency={currency}
          initialState={initialState}
          bankData={bankData}
          currencyRates={currencyYear}
        />
      </Table>
    </ViewTransition>
  );
}
