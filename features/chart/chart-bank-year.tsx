"use client";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import { CurrencyData } from "@/type/currency-data";
import { ParamsValue } from "@/type/params-value";
import { MONTHS } from "@/utils/get-month-days";
import { useState } from "react";
import { bankCategories } from "../bank/constants";
import CustomLegend from "@/components/chart-custom/chart-legend";
import CustomChart from "@/components/chart-custom";

const DATA_BANK = [...bankCategories.map((key) => key.name), "totals"] as const;

type BankType = (typeof DATA_BANK)[number];

type ChartDataItem = { name: string } & { [key in BankType]: number };
type BarKey = keyof Omit<ChartDataItem, "name">;

export default function ChartBankYear({
  dataBank,
  currencyData,
  paramsValue,
}: {
  dataBank: GetBankDataType[] | null;
  currencyData: CurrencyData;
  paramsValue: ParamsValue;
}) {
  const { currency } = paramsValue;

  const [visibleBars, setVisibleBars] = useState<Record<BarKey, boolean>>(
    DATA_BANK.reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {} as Record<BarKey, boolean>,
    ),
  );

  const BAR_KEYS = DATA_BANK.map((key) => ({
    key,
    color: "var(--color-blue-600)",
    label: key.trim(),
  }));

  const chartDataYear: ChartDataItem[] = MONTHS.map((month) => {
    const dataByMonth = dataBank?.find((item) => item.id === month)?.dataBank;

    const bankData = dataByMonth?.bank;
    const totalsByMonth = Number(dataByMonth?.totals);

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
      if (bank === "totals") {
        result[bank] = Number(
          (
            Math.abs(totalsByMonth) /
            currencyRatesByMonth[currency as keyof typeof currencyRatesByMonth]
          ).toFixed(0),
        );
        return;
      }
      const item = bankData?.[bank];

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

  const chartData = chartDataYear;

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
    <div className="flex h-full flex-col justify-center">
      <CustomChart
        chartData={chartData}
        barItem={BAR_KEYS.filter((item) => visibleBars[item.key])}
      />

      <CustomLegend
        items={BAR_KEYS}
        visibleItems={visibleBars}
        onToggle={toggleBar}
      />
    </div>
  );
}
