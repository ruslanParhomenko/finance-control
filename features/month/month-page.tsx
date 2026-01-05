"use client";
import { Table } from "@/components/ui/table";
import MonthHeaderTable from "./month-header-table";
import { getMonthDays } from "@/utils/get-month-days";
import { FormWrapper } from "@/components/wrapper/form-wrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import { defaultExpenseForm, ExpenseFormType } from "./schema";
import MonthBodyTable from "./month-body-table";
import { useEffect } from "react";
import { expenseCategories } from "@/constants/expense";

export default function MonthPage({
  expenseData,
  month,
  year,
}: {
  expenseData?: ExpenseFormType & { id: string };
  month: string;
  year: string;
}) {
  const form = useForm<ExpenseFormType>({
    defaultValues: defaultExpenseForm,
  });
  const monthDays = getMonthDays({ month, year });
  const onSubmit: SubmitHandler<ExpenseFormType> = (data) => {
    console.log("Submitted data:", data);
  };

  useEffect(() => {
    if (expenseData) return;

    const makeArray = () => Array(monthDays.length).fill("");

    const newRowCashData = Object.fromEntries(
      expenseCategories.map((category) => [category, makeArray()])
    );

    form.setValue("rowExpense", newRowCashData);
  }, [expenseData, month, year]);

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      className="flex flex-col h-[90vh] w-full"
    >
      <Table>
        <MonthHeaderTable month={month} monthDays={monthDays} />
        <MonthBodyTable form={form} monthDays={monthDays} />
      </Table>
    </FormWrapper>
  );
}
