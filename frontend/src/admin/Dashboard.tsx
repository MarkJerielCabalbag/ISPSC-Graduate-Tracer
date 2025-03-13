import { Toaster } from "react-hot-toast";
import DataTable from "./components/table/DataTable";
import { adminColumns } from "./hooks/useTable";
import { useGetListPrograms, useGetSummaryData } from "./hooks/client";

import { formatData } from "./utils/utils";
import Header from "./components/Header";
import OverviewTracedStudents from "./components/OverviewTracedStudents";
import OverallDashboardTheader from "./components/table/TableHeaders/OverallDashboardTheader";

const Dashboard = () => {
  const { data } = useGetSummaryData();

  const formattedData = formatData(
    data || [],
    (yearData: { yearOfGraduation: string; programData: any[] }) =>
      yearData.programData.map((programData) => ({
        yearOfGraduation: yearData.yearOfGraduation,
        ...programData,
      }))
  );

  // const { data: listOfPrograms } = useGetListPrograms();

  return (
    <div>
      <Header />
      <OverviewTracedStudents />
      {<Toaster />}

      <div className="w-[90%] mx-auto">
        <DataTable
          data={formattedData}
          column={adminColumns}
          rowLength={formattedData.length}
          tableHeader={<OverallDashboardTheader />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
