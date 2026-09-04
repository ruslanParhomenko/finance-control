"use server";

import { EXPENSE_ACTION_TAG } from "@/constants/action-tag";
import { ExpenseFormType } from "@/features/month/model/schema";
import { getYearMonthDoc } from "@/lib/firebase-doc";
import { CurrencyRatesByMonth } from "@/type/currency-data";
import { updateTag } from "next/cache";

const actionTag = EXPENSE_ACTION_TAG;

export type ExpenseFormData = {
  year: string;
  month: string;
  dataExpense: ExpenseFormType["rowExpenseData"];
  difference: string;
  currencyRates: CurrencyRatesByMonth;
};

// create
export async function createExpenseMonth(data: ExpenseFormData) {
  const { year, month } = data;

  const docRef = getYearMonthDoc(actionTag, year, month);
  await docRef.set({ data });

  updateTag(actionTag);
  return docRef.id;
}
