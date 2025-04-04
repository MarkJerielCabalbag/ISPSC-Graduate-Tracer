import { Bar, BarChart, CartesianGrid, XAxis, Legend, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { ChartTypes } from "../../types/type";

// Define color palette
const colorPalette = [
  "hsl(0, 100%, 21%)", // Red
  "hsl(63, 100%, 48%)", // Gold
];

export function ChartMultipleBar({
  chartData,
  chartConfig,
  dataKey,
}: ChartTypes) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Employment and Further Education Status Among Respondents
        </CardTitle>
        <CardDescription>Graduate Outcomes based on the data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} width={600} height={400}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKey} tickLine={false} tickMargin={10} />
            <YAxis allowDecimals={false} />
            <Legend />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            {Object.keys(chartConfig).map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colorPalette[index % colorPalette.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
