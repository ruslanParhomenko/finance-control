"use client";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import CustomChart from "@/components/chart-custom/chart-bar-label-custom";
import { CurrencyData } from "@/type/currency-data";
import { MONTHS } from "@/utils/get-month-days";

export default function ChartBank({
  data,
  currencyData,
  currency,
}: {
  data: GetBankDataType | null;
  currencyData: CurrencyData;
  currency: string;
}) {
  const BAR_KEYS = [
    { key: "value", color: "var(--color-chart-1)", label: "value" },
  ];

  const monthIndex = MONTHS.findIndex((m) => m === data?.id);

  const currencyRatesByMonth = {
    EUR: currencyData.EUR.find((_item, index) => index === monthIndex) || 1,
    USD: currencyData.USD.find((_item, index) => index === monthIndex) || 1,
    MDL: 1,
  };

  const chartData = Object.entries(data?.dataBank.bank || {}).map(
    ([key, value]) => {
      let valueMdl = 0;
      switch (value.currency) {
        case "EUR":
          valueMdl = +value.value * currencyRatesByMonth.EUR;
          break;
        case "USD":
          valueMdl = +value.value * currencyRatesByMonth.USD;
          break;
        case "MDL":
          valueMdl = +value.value;
          break;
      }
      return {
        name: key,
        value:
          Math.abs(valueMdl) /
          currencyRatesByMonth[currency as keyof typeof currencyRatesByMonth],
      };
    },
  );

  return <CustomChart chartData={chartData} barItem={BAR_KEYS} />;
}
