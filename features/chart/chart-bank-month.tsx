import { ParamsValue } from "@/type/params-value";
import CustomChart from "@/components/chart-custom";
import { GetBankDataType } from "../bank/model/type";

export default function ChartBankMonth({
  dataBank,
  paramsValue,
}: {
  dataBank: GetBankDataType[] | null;
  paramsValue: ParamsValue;
}) {
  const { month, currency } = paramsValue;
  const prevMonth = +month - 1;

  const BAR_KEYS = [
    { key: "value", color: "var(--color-chart-1)", label: "value" },
  ];

  const data = dataBank?.find((item) => +item.id === prevMonth) || null;
  const currencyRatesByMonth = data?.dataCurrency!;

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

  const chartData = chartDataBank;

  return (
    <div className="flex h-full flex-col justify-center">
      <CustomChart chartData={chartData} barItem={BAR_KEYS} />
    </div>
  );
}
