"use client";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import CustomChart from "@/components/chart-custom/chart-bar-label-custom";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CurrencyData } from "@/type/currency-data";
import { ParamsValue } from "@/type/params-value";
import { MONTHS } from "@/utils/get-month-days";
import { useState } from "react";

export default function ChartBank({
  dataBank,
  currencyData,
  paramsValue,
}: {
  dataBank: GetBankDataType[] | null;
  currencyData: CurrencyData;
  paramsValue: ParamsValue;
}) {
  const { month, currency } = paramsValue;
  const prevMonth = +month - 1;

  const [filters, setFilters] = useState<"bank" | "totals">("bank");
  const BAR_KEYS = [
    { key: "value", color: "var(--color-chart-1)", label: "value" },
  ];

  const data = dataBank?.find((item) => +item.id === prevMonth) || null;

  const monthIndex = MONTHS.findIndex((m) => m === data?.id);

  const currencyRatesByMonth = {
    EUR: currencyData.EUR.find((_item, index) => index === monthIndex) || 1,
    USD: currencyData.USD.find((_item, index) => index === monthIndex) || 1,
    MDL: 1,
  };

  const chartDataBank = Object.entries(data?.dataBank.bank || {}).map(
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
  const chartDataTotals = MONTHS.map((month, index) => {
    const totalsByMonth = +(
      dataBank?.find((item) => item.id === month)?.dataBank.totals || 0
    );
    const monthIndex = +(dataBank?.find((item) => item.id === month)?.id || 0);
    const currencyRatesByMonth = {
      EUR: currencyData.EUR.find((_item, index) => index === monthIndex) || 1,
      USD: currencyData.USD.find((_item, index) => index === monthIndex) || 1,
      MDL: 1,
    };

    const valueByCurrency =
      Math.abs(totalsByMonth) /
      currencyRatesByMonth[currency as keyof typeof currencyRatesByMonth];
    return {
      name: month,
      value: Number(valueByCurrency.toFixed(0)),
    };
  });

  const chartData = filters === "bank" ? chartDataBank : chartDataTotals;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-start gap-4 px-4">
        <Switch
          id="chart-filter"
          checked={filters === "bank"}
          onCheckedChange={(checked) => setFilters(checked ? "bank" : "totals")}
          className="shadow-none"
        />
        <Label className="text-muted-foreground text-xs">{filters}</Label>
      </div>
      <CustomChart chartData={chartData} barItem={BAR_KEYS} />
    </div>
  );
}
