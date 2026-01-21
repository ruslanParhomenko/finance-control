import { z } from "zod";
import { bankCategories } from "./constants";

const rowBankShape = Object.fromEntries(
  bankCategories.map((c) => [
    c.name,
    z.object({
      currency: z.literal(c.currency),
      value: z.string().default(""),
    }),
  ]),
);

export const rowBankSchema = z.object(rowBankShape);

export const bankSchema = z.object({
  uniqueKey: z.string().default(""),
  year: z.string().default(new Date().getFullYear().toString()),
  month: z.string().default((new Date().getMonth() + 1).toString()),
  bank: rowBankSchema.default(
    Object.fromEntries(
      bankCategories.map((c) => [c.name, { currency: c.currency, value: "" }]),
    ),
  ),
});

export type BankFormData = z.infer<typeof bankSchema>;
export const defaultBankForm = bankSchema.parse({});
