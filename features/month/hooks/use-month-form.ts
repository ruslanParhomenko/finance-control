"use client";
import { calculateTotals } from "@/utils/calculate-totals";
import { calculateOverallTotals } from "@/utils/category-totals";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ExpenseFormType,
  expenseSchema,
  defaultExpenseForm,
} from "../model/schema";
import { CurrencyRatesByMonth } from "@/type/currency-data";
import { createExpenseMonth } from "../actions/create-expense";
import { useSetViewMode } from "@/hooks/use-set-view-mode";

export default function useMonthForm({
  month,
  year,
  currencyRatesByMonth,
}: {
  month: string;
  year: string;
  currencyRatesByMonth: CurrencyRatesByMonth;
}) {
  const setViewMode = useSetViewMode();

  const form = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseSchema),
    defaultValues: defaultExpenseForm,
  });

  const onSubmit: SubmitHandler<ExpenseFormType> = async (data) => {
    const totals = calculateTotals(data.rowExpenseData);
    const { expenseTotal, addCashTotal } = calculateOverallTotals(totals);

    const difference = Number(addCashTotal) - Number(expenseTotal);

    const formatData = {
      year,
      month,
      dataExpense: data.rowExpenseData,
      difference: String(difference),
      currencyRates: currencyRatesByMonth,
    };

    await createExpenseMonth(formatData);

    setViewMode();

    toast.success("Expense успешно обновлён!");
  };

  return {
    form,
    onSubmit,
  };
}
