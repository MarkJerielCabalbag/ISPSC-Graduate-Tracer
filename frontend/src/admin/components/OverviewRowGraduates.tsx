import Header from "./Header";
import { useParams } from "react-router-dom";
import {
  useGetEmploymentStatistics,
  useGetGraduatesPerRow,
  useGetTotalGraduates,
} from "../hooks/client";
import { DataTable } from "./table/data-tables";
import { graduatesRowColumnDef } from "./table/columns";
import GraduatesPerRow from "./table/TableHeaders/GraduatesPerRow";
import { Button } from "../../components/ui/button";
import {
  chartConfigBar,
  Graduates,
  maroonPalette,
  TotalGraduatesType,
} from "../types/types";
import { CirclePlus, Edit3 } from "lucide-react";
import { useState } from "react";
import TotalGraduates from "./modal/TotalGraduates";
import { Toaster } from "react-hot-toast";
import { ChartBar } from "../../components/charts/ChartBar";
import { ChartPie } from "../../components/charts/ChartPie";
const OverviewRowGraduates = () => {
  const { year, program } = useParams();
  const { data, isLoading, isFetching } = useGetGraduatesPerRow(
    year ?? "",
    program ?? ""
  );

  const { data: totalGraduates } = useGetTotalGraduates(
    year ?? "",
    program ?? ""
  );

  const { data: employmentStatistics } = useGetEmploymentStatistics(
    year ?? "",
    program ?? ""
  );

  const tracedPercentage = employmentStatistics?.map((major: Graduates) => {
    const percentage =
      (major.totalCount / totalGraduates?.[0]?.totalGraduates) * 100;

    return {
      major: major?.major,
      totalPercentageTraced: Number(percentage.toFixed(2)),
      totalPercentageUntraced: Number((100 - percentage).toFixed(2)),
      fill: `var(--color-${major?.major})`,
    };
  });

  console.log(tracedPercentage);

  const chartPieConfig = tracedPercentage?.reduce(
    (config: any, total: any, index: number) => {
      config[total.major] = {
        label: `PERCENTAGE TRACED IN ${total.major} `,
        color: maroonPalette[index % maroonPalette.length],
      };
      return config;
    },
    {} as Record<string, { label: string; color: string }>
  );

  const [openAddTotalGraduates, setOpenAddTotalGraduates] = useState(false);
  const [openEditTotalGraduates, setOpenEditTotalGraduates] = useState(false);

  return (
    <div>
      <Header />
      {<Toaster />}
      {openAddTotalGraduates && (
        <TotalGraduates
          titleModal="Add Total Graduates"
          isOpen={openAddTotalGraduates}
          handleIsOpen={setOpenAddTotalGraduates}
          totalGraduates={totalGraduates}
        />
      )}

      {openEditTotalGraduates && (
        <TotalGraduates
          titleModal="Edit Total Graduates"
          isOpen={openEditTotalGraduates}
          handleIsOpen={setOpenEditTotalGraduates}
          totalGraduates={totalGraduates}
        />
      )}

      <div className="w-[90%] mx-auto my-5">
        {totalGraduates?.map((total: TotalGraduatesType) => (
          <div
            key={total.id}
            className="my-3 flex justify-between items-center bg-primary p-5 rounded-md"
          >
            <div>
              <h1 className="main-font">{total.department}</h1>
              <h2 className="text-white font-bold">{total.program}</h2>
            </div>
            <div className="">
              <h1 className="main-font font-bold text-xl text-end">
                {total.totalGraduates}
              </h1>
              <p className="italic text-end text-white">Total Graduates</p>
              {total.totalGraduates === 0 ? (
                <Button
                  variant="outline"
                  onClick={() => setOpenAddTotalGraduates(true)}
                >
                  <CirclePlus /> Add Total Graduates
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setOpenEditTotalGraduates(true)}
                >
                  <Edit3 /> Edit Total Graduates
                </Button>
              )}
            </div>
          </div>
        ))}

        {isLoading || isFetching ? (
          <p>loading</p>
        ) : (
          <DataTable
            data={data}
            columns={graduatesRowColumnDef}
            tableHeader={
              <GraduatesPerRow
                year={year as string}
                program={program as string}
              />
            }
            serachFor="Name"
            filterInputName="fullName"
          />
        )}

        <div>
          {totalGraduates?.map((total: TotalGraduatesType) =>
            total.totalGraduates === 0 ? (
              <Button onClick={() => setOpenAddTotalGraduates(true)}>
                Add Total Graduates
              </Button>
            ) : (
              <div className="my-5 flex gap-2 w-[50%] h-[50%]">
                <div className="h-full">
                  <ChartBar
                    chartData={employmentStatistics}
                    chartConfig={chartConfigBar}
                    dataKey="major"
                  />
                </div>
                <div className="h-full">
                  {tracedPercentage &&
                  Object.keys(chartPieConfig).length > 0 ? (
                    <ChartPie
                      chartData={tracedPercentage}
                      chartConfig={chartPieConfig}
                      dataKey="totalPercentageTraced"
                      nameKey="major"
                    />
                  ) : (
                    <p>Loading chart data...</p>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewRowGraduates;
