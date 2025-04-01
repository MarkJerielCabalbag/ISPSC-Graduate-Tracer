import { Toaster } from "react-hot-toast";
import { useGetSummaryData } from "./hooks/client";
import Header from "./components/Header";
import OverviewTracedStudents from "./components/OverviewTracedStudents";
import { DataTable } from "./components/table/data-tables";
import { columns } from "./components/table/columns";
import OverallDashboardTheader from "./components/table/TableHeaders/OverallDashboardTheader";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { data, isFetching } = useGetSummaryData();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Header />
      <motion.div variants={itemVariants}>
        <OverviewTracedStudents />
      </motion.div>
      {<Toaster />}

      <motion.div className="w-[90%] mx-auto" variants={itemVariants}>
        {isFetching ? (
          <Card className="w-[100%] h-[300px] flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </Card>
        ) : (
          <motion.div
            className="w-[100%]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
