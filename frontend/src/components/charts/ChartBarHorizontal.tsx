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
            {Object.keys(chartConfig).map((key, _) => (
              <Bar
                key={key}
                dataKey={key}
                fill={"hsl(0, 100%, 21%)"}
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
