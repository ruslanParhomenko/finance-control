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

export default function ChartDesktop({
  chartData,
  barItem,
  chartConfig,
  className,
  withLegend,
  vertical = false,
  disableTooltip = false,
  disableYAxis = false,
}: ChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className={cn("mt-2 h-[82dvh] w-[90dvw]", className)}
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={5}
          axisLine={false}
          angle={vertical ? -90 : 0}
          textAnchor={vertical ? "end" : "middle"}
          height={vertical ? 80 : 30}
          tickFormatter={(value: string) => value?.split(" ")[0]}
        />

        <YAxis axisLine={false} tickLine={false} tick={!disableYAxis} />

        {!disableTooltip && (
          <ChartTooltip
            cursor={{
              fill: "var(--color-bg)",
            }}
            content={<ChartTooltipContent />}
          />
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
            animationBegin={0}
            animationDuration={500}
            animationEasing="ease-in-out"
          >
            <LabelList position="top" className="fill-red-600" offset={10} />
          </Bar>
        ))}
      </BarChart>
    </ChartContainer>
  );
}
