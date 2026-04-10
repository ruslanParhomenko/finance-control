import { addCash, expenseCategories } from "@/constants/expense";
import { z } from "zod";

const dayValueSchema = z.string();

const rowExpenseShape = {
  ...Object.fromEntries(
    expenseCategories.map((category) => [category, z.array(dayValueSchema)]),
  ),
  ...Object.fromEntries(
    addCash.map((category) => [category, z.array(dayValueSchema)]),
  ),
};

export const rowExpenseSchema = z.object(rowExpenseShape);

export type RowExpenseType = z.infer<typeof rowExpenseSchema>;

export const expenseSchema = z.object({
  rowExpenseData: rowExpenseSchema,
});

export type ExpenseFormType = z.infer<typeof expenseSchema>;

export const defaultExpenseForm = {
  rowExpenseData: {},
};
