import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "../ui/chart";
import { ChartTypes } from "../../types/type";

export function ChartBar({
  chartData,
  chartConfig,
  dataKey,
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
          <BarChart width={600} height={400} data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey={dataKey} tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Legend content={<ChartLegendContent />} />

            {Object.keys(chartConfig).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={"hsl(0, 100%, 21%)"}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
