import CustomChart from "@/components/chart-custom";
import { GetBankDataType } from "../bank/model/type";
import { bankCategories } from "../bank/model/constants";
import CustomLegend from "@/components/chart-custom/chart-legend";
import { useState } from "react";
import { ParamsValue } from "@/type/params-value";
import { MONTHS } from "@/utils/get-month-days";

const DATA_BANK = [
  ...bankCategories.map((key) => key.name),
  "totals",
  "month",
] as const;

type BankType = (typeof DATA_BANK)[number];

type ChartDataItem = { name: string } & { [key in BankType]: number };
type BarKey = keyof Omit<ChartDataItem, "name">;

export default function ChartBankMonth({
  dataBank,
  paramsValue,
}: {
  dataBank: GetBankDataType[] | null;
  paramsValue: ParamsValue;
}) {
  const { month, currency } = paramsValue;

  const BAR_KEYS = [
    { key: "value", color: "var(--color-chart-1)", label: "value" },
  ];

  const BAR_KEYS_BY_BANK = DATA_BANK.map((key) => ({
    key,
    color: "var(--color-blue-600)",
    label: key.trim(),
  }));

  const [visibleBars, setVisibleBars] = useState<Record<BarKey, boolean>>(
    DATA_BANK.reduce(
      (acc, key) => ({ ...acc, [key]: key === "month" ? true : false }),
      {} as Record<BarKey, boolean>,
    ),
  );

  const dataBankByMonth = dataBank?.find((item) => item.id === month);

  const currencyRatesByMonth = dataBankByMonth?.dataCurrency!;

  const chartDataYear: ChartDataItem[] = MONTHS.map((month) => {
    const dataByMonth = dataBank?.find((item) => item.id === month)?.dataBank;

    const bankData = dataByMonth?.bank;
    const totalsByMonth = Number(dataByMonth?.totals);

    const currencyRatesByMonth = dataBank?.find(
      (item) => item.id === month,
    )?.dataCurrency!;

    const result: ChartDataItem = {
      name: month,
    } as ChartDataItem;

    DATA_BANK.forEach((bank) => {
      if (bank === "totals") {
        result[bank] = Number(
          (
            Math.abs(totalsByMonth) /
            currencyRatesByMonth?.[
              currency as keyof typeof currencyRatesByMonth
            ]
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

  const chartDataBank = Object.entries(
    dataBankByMonth?.dataBank.bank || {},
  ).map(([key, value]) => {
    let valueMdl = 0;
    switch (value.currency) {
      case "EUR":
        valueMdl = +value.value * currencyRatesByMonth?.EUR;
        break;
      case "USD":
        valueMdl = +value.value * currencyRatesByMonth?.USD;
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
          currencyRatesByMonth?.[currency as keyof typeof currencyRatesByMonth]
        ).toFixed(0),
      ),
    };
  });

  const chartData = visibleBars.month ? chartDataBank : chartDataYear;

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

  const BAR_KEYS_BY_MODE = visibleBars.month
    ? BAR_KEYS
    : BAR_KEYS_BY_BANK.filter((item) => visibleBars[item.key]);

  return (
    <div className="flex h-full flex-col justify-center">
      <CustomChart chartData={chartData} barItem={BAR_KEYS_BY_MODE} />
      <CustomLegend
        items={BAR_KEYS_BY_BANK}
        visibleItems={visibleBars}
        onToggle={toggleBar}
      />
    </div>
  );
}
