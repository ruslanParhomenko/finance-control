// import { expenseCategories } from "@/constants/expense";
// import { z } from "zod";

// const dayValueSchema = z.string().default("");

// type ExpenseCategory = (typeof expenseCategories)[number];

// const rowExpenseShape = Object.fromEntries(
//   expenseCategories.map((category) => [
//     `${category}ByDay`,
//     z.array(dayValueSchema).default([]),
//   ])
// ) as Record<`${ExpenseCategory}ByDay`, z.ZodArray<typeof dayValueSchema>>;

// export const rowExpenseSchema = z.object(rowExpenseShape);

// export type RowExpenseType = z.infer<typeof rowExpenseSchema>;

// export const expenseSchema = z.object({
//   year: z.string().default(new Date().getFullYear().toString()),
//   month: z.string().default((new Date().getMonth() + 1).toString()),
//   rowExpense: rowExpenseSchema.default({}),
// });

// export type ExpenseFormType = z.infer<typeof expenseSchema>;

// export const defaultExpenseForm = expenseSchema.parse({});
