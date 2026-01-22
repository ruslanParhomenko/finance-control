import { GetExpenseDataType } from "@/app/action/month-data-actions";
import { Table } from "@/components/ui/table";
import YearHeaderTable from "./year-header-table";
import YearBodyTable, { Currency } from "./year-body-table";
import { ViewTransition } from "react";
import { InitialStateFormType } from "../initial-state/schema";

export default function YearPage({
  data,
  year,
  currencyRates,
  currency,
  currentRatesEUR,
  currentRatesUSD,
  initialState,
}: {
  data: GetExpenseDataType[];
  year: string;
  currencyRates: number[];
  currency: Currency;
  currentRatesEUR: number;
  currentRatesUSD: number;
  initialState: InitialStateFormType;
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
        />
      </ViewTransition>
    </Table>
  );
}
