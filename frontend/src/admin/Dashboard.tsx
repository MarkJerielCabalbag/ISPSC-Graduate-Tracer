import { Toaster } from "react-hot-toast";
import { useGetSummaryData } from "./hooks/client";
import Header from "./components/Header";
import OverviewTracedStudents from "./components/OverviewTracedStudents";
import { DataTable } from "./components/table/data-tables";
import { columns } from "./components/table/columns";

const Dashboard = () => {
  const { data, isFetching } = useGetSummaryData();
  console.log(data);
  return (
    <div>
      <Header />
      <OverviewTracedStudents />
      {<Toaster />}

      {isFetching ? (
        <p>loading...</p>
      ) : (
        <div className="w-[90%] mx-auto">
          <div className="my-3">
            <h1 className="text-primary font-bold">
              Overview of Traced Graduates
            </h1>
            <h2>Summary of Traced Graduated</h2>
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
