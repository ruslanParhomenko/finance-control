import { addCash, expenseCategories } from "@/constants/expense";
import { z } from "zod";

const dayValueSchema = z.string().default("");

const rowExpenseShape = {
  ...Object.fromEntries(
    expenseCategories.map((category) => [
      category,
      z.array(dayValueSchema).default([]),
    ]),
  ),
  ...Object.fromEntries(
    addCash.map((category) => [category, z.array(dayValueSchema).default([])]),
  ),
};

export const rowExpenseSchema = z.object(rowExpenseShape);

export type RowExpenseType = z.infer<typeof rowExpenseSchema>;

export const expenseSchema = z.object({
  uniqueKey: z.string().default(""),
  year: z.string().default(new Date().getFullYear().toString()),
  month: z.string().default((new Date().getMonth() + 1).toString()),
  rowExpenseData: rowExpenseSchema.default({}),
});

export type ExpenseFormType = z.infer<typeof expenseSchema>;
export type ExpenseFormTypeInput = z.input<typeof expenseSchema>;

export const defaultExpenseForm = expenseSchema.parse({});
