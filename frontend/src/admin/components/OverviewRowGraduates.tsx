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
import { TotalGraduatesType } from "../types/types";
import { CirclePlus, Edit3 } from "lucide-react";
import { useState } from "react";
import TotalGraduates from "./modal/TotalGraduates";
import { Toaster } from "react-hot-toast";
import { ChartBar } from "../../components/charts/ChartBar";
import { ChartConfig } from "../../components/ui/chart";

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

  console.log(employmentStatistics);

  const chartConfig = {
    totalEmployed: {
      label: "Employed",
      color: "hsl(var(--chart-1))",
    },
    totalNotEmployed: {
      label: "Not Employed",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  // const chartData = [
  //   {
  //     year: "2025",
  //     employed: 1,
  //     furtherStudies: 1,
  //     jobAligned: 1,
  //     selfEmployed: 1,
  //     government: 1,
  //   },
  //   {
  //     year: "2030",
  //     employed: 1,
  //     furtherStudies: 1,
  //     jobAligned: 1,
  //     selfEmployed: 1,
  //     government: 1,
  //   },
  // ];

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
              <>
                <div className="my-5 w-[50%] h-[50%]">
                  <ChartBar
                    chartData={employmentStatistics}
                    chartConfig={chartConfig}
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewRowGraduates;
