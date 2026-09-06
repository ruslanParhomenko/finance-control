"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import ChartDesktop from "./chart-desktop";
import ChartMobile from "./chart-mobile";
import { createChartConfig } from "./chart-utils";
import { CustomChartProps } from "./chart-types";

export default function CustomChart(props: CustomChartProps) {
  const isMobile = useIsMobile();

  const chartConfig = createChartConfig(props.barItem);

  if (isMobile) {
    return <ChartMobile {...props} chartConfig={chartConfig} />;
  }

  return <ChartDesktop {...props} chartConfig={chartConfig} />;
}
