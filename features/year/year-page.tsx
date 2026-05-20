import { ExpenseDataType } from "@/app/action/month-data-actions";
import { Table } from "@/components/ui/table";
import YearHeaderTable from "./year-header-table";
import YearBodyTable, { Currency } from "./year-body-table";
import { ViewTransition } from "react";
import { InitialStateFormType } from "../initial-state/schema";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import { ParamsValue } from "@/type/params-value";
import { CurrencyData } from "@/type/currency-data";

export default function YearPage({
  expenseData,
  paramsValue,
  initialState,
  bankData,
  currencyData,
}: {
  expenseData: ExpenseDataType[] | null;
  paramsValue: ParamsValue;
  initialState: InitialStateFormType;
  bankData?: GetBankDataType[];
  currencyData: CurrencyData;
}) {
  const { year, currency } = paramsValue;
  const currencyArray = currencyData[currency as Currency];
  const initialStateByCurrency = {
    USD:
      (Number(initialState.initialState) * Number(currencyData.EUR[0])) /
      Number(currencyData.USD[0]),
    EUR: Number(initialState.initialState),
    MDL: Number(initialState.initialState) * Number(currencyData.EUR[0]),
  }[currency as Currency] as number;
  return (
    <ViewTransition>
      <Table className="table-fixed">
        <YearHeaderTable
          year={year}
          currency={currency}
          currencyArray={currencyArray}
        />
        <YearBodyTable
          data={expenseData ?? []}
          currency={currency}
          initialState={Number(initialStateByCurrency?.toFixed(0))}
          bankData={bankData}
          currencyArray={currencyArray}
        />
      </Table>
    </ViewTransition>
  );
}
