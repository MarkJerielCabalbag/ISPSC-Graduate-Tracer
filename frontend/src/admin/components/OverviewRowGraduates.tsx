import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCurrentJobLocation,
  useGetEmploymentStatistics,
  useGetGraduatesPerRow,
  useGetOrganization,
  useGetPercentageTraced,
  useGetQuestions,
  useGetTotalGraduates,
} from "../hooks/client";
import { DataTable } from "./table/data-tables";
import { graduatesRowColumnDef } from "./table/columns";
import GraduatesPerRow from "./table/TableHeaders/GraduatesPerRow";
import { Button } from "../../components/ui/button";
import {
  chartConfigBar,
  chartConfigBarHorizontal,
  chartConfigPie,
  chartConfigQuestions,
  TotalGraduatesType,
} from "../types/types";
import { ArrowLeft, CirclePlus, Edit3 } from "lucide-react";
import { useState } from "react";
import TotalGraduates from "./modal/TotalGraduates";
import { Toaster } from "react-hot-toast";
import { ChartBar } from "../../components/charts/ChartBar";
import { ChartPie } from "../../components/charts/ChartPie";

import { ChartMultipleBar } from "../../components/charts/ChartMultipleBar";
import { ChartBarhorizontal } from "../../components/charts/ChartBarHorizontal";
import frontCover from "../../assets/Front cover.png";
import logo from "../../assets/ispsc.png";
import { Card } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
const OverviewRowGraduates = () => {
  const { year, program } = useParams();
  const { data, isLoading, isFetching } = useGetGraduatesPerRow(
    year ?? "",
    program ?? ""
  );
  console.log(data);
  const navigate = useNavigate();

  const { data: totalGraduates, isLoading: isLoadingTotalGraduates } =
    useGetTotalGraduates(year ?? "", program ?? "");

  const { data: employmentStatistics } = useGetEmploymentStatistics(
    year ?? "",
    program ?? ""
  );

  const { data: questions } = useGetQuestions(year ?? "", program ?? "");

  const { data: tracedPercentage } = useGetPercentageTraced(
    year ?? "",
    program ?? ""
  );

  const { data: organization } = useGetOrganization(year ?? "", program ?? "");

  const { data: jobLocation } = useGetCurrentJobLocation(
    year ?? "",
    program ?? ""
  );

  const [openAddTotalGraduates, setOpenAddTotalGraduates] = useState(false);
  const [openEditTotalGraduates, setOpenEditTotalGraduates] = useState(false);

  return (
    <div>
      <Header />
      <h1 className="w-[90%] mx-auto my-5 flex items-center gap-2  font-bold ">
        <ArrowLeft onClick={() => navigate("/admin")} />
        <span className="ml-2 text-gray-500 font-bold text-lg md:text-xl">
          Graduates Overview
        </span>
      </h1>
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

      <div className="w-[95%] md:w-[90%] mx-auto my-3 md:my-5">
        {isLoadingTotalGraduates ? (
          <Card className="bg-primary/75 rounded-md mb-3 md:mb-5 p-3 md:p-5">
            <Skeleton className="w-[20%] h-8 md:h-10 bg-primary/50" />
            <Skeleton className="w-[30%] h-8 md:h-10 bg-primary/50" />
          </Card>
        ) : (
          <>
            {totalGraduates?.map((total: TotalGraduatesType) => (
              <div
                key={total.id}
                className="my-2 md:my-3 flex flex-col md:flex-row justify-between items-start md:items-center bg-primary p-3 md:p-5 rounded-md space-y-2 md:space-y-0"
              >
                <div>
                  <h1 className="main-font text-sm md:text-base">
                    {total.department}
                  </h1>
                  <h2 className="text-white font-bold text-sm md:text-base">
                    {total.program}
                  </h2>
                </div>
                <div className="w-full md:w-auto">
                  <h1 className="main-font font-bold text-lg md:text-xl text-start md:text-end">
                    {total.totalGraduates}
                  </h1>
                  <p className="italic text-start md:text-end text-white text-sm">
                    Total Graduates
                  </p>
                  {total.totalGraduates === 0 ? (
                    <Button
                      variant="outline"
                      className="w-full md:w-auto text-sm"
                      onClick={() => setOpenAddTotalGraduates(true)}
                    >
                      <CirclePlus className="w-4 h-4 mr-1" /> Add Total
                      Graduates
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full md:w-auto text-sm"
                      onClick={() => setOpenEditTotalGraduates(true)}
                    >
                      <Edit3 className="w-4 h-4 mr-1" /> Edit Total Graduates
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </>
        )}

        {isLoading || isFetching ? (
          <Card className="w-full h-[40vh] md:h-[50vh] bg-primary/10 rounded-md flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 md:h-10 md:w-10 border-b-2 border-primary"></div>
          </Card>
        ) : (
          <DataTable
            data={data}
            dataSheet={data}
            excelFilename="Graduates.xlsx"
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

        {isLoadingTotalGraduates ? (
          <Card className="bg-primary/75 text-center p-3 md:p-5 rounded-md my-3 md:my-5 h-[20%]">
            <h1 className="main-font text-sm md:text-base">
              Charts are generating...
            </h1>
          </Card>
        ) : (
          <div>
            {totalGraduates?.map((total: TotalGraduatesType) =>
              total.totalGraduates === 0 ? (
                <div className="relative h-[40vh] md:h-[50vh] w-full bg-primary my-3 md:my-5 rounded-md flex flex-col items-center justify-center overflow-hidden">
                  <img
                    src={frontCover}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                  />

                  <div className="absolute inset-0 bg-black/20"></div>

                  <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
                    <img
                      src={logo}
                      alt="ISPSC Logo"
                      className="w-12 h-12 md:w-16 md:h-16 object-contain"
                    />

                    <h1 className="main-font text-white text-sm md:text-base">
                      There are no Total Graduates indicated yet
                    </h1>

                    <Button
                      onClick={() => setOpenAddTotalGraduates(true)}
                      className="bg-amber-300 text-primary hover:bg-amber-400 text-sm md:text-base"
                    >
                      Add Total Graduates
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 my-3 md:my-5">
                    <div className="col-span-1 md:col-span-2">
                      <ChartBarhorizontal
                        chartData={jobLocation}
                        chartConfig={chartConfigBarHorizontal}
                        dataKey="location"
                        valueKey="total"
                        title="Location-Based Employment"
                        description="Where do they work?"
                      />
                    </div>
                    <div>
                      <ChartBar
                        chartData={employmentStatistics}
                        chartConfig={chartConfigBar}
                        dataKey="major"
                        title="Employment Statistics"
                        description="Graduate Outcomes by Major"
                      />
                    </div>
                    <div>
                      <ChartMultipleBar
                        chartConfig={chartConfigQuestions}
                        chartData={questions}
                        dataKey="question"
                        title="Sector-Based Employment"
                        description="Who works where?"
                      />
                    </div>
                    <div>
                      <ChartPie
                        chartData={tracedPercentage}
                        chartConfig={chartConfigPie}
                        dataKey="tracedPercentage"
                        nameKey="major"
                        title="Percentage Traced Graduates"
                        description="Traced Graduates by Major"
                      />
                    </div>
                    <div>
                      <ChartBar
                        chartData={organization}
                        chartConfig={chartConfigBarHorizontal}
                        dataKey="organization"
                        valueKey="total"
                        title="Sector-Based Employment"
                        description="Who works where?"
                      />
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewRowGraduates;
