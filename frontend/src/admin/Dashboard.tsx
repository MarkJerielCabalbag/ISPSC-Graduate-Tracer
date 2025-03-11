import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import DataTable from "./components/table/DataTable";
import SideContent from "./components/SideContent";
import { adminColumns } from "./hooks/useTable";
import { useGetSummaryData } from "./hooks/client";

const Dashboard = () => {
  const { data } = useGetSummaryData();

  const formattedData = data?.flatMap((yearData) =>
    yearData.programData.map((programData) => ({
      yearOfGraduation: yearData.yearOfGraduation,
      ...programData,
    }))
  );

  console.log(formattedData);
  return (
    <div>
      <Header />
      {<Toaster />}
      <div className="w-[90%] mx-auto flex items-center gap-5 mt-10">
        <DataTable data={formattedData} column={adminColumns} />
        <SideContent />
      </div>
    </div>
  );
};

export default Dashboard;
