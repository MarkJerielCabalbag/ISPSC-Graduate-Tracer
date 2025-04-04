import { Toaster } from "react-hot-toast";
import { useGetDepartmentDetails, useGetSummaryData } from "./hooks/client";
import Header from "./components/Header";
import OverviewTracedStudents from "./components/OverviewTracedStudents";
import { DataTable } from "./components/table/data-tables";
import { columns } from "./components/table/columns";

import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import DeleteProgram from "./components/modal/DeleteProgram";
import {
  BookCheck,
  Edit2,
  MinusCircleIcon,
  PlusCircleIcon,
  PlusIcon,
  Trash2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { DepartmentDetails, Major, Program } from "./types/types";
import CreateDepartment from "./components/modal/CreateDepartment";
import CreateProgram from "./components/modal/CreateProgram";
import CreateMajor from "./components/modal/CreateMajor";
import { Button } from "../components/ui/button";
import { useAdminStore } from "./hooks/store";
import EditProgram from "./components/modal/EditProgram";
import DeleteMajor from "./components/modal/DeleteMajor";
import EditMajor from "./components/modal/EditMajor";
import DeleteDepartment from "./components/modal/DeleteDepartment";

const Dashboard = () => {
  const { data, isFetching } = useGetSummaryData();
  const navigate = useNavigate();

  const { data: departments = [] } = useGetDepartmentDetails();

  const [openDeleteProgram, setOpenDeleteProgram] = useState(false);
  const [isOpenCollege, setIsOpenCollege] = useState(false);
  const [isOpenProgram, setIsOpenProgram] = useState(false);
  const [isOpenMajor, setIsOpenMajor] = useState(false);
  const [isOpenDeleteMajor, setIsOpenDeleteMajor] = useState(false);
  const [isOpenEditMajor, setIsOpenEditMajor] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [isOpenRemoveDepartment, setIsOpenRemoveDepartment] = useState(false);
  const { openEditProgram, setOpenEditProgram } = useAdminStore();

  const handleDeleteProgram = () => setOpenDeleteProgram(!openDeleteProgram);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <DataTable
              dataSheet={data}
              excelFilename="employability-data.xlsx"
              serachFor="Year of Graduation"
              filterInputName={"yearOfGraduation"}
              tableHeader={
                <div>
                  <h1 className="text-primary font-bold">Employability Data</h1>
                  <p className="text-sm">Overall Data</p>
                </div>
              }
              columns={columns}
              data={data}
              onRowClick={(row: any) =>
                navigate(`/graduates/${row?.yearOfGraduation}/${row?.program}`)
              }
            />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-[90%] mx-auto my-5 bg-primary rounded-md p-3 sm:p-5"
      >
        {isOpenCollege && (
          <CreateDepartment
            isOpen={isOpenCollege}
            handleIsOpen={setIsOpenCollege}
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-white font-bold text-xl sm:text-2xl">
              Overall Dashboard
            </h1>
            <h2 className="text-white text-sm sm:text-base">Graduate Tracer</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full sm:w-auto"
          >
            <div className="flex gap-2 items-center">
              <Button
                onClick={() => setIsOpenCollege(true)}
                className="w-full sm:w-auto bg-white text-primary hover:bg-primary/10 hover:text-white transition-colors duration-300 text-xs sm:text-sm"
              >
                <PlusCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="ml-1">Create College / Department</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <main className="w-[90%] mx-auto my-5">
        <div>
          <div className="grid gap-8">
            {departments.map((department: DepartmentDetails) => (
              <motion.div
                key={department.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                  <div>
                    <p className="text-gray-500 font-bold text-sm sm:text-base">
                      Department
                    </p>
                    <h3 className="text-sm sm:text-base">
                      {department.department}
                    </h3>
                  </div>

                  {isOpenProgram && (
                    <CreateProgram
                      isOpen={isOpenProgram}
                      handleIsOpen={setIsOpenProgram}
                      departmentId={selectedId}
                    />
                  )}

                  {isOpenRemoveDepartment && (
                    <DeleteDepartment
                      isOpen={isOpenRemoveDepartment}
                      handleIsOpen={setIsOpenRemoveDepartment}
                      departmentId={selectedId}
                    />
                  )}

                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Button
                      onClick={() => {
                        setIsOpenProgram(true);
                        setSelectedId(department?.id as number);
                      }}
                      className="bg-primary text-white w-full sm:w-auto text-xs sm:text-sm"
                    >
                      <PlusCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="ml-1">Create Program</span>
                    </Button>
                    <Button
                      onClick={() => {
                        setIsOpenRemoveDepartment(true);
                        setSelectedId(department?.id as number);
                      }}
                      className="bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-300 w-full sm:w-auto text-xs sm:text-sm"
                    >
                      <MinusCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="ml-1">Remove Department</span>
                    </Button>
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-2">
                  {department.listOfProgram?.map((program: Program) => (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="border rounded-xl hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-5 bg-gray-50/50 gap-4 sm:gap-0">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <BookCheck className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                            <p className="text-gray-500">Program</p>
                            {program.program}
                          </h4>
                        </div>

                        {openDeleteProgram && (
                          <DeleteProgram
                            isOpen={openDeleteProgram}
                            handleIsOpen={setOpenDeleteProgram}
                            programId={program?.id as number}
                          />
                        )}

                        {isOpenMajor && (
                          <CreateMajor
                            isOpen={isOpenMajor}
                            handleIsOpen={setIsOpenMajor}
                            id={program?.id as number}
                          />
                        )}

                        {openEditProgram && (
                          <EditProgram
                            isOpen={openEditProgram}
                            handleIsOpen={setOpenEditProgram}
                            programId={program?.id as number}
                          />
                        )}

                        <div className="flex gap-3 w-full sm:w-auto justify-end">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 hover:bg-red-50 rounded-lg text-gray-500 transition-colors"
                            onClick={() => setIsOpenMajor(true)}
                            title="Add Major"
                          >
                            <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                            onClick={handleDeleteProgram}
                            title="Delete Program"
                          >
                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                            title="Edit Program"
                            onClick={() => setOpenEditProgram(true)}
                          >
                            <Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          </motion.button>
                        </div>
                      </div>

                      <Accordion type="single" collapsible>
                        <AccordionItem value="majors">
                          <AccordionTrigger className="px-3 sm:px-5 py-3 sm:py-4 hover:no-underline">
                            <span className="text-primary font-medium text-sm sm:text-base">
                              Majors ({program.listOfMajor?.length ?? 0})
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="p-3 sm:p-5 space-y-3 bg-gray-50/30">
                              {program.listOfMajor?.length ? (
                                program.listOfMajor.map((major: Major) => (
                                  <motion.div
                                    key={major.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg hover:shadow-sm transition-all duration-300"
                                  >
                                    {isOpenDeleteMajor && (
                                      <DeleteMajor
                                        isOpen={isOpenDeleteMajor}
                                        handleIsOpen={setIsOpenDeleteMajor}
                                        majorId={selectedId}
                                      />
                                    )}

                                    {isOpenEditMajor && (
                                      <EditMajor
                                        isOpen={isOpenEditMajor}
                                        handleIsOpen={setIsOpenEditMajor}
                                        majorId={selectedId}
                                      />
                                    )}
                                    <span className="text-gray-700 font-medium text-sm sm:text-base">
                                      {major.major}
                                    </span>
                                    <div className="flex gap-2">
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                        title="Delete Major"
                                        onClick={() => {
                                          setIsOpenDeleteMajor(true);
                                          setSelectedId(major?.id as number);
                                        }}
                                      >
                                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                                        title="Edit Major"
                                        onClick={() => {
                                          setSelectedId(major?.id as number);
                                          setIsOpenEditMajor(true);
                                        }}
                                      >
                                        <Edit2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                      </motion.button>
                                    </div>
                                  </motion.div>
                                ))
                              ) : (
                                <p className="text-gray-500 text-center py-3 text-sm sm:text-base">
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
