import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import DataTable from "./components/table/DataTable";

const Dashboard = () => {
  return (
    <div>
      <Header />
      {<Toaster />}
      <div className="w-[90%] mx-auto">
        <DataTable />
      </div>
    </div>
  );
};

export default Dashboard;
