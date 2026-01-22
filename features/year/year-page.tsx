import { GetExpenseDataType } from "@/app/action/month-data-actions";
import { Table } from "@/components/ui/table";
import YearHeaderTable from "./year-header-table";
import YearBodyTable, { Currency } from "./year-body-table";
import { ViewTransition } from "react";
import { InitialStateFormType } from "../initial-state/schema";
import { GetBankDataType } from "@/app/action/bank-data-actions";

export default function YearPage({
  data,
  year,
  currencyRates,
  currency,
  currentRatesEUR,
  currentRatesUSD,
  initialState,
  bankData,
}: {
  data: GetExpenseDataType[];
  year: string;
  currencyRates: number[];
  currency: Currency;
  currentRatesEUR: number;
  currentRatesUSD: number;
  initialState: InitialStateFormType;
  bankData?: GetBankDataType[];
}) {
  return (
    <Table className="table-fixed">
      <ViewTransition>
        <YearHeaderTable
          year={year}
          currency={currency}
          currencyRates={currencyRates}
        />
        <YearBodyTable
          data={data}
          currencyRates={currencyRates}
          currency={currency}
          currentRatesEUR={currentRatesEUR}
          currentRatesUSD={currentRatesUSD}
          initialState={initialState}
          bankData={bankData}
        />
      </ViewTransition>
    </Table>
  );
}
