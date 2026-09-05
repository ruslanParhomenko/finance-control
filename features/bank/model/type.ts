import { CurrencyRatesByMonth } from "@/type/currency-data";
import { BankFormData } from "./schema";

export type BankForm = {
  year: string;
  month: string;
  dataBank: BankFormData;
  dataCurrency: CurrencyRatesByMonth;
};

export type GetBankDataType = {
  id: string;
  dataBank: BankFormData & { year: string; month: string; totals: string };
  dataCurrency: CurrencyRatesByMonth;
};
