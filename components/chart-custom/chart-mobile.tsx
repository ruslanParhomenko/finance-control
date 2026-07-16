"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

import { ChartProps } from "./chart-types";

export default function ChartMobile({
  chartData,
  barItem,
  chartConfig,
  className,
  withLegend,
  disableTooltip = false,
  disableYAxis = false,
}: ChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className={cn("mt-2 h-[78dvh] w-[90dvw]", className)}
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          right: 36,
        }}
      >
        <CartesianGrid horizontal={false} />

        <XAxis
          type="number"
          tickLine={false}
          axisLine={false}
          tick={!disableYAxis}
        />

        <YAxis
          type="category"
          dataKey="name"
          tickLine={false}
          axisLine={false}
          width={80}
          tickFormatter={(value: string) => value?.split(" ")[0]}
        />

        {!disableTooltip && (
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        )}

        {withLegend && (
          <ChartLegend content={<ChartLegendContent payload={undefined} />} />
        )}

        {barItem.map(({ key, color }) => (
          <Bar
            key={key}
            dataKey={key}
            fill={color}
            radius={6}
            isAnimationActive
            animationDuration={400}
            animationEasing="ease-out"
          >
            <LabelList
              position="right"
              fontSize={10}
              className="fill-red-600"
            />
          </Bar>
        ))}
      </BarChart>
    </ChartContainer>
  );
}
