// "use client";

// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   LabelList,
//   XAxis,
//   YAxis,
// } from "recharts";

// import { cn } from "@/lib/utils";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "../ui/chart";
// import { useIsMobile } from "@/hooks/use-mobile";

// type ChartDataItem = {
//   name: string;
//   [key: string]: string | number;
// };

// type BarItem = {
//   key: string;
//   color: string;
//   label: string;
// };

// type CustomChartProps = {
//   chartData: ChartDataItem[];
//   barItem: BarItem[];
//   className?: string;
//   withLegend?: boolean;
//   vertical?: boolean;
//   disableTooltip?: boolean;
//   disableYAxis?: boolean;
// };

// export default function CustomChart({
//   chartData,
//   barItem,
//   className,
//   withLegend = false,
//   vertical = false,
//   disableTooltip = false,
//   disableYAxis = false,
// }: CustomChartProps) {
//   const isMobile = useIsMobile();

//   const chartConfig = Object.fromEntries(
//     barItem.map(({ key, label, color }) => [
//       key,
//       {
//         label,
//         color,
//       },
//     ]),
//   ) as ChartConfig;

//   const height = isMobile ? "h-[78dvh]" : "h-[82dvh]";

//   if (isMobile) {
//     return (
//       <ChartContainer
//         config={chartConfig}
//         className={cn("mt-2 w-[90dvw] md:mt-6", height, className)}
//       >
//         <BarChart
//           accessibilityLayer
//           data={chartData}
//           layout="vertical"
//           margin={{ right: 36 }}
//         >
//           <CartesianGrid horizontal={false} />

//           <XAxis
//             type="number"
//             tickLine={false}
//             axisLine={false}
//             tick={!disableYAxis}
//           />

//           <YAxis
//             type="category"
//             dataKey="name"
//             tickLine={false}
//             axisLine={false}
//             width={80}
//             tickFormatter={(value: string) => value?.split(" ")[0]}
//           />
//           {!disableTooltip && (
//             <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
//           )}
//           {withLegend && (
//             <ChartLegend content={<ChartLegendContent payload={undefined} />} />
//           )}
//           {barItem.map(({ key, color }) => (
//             <Bar
//               key={key}
//               dataKey={key}
//               fill={color}
//               radius={6}
//               isAnimationActive
//               animationDuration={400}
//               animationEasing="ease-out"
//             >
//               <LabelList
//                 key={key}
//                 values={key}
//                 className="fill-red-600"
//                 position="right"
//                 fontSize={10}
//               />
//             </Bar>
//           ))}
//         </BarChart>
//       </ChartContainer>
//     );
//   }

//   return (
//     <ChartContainer
//       config={chartConfig}
//       className={cn("mt-2 w-[90dvw] md:mt-6", height, className)}
//     >
//       <BarChart accessibilityLayer data={chartData}>
//         <CartesianGrid vertical={false} />
//         <XAxis
//           dataKey="name"
//           tickLine={false}
//           tickMargin={5}
//           axisLine={false}
//           angle={vertical ? -90 : 0}
//           textAnchor={vertical ? "end" : "middle"}
//           height={vertical ? 80 : 30}
//           tickFormatter={(value: string) => value?.split(" ")[0]}
//         />
//         <YAxis axisLine={false} tickLine={false} tick={!disableYAxis} />

//         {!disableTooltip && (
//           <ChartTooltip
//             cursor={{ fill: "var(--color-bg)" }}
//             content={<ChartTooltipContent />}
//           />
//         )}
//         {withLegend && (
//           <ChartLegend content={<ChartLegendContent payload={undefined} />} />
//         )}
//         {barItem.map(({ key, color }) => (
//           <Bar key={key} dataKey={key} fill={color} radius={6}>
//             <LabelList key={key} values={key} fill="#ffff" position="top" />
//           </Bar>
//         ))}
//       </BarChart>
//     </ChartContainer>
//   );
// }
