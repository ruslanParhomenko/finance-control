import { z } from "zod";
import { bankCategories } from "./constants";

const rowBankShape = Object.fromEntries(
  bankCategories.map((c) => [
    c.name,
    z.object({
      currency: z.literal(c.currency),
      value: z.string(),
    }),
  ]),
);

export const rowBankSchema = z.object(rowBankShape);

export const bankSchema = z.object({
  bank: rowBankSchema,
});

export type BankFormData = z.infer<typeof bankSchema>;
export const defaultBankForm: BankFormData = {
  bank: Object.fromEntries(
    bankCategories.map((c) => [c.name, { currency: c.currency, value: "" }]),
  ),
};
