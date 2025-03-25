import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { ChartTypes } from "../../types/type";

const colorPalette = [
  "hsl(0, 100%, 50%)", // Red
  "hsl(51, 100%, 50%)", // Gold
  "hsl(210, 100%, 50%)", // Blue
  "hsl(120, 100%, 40%)", // Green
  "hsl(280, 100%, 50%)", // Purple
  "hsl(30, 100%, 50%)", // Orange
  "hsl(190, 100%, 50%)", // Cyan
];

export function ChartBarhorizontal({
  chartData,
  chartConfig,
  dataKey,
  valueKey,
  title,
  description,
}: ChartTypes) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[500px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={chartData} layout="vertical">
            <XAxis type="number" dataKey={valueKey} allowDecimals={false} />
            <YAxis
              dataKey={dataKey}
              type="category"
              tickFormatter={(value) => value}
              allowDecimals={false}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {Object.keys(chartConfig).map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colorPalette[index % colorPalette.length]}
                radius={[2, 2, 0, 0]}
                barSize={100}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
