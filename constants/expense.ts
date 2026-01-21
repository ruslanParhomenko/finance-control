import { env } from "process";

export const expenseCategories = [
  "sport",
  "food",
  "pharmacy",
  "free-time",
  "gift",
  "hygiene",
  "taxi",
  "clothing",
  "electronics",
  "her",
  "utilities",
  "rent-home",
  "household",
  "documents",
  "travel",
  "flight",
  "hotel",
] as const;

export const INITIAL_BANK = env.NEXT_PUBLIC_INITIAL_BANK_EUR;

export const addCash = ["add-cash"] as const;
