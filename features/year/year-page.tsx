import { ExpenseDataType } from "@/app/action/month-data-actions";
import { Table } from "@/components/ui/table";
import YearHeaderTable from "./year-header-table";
import YearBodyTable, { Currency } from "./year-body-table";
import { ViewTransition } from "react";
import { InitialStateFormType } from "../initial-state/schema";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import { YearMonthlyRates } from "@/app/action/get-currency-year";

export default function YearPage({
  data,
  year,
  currency,
  initialState,
  bankData,
  currencyRates,
}: {
  data: ExpenseDataType[];
  year: string;
  currency: Currency;
  initialState: InitialStateFormType;
  bankData?: GetBankDataType[];
  currencyRates: YearMonthlyRates;
}) {
  return (
    <ViewTransition>
      <Table className="table-fixed">
        <YearHeaderTable
          year={year}
          currency={currency}
          currencyRates={currencyRates}
        />
        <YearBodyTable
          data={data}
          currency={currency}
          initialState={initialState}
          bankData={bankData}
          currencyRates={currencyRates}
        />
      </Table>
    </ViewTransition>
  );
}
