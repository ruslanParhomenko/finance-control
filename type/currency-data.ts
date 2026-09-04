export type CurrencyData = {
  USD: number[];
  EUR: number[];
  MDL: number[];
};

export type Currency = "EUR" | "USD" | "MDL";

export type CurrencyRatesByMonth = {
  USD: number;
  EUR: number;
  MDL: number;
};
