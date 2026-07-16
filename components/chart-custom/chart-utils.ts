import { ChartConfig } from "../ui/chart";
import { BarItem } from "./chart-types";

export function createChartConfig(barItem: BarItem[]): ChartConfig {
  return Object.fromEntries(
    barItem.map(({ key, label, color }) => [
      key,
      {
        label,
        color,
      },
    ]),
  ) as ChartConfig;
}
