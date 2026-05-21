"use client";
import { Table } from "@/components/ui/table";
import MonthHeaderTable from "./month-header-table";
import { getMonthDays } from "@/utils/get-month-days";
import { FormWrapper } from "@/components/wrapper/form-wrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import { defaultExpenseForm, ExpenseFormType, expenseSchema } from "./schema";
import { useEffect } from "react";
import { expenseCategories } from "@/constants/expense";
import {
  createExpense,
  ExpenseDataType,
  updateExpense,
} from "@/app/action/month-data-actions";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { CurrencyData } from "@/type/currency-data";
import { ParamsValue } from "@/type/params-value";
import {
  calculateOverallTotals,
  calculateTotals,
} from "@/utils/category-totals";
import { useEdit } from "@/providers/edit-provider";
import MonthBodyCreate from "./month-body-create";
import MonthBodyData from "./month-body-data";

export default function MonthPage({
  paramsValue,
  expenseData,
  currencyData,
}: {
  paramsValue: ParamsValue;
  expenseData: ExpenseDataType[] | null;
  currencyData: CurrencyData;
}) {
  const { month, year, currency } = paramsValue;

  const { isEdit, setIsEdit } = useEdit();

  const currencyRates = {
    USD: currencyData.USD.find((_item, index) => index === Number(month) - 1)!,
    EUR: currencyData.EUR.find((_item, index) => index === Number(month) - 1)!,
    MDL: currencyData.MDL.find((_item, index) => index === Number(month) - 1)!,
  };

  const expenseDataByMonth =
    expenseData?.find((item) => item.month === month) || null;

  const form = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseSchema),
    defaultValues: defaultExpenseForm,
  });
  const monthDays = getMonthDays({ month, year });
  const onSubmit: SubmitHandler<ExpenseFormType> = async (data) => {
    const totals = calculateTotals(data.rowExpenseData);
    const { expenseTotal, addCashTotal } = calculateOverallTotals(totals);

    const difference = Number(addCashTotal) - Number(expenseTotal);

    const formatData = {
      ...data,
      difference: String(difference),
      currencyRates,
      month,
      year,
      uniqueKey: `${year}-${month}`,
    };

    if (expenseDataByMonth?.id) {
      await updateExpense(expenseDataByMonth.id as string, formatData);
      toast.success("Expense успешно обновлён!");
    } else {
      await createExpense(formatData);
      toast.success("Expense успешно создан!");
    }

    setIsEdit(false);
  };

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
    if (!expenseDataByMonth || !isEdit) return;

    form.reset({
      ...expenseDataByMonth,
    });
  }, [expenseDataByMonth, month, year, form, isEdit]);

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <Table className="table-fixed">
        <MonthHeaderTable
          month={month}
          monthDays={monthDays}
          currencyRates={currencyRates[currency] as number}
        />
        {isEdit && (
          <MonthBodyCreate
            form={form}
            monthDays={monthDays}
            currencyRates={currencyRates[currency] as number}
            currency={currency}
          />
        )}
        {!isEdit && (
          <MonthBodyData
            data={expenseDataByMonth}
            monthDays={monthDays}
            currencyRates={currencyRates[currency] as number}
            currency={currency}
          />
        )}
      </Table>
    </FormWrapper>
  );
}
