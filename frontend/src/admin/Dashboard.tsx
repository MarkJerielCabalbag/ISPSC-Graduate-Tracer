import { Toaster } from "react-hot-toast";
import { useGetSummaryData } from "./hooks/client";
import Header from "./components/Header";
import OverviewTracedStudents from "./components/OverviewTracedStudents";
import { DataTable } from "./components/table/data-tables";
import { columns } from "./components/table/columns";
import OverallDashboardTheader from "./components/table/TableHeaders/OverallDashboardTheader";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { data, isFetching } = useGetSummaryData();
  console.log(data);

  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <OverviewTracedStudents />
      {<Toaster />}

      <div className="w-[90%] mx-auto">
        {isFetching ? (
          <p>loading...</p>
        ) : (
          <div className="w-[100%] ">
            <DataTable
              serachFor="Year of Graduation"
              filterInputName={"yearOfGraduation"}
              tableHeader={<OverallDashboardTheader />}
              columns={columns}
              data={data}
              onRowClick={(row: any) =>
                navigate(`/graduates/${row?.yearOfGraduation}/${row?.program}`)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
