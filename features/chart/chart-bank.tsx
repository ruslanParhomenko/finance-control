"use client";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import CustomChart from "@/components/chart-custom/chart-bar-label-custom";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CurrencyData } from "@/type/currency-data";
import { ParamsValue } from "@/type/params-value";
import { MONTHS } from "@/utils/get-month-days";
import { useState, useTransition, ViewTransition } from "react";
import { bankCategories } from "../bank/constants";
import CustomLegend from "@/components/chart-custom/chart-legend";

const DATA_BANK = bankCategories.map((key) => key.name);
type BankType = (typeof DATA_BANK)[number];

type ChartDataItem = { name: string } & { [key in BankType]: number };
type BarKey = keyof Omit<ChartDataItem, "name">;

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

  const [_isPending, startTransition] = useTransition();

  const [visibleBars, setVisibleBars] = useState<Record<BarKey, boolean>>(
    DATA_BANK.reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {} as Record<BarKey, boolean>,
    ),
  );

  const [filters, setFilters] = useState<"month" | "year">("month");
  const BAR_KEYS_MONTH = [
    { key: "value", color: "var(--color-chart-1)", label: "value" },
  ];
  const BAR_KEYS_YEAR = DATA_BANK.map((key) => ({
    key,
    color: "var(--color-blue-600)",
    label: key.trim(),
  }));
  const BAR_KEYS =
    filters === "month"
      ? BAR_KEYS_MONTH
      : BAR_KEYS_YEAR.filter((item) => visibleBars[item.key as BarKey]);

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
        value: Number(
          (
            Math.abs(valueMdl) /
            currencyRatesByMonth[currency as keyof typeof currencyRatesByMonth]
          ).toFixed(0),
        ),
      };
    },
  );
  const chartDataYear: ChartDataItem[] = MONTHS.map((month) => {
    const bankData =
      dataBank?.find((item) => item.id === month)?.dataBank.bank ?? {};

    const monthIndex = dataBank?.findIndex((item) => item.id === month) ?? 0;

    const currencyRatesByMonth = {
      EUR: currencyData.EUR[monthIndex] || 1,
      USD: currencyData.USD[monthIndex] || 1,
      MDL: 1,
    };

    const result: ChartDataItem = {
      name: month,
    } as ChartDataItem;

    DATA_BANK.forEach((bank) => {
      const item = bankData[bank];

      if (!item?.value) {
        result[bank] = 0;
        return;
      }

      let valueMdl = 0;

      switch (item.currency) {
        case "EUR":
          valueMdl = +item.value * currencyRatesByMonth.EUR;
          break;
        case "USD":
          valueMdl = +item.value * currencyRatesByMonth.USD;
          break;
        case "MDL":
          valueMdl = +item.value;
          break;
      }

      result[bank] = Number(
        (
          Math.abs(valueMdl) /
          currencyRatesByMonth[currency as keyof typeof currencyRatesByMonth]
        ).toFixed(0),
      );
    });

    return result;
  });

  const chartData = filters === "month" ? chartDataBank : chartDataYear;

  const toggleBar = (key: BarKey) => {
    setVisibleBars(() => {
      return {
        ...(Object.fromEntries(
          DATA_BANK.map((item) => [item, false]),
        ) as Record<BarKey, boolean>),
        [key]: true,
      };
    });
  };

  return (
    <ViewTransition>
      <div className="flex flex-col gap-1">
        <CustomChart
          chartData={chartData}
          barItem={BAR_KEYS}
          className="h-[70dvh]"
        />
        <div className="flex items-center justify-end gap-4 px-4 py-2">
          <Switch
            id="chart-filter"
            checked={filters === "month"}
            onCheckedChange={(checked) =>
              startTransition(() => setFilters(checked ? "month" : "year"))
            }
            className="shadow-none"
          />
          <Label className="text-muted-foreground text-xs">{filters}</Label>
        </div>
        {filters === "year" && (
          <CustomLegend
            items={BAR_KEYS_YEAR}
            visibleItems={visibleBars}
            onToggle={toggleBar}
          />
        )}
      </div>
    </ViewTransition>
  );
}
