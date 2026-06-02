import { GetBankDataType } from "@/app/action/bank-data-actions";
import CustomChart from "@/components/chart-custom/chart-bar-label-custom";
import { CurrencyData } from "@/type/currency-data";
import { ParamsValue } from "@/type/params-value";
import { MONTHS } from "@/utils/get-month-days";

export default function ChartBankTotals({
  dataBank,
  currencyData,
  paramsValue,
}: {
  dataBank: GetBankDataType[] | null;
  currencyData: CurrencyData;
  paramsValue: ParamsValue;
}) {
  const { currency } = paramsValue;

  const BAR_KEYS = [
    { key: "value", color: "var(--color-chart-1)", label: "value" },
  ];

  const chartData = MONTHS.map((month, index) => {
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

  return (
    <CustomChart chartData={chartData} barItem={BAR_KEYS} className="mt-4" />
  );
}
