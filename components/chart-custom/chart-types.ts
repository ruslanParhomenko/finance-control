import { ChartConfig } from "../ui/chart";

export type ChartDataItem = {
  name: string;
  [key: string]: string | number;
};

export type BarItem = {
  key: string;
  color: string;
  label: string;
};

export type CustomChartProps = {
  chartData: ChartDataItem[];
  barItem: BarItem[];
  className?: string;
  withLegend?: boolean;
  vertical?: boolean;
  disableTooltip?: boolean;
  disableYAxis?: boolean;
};

export type ChartProps = CustomChartProps & {
  chartConfig: ChartConfig;
};
