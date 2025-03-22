import { TrendingUp } from "lucide-react";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { ChartTypes } from "../../types/type";

export function ChartBar({ chartData, chartConfig }: ChartTypes) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment Statistics</CardTitle>
        <CardDescription>Graduate Outcomes by Major</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={600} height={400} data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="major" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Legend content={<ChartLegendContent />} />

            {Object.keys(chartConfig).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartConfig[key]?.color}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Employment trend improving <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Based on graduate employment data
        </div>
      </CardFooter>
    </Card>
  );
}
