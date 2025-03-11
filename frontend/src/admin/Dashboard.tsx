import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import DataTable from "./components/table/DataTable";
import SideContent from "./components/SideContent";

const Dashboard = () => {
  return (
    <div>
      <Header />
      {<Toaster />}
      <div className="w-[90%] mx-auto flex items-center gap-5 mt-10">
        <DataTable />
        <SideContent />
      </div>
    </div>
  );
};

export default Dashboard;
