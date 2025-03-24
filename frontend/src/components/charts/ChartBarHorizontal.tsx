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
import { Description } from "@radix-ui/react-dialog";

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
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey={valueKey} hide />
            <YAxis
              dataKey={dataKey}
              type="category"
              tickFormatter={(value) => value.slice(0, 5)}
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
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
