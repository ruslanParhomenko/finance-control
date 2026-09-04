"use client";
import { Table } from "@/components/ui/table";
import MonthHeaderTable from "./month-header-table";
import { getMonthDays } from "@/utils/get-month-days";
import { FormWrapper } from "@/components/wrapper/form-wrapper";

import { useEffect } from "react";
import { expenseCategories } from "@/constants/expense";

import { CurrencyRatesByMonth } from "@/type/currency-data";
import { ParamsValue } from "@/type/params-value";
import useMonthForm from "../hooks/use-month-form";
import MonthBodyCreate from "./month-body-create";
import { GetExpenseDataType } from "../actions/get-expense";

export default function MonthEditPage({
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

  const { form, onSubmit } = useMonthForm({
    month,
    year,
    currencyRatesByMonth,
  });

  useEffect(() => {
    if (expenseDataByMonth) return;

    const makeArray = () => Array(monthDays.length).fill("");

    const newRowCashData = {
      ...Object.fromEntries(
        expenseCategories.map((category) => [category, makeArray()]),
      ),
      "add-cash": makeArray(),
    };

    form.setValue("rowExpenseData", newRowCashData);
  }, [expenseDataByMonth, month, year]);

  useEffect(() => {
    if (!expenseDataByMonth) return;

    form.reset({
      rowExpenseData: expenseDataByMonth.data.dataExpense,
    });
  }, [expenseDataByMonth, month, year, form]);

  return (
    <FormWrapper form={form} onSubmit={onSubmit} className="md:px-4">
      <Table className="table-fixed">
        <MonthHeaderTable
          month={month}
          monthDays={monthDays}
          currencyRates={
            currencyRatesByMonth[currency as keyof CurrencyRatesByMonth]
          }
        />

        <MonthBodyCreate
          form={form}
          monthDays={monthDays}
          currencyRates={
            currencyRatesByMonth[currency as keyof CurrencyRatesByMonth]
          }
          currency={currency}
        />
      </Table>
    </FormWrapper>
  );
}
