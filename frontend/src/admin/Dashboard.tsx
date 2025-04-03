import { Toaster } from "react-hot-toast";
import { useGetDepartmentDetails, useGetSummaryData } from "./hooks/client";
import Header from "./components/Header";
import OverviewTracedStudents from "./components/OverviewTracedStudents";
import { DataTable } from "./components/table/data-tables";
import { columns } from "./components/table/columns";
import OverallDashboardTheader from "./components/table/TableHeaders/OverallDashboardTheader";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import DeleteProgram from "./components/modal/DeleteProgram";
import { BookCheck, Edit2, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { DepartmentDetails, Major, Program } from "./types/types";

const Dashboard = () => {
  const { data, isFetching } = useGetSummaryData();
  const navigate = useNavigate();

  const { data: departments = [] } = useGetDepartmentDetails();

  const [openDeleteProgram, setOpenDeleteProgram] = useState(false);
  const handleDeleteProgram = () => setOpenDeleteProgram(!openDeleteProgram);

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

      <main className="w-[90%] mx-auto my-5">
        <div>
          <header className="flex items-center gap-4 mb-8">
            <h1 className="text-2xl font-bold text-primary">
              Departments & Programs
            </h1>
          </header>

          <div className="grid gap-8">
            {departments.map((department: DepartmentDetails) => (
              <motion.div
                key={department.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                {openDeleteProgram && (
                  <DeleteProgram
                    isOpen={openDeleteProgram}
                    handleIsOpen={setOpenDeleteProgram}
                    majorId={0}
                  />
                )}

                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                  <h3 className="text-2xl font-bold text-primary">
                    {department.department}
                  </h3>
                </div>

                <div className="p-6 space-y-6">
                  {department.listOfProgram?.map((program: Program) => (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border rounded-xl hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center justify-between p-5 bg-gray-50/50">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <BookCheck className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-semibold text-gray-800">
                            {program.program}
                          </h4>
                        </div>

                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                            onClick={handleDeleteProgram}
                            title="Delete Program"
                          >
                            <Trash2 className="h-5 w-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                            title="Edit Program"
                          >
                            <Edit2 className="h-5 w-5" />
                          </motion.button>
                        </div>
                      </div>

                      <Accordion type="single" collapsible>
                        <AccordionItem value="majors">
                          <AccordionTrigger className="px-5 py-4 hover:no-underline">
                            <span className="text-primary font-medium">
                              Majors ({program.listOfMajor?.length ?? 0})
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="p-5 space-y-3 bg-gray-50/30">
                              {program.listOfMajor?.length ? (
                                program.listOfMajor.map((major: Major) => (
                                  <motion.div
                                    key={major.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-sm transition-all duration-300"
                                  >
                                    <span className="text-gray-700 font-medium">
                                      {major.major}
                                    </span>
                                    <div className="flex gap-2">
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                        title="Delete Major"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                                        title="Edit Major"
                                      >
                                        <Edit2 className="h-4 w-4" />
                                      </motion.button>
                                    </div>
                                  </motion.div>
                                ))
                              ) : (
                                <p className="text-gray-500 text-center py-3">
                                  No majors available
                                </p>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Dashboard;
