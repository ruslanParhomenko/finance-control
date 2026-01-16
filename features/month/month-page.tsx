"use client";
import { Table } from "@/components/ui/table";
import MonthHeaderTable from "./month-header-table";
import { getMonthDays } from "@/utils/get-month-days";
import { FormWrapper } from "@/components/wrapper/form-wrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  defaultExpenseForm,
  ExpenseFormType,
  ExpenseFormTypeInput,
  expenseSchema,
} from "./schema";
import MonthBodyTable from "./month-body-table";
import { useEffect } from "react";
import { expenseCategories } from "@/constants/expense";
import { createExpense, updateExpense } from "@/app/action/month-data-actions";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

export default function MonthPage({
  expenseData,
  month,
  year,
}: {
  expenseData?: ExpenseFormType & { id: string };
  month: string;
  year: string;
}) {
  const form = useForm<ExpenseFormTypeInput>({
    resolver: zodResolver(expenseSchema),
    defaultValues: expenseSchema.parse(expenseData || defaultExpenseForm),
  });
  const monthDays = getMonthDays({ month, year });
  const onSubmit: SubmitHandler<ExpenseFormType> = async (data) => {
    const formatData = { ...data, month, year, uniqueKey: `${year}-${month}` };

    if (expenseData?.id) {
      await updateExpense(expenseData.id as string, formatData);
      toast.success("Expense успешно обновлён!");

      return;
    } else {
      await createExpense(formatData);
      toast.success("Expense успешно создан!");

      return;
    }
  };

  useEffect(() => {
    if (expenseData) return;

    const makeArray = () => Array(monthDays.length).fill("");

    const newRowCashData = {
      ...Object.fromEntries(
        expenseCategories.map((category) => [category, makeArray()])
      ),
      "add-cash": makeArray(),
    };

    form.setValue("rowExpenseData", newRowCashData);
  }, [expenseData, month, year]);

  useEffect(() => {
    if (!expenseData) return;

    form.reset({
      ...expenseData,
    });
  }, [expenseData, month, year, form]);

  const formId = "month-expense-form";

  const isLoading = form.formState.isSubmitting;

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      formId={formId}
      disabled={isLoading}
    >
      <Table>
        <MonthHeaderTable month={month} monthDays={monthDays} />
        <MonthBodyTable form={form} monthDays={monthDays} />
      </Table>
    </FormWrapper>
  );
}
