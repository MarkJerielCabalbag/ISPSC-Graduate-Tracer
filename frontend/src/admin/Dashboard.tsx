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
              columns={columns}
              data={data}
              onRowClick={(row: any) =>
                navigate(`/graduates/${row?.yearOfGraduation}/${row?.program}`)
              }
            />
          </motion.div>
        )}
      </motion.div>

      <div className="w-[90%] mx-auto my-10 bg-primary rounded-md p-5">
        {isOpenCollege && (
          <CreateDepartment
            isOpen={isOpenCollege}
            handleIsOpen={setIsOpenCollege}
          />
        )}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white font-bold">Overall Dashboard</h1>
            <h2 className="text-white">Graduate Tracer</h2>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <Button
                onClick={() => setIsOpenCollege(true)}
                className="bg-white text-primary hover:bg-primary/10 hover:text-white transition-colors duration-300"
              >
                <PlusCircleIcon />
                Create College / Department
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="w-[90%] mx-auto my-5">
        <div>
          <div className="grid gap-8">
            {departments.map((department: DepartmentDetails) => (
              <motion.div
                key={department.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="p-6 flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 font-bold">Department</p>
                    <h3 className="">{department.department}</h3>
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

                  <div className="flex gap-2 items-center">
                    <Button
                      onClick={() => {
                        setIsOpenProgram(true);
                        setSelectedId(department?.id as number);
                      }}
                      className="bg-primary text-white"
                    >
                      <PlusCircleIcon />
                      Create Program
                    </Button>
                    <Button
                      onClick={() => {
                        setIsOpenRemoveDepartment(true);
                        setSelectedId(department?.id as number);
                      }}
                      className="bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-300"
                    >
                      <MinusCircleIcon />
                      Remove Department
                    </Button>
                  </div>
                </div>

                <div className="p-6 space-y-2">
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

                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 hover:bg-red-50 rounded-lg text-gray-500 transition-colors"
                            onClick={() => setIsOpenMajor(true)}
                            title="Delete Program"
                          >
                            <PlusIcon className="h-5 w-5" />
                          </motion.button>
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
                            onClick={() => setOpenEditProgram(true)}
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
                                    <span className="text-gray-700 font-medium">
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
                                        <Trash2 className="h-4 w-4" />
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
