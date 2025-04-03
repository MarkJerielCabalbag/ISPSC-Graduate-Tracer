import { useNavigate, useParams } from "react-router-dom";
import { useGetDepartmentDetails } from "../hooks/client";
import Header from "./Header";
import { DepartmentDetails, Major } from "../types/types";
import { ArrowLeft, BookCheck, Edit2, Loader2, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { useState } from "react";
import DeleteProgram from "./modal/DeleteProgram";

const OverviewDepartments = () => {
  const { departmentId } = useParams();
  const {
    data: departments = [],
    isLoading,
    isFetching,
  } = useGetDepartmentDetails(departmentId ?? "");
  const navigate = useNavigate();

  const [openDeleteProgram, setOpenDeleteProgram] = useState(false);

  const handleBackClick = () => navigate("/admin");
  const handleDeleteProgram = () => setOpenDeleteProgram(!openDeleteProgram);

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-[60vh]"></div>
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="w-[90%] mx-auto my-5">
        <div className="">
          <header className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBackClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-primary" />
            </button>
            <h1 className="text-2xl font-bold text-primary">Programs</h1>
          </header>

          <div className="bg-white shadow-sm rounded-lg p-6 space-y-6">
            {departments.map((department: DepartmentDetails) => (
              <div
                key={department.program}
                className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
              >
                {openDeleteProgram && (
                  <DeleteProgram
                    isOpen={openDeleteProgram}
                    handleIsOpen={setOpenDeleteProgram}
                    majorId={0}
                  />
                )}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <BookCheck className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {department.program}
                    </h2>
                  </div>

                  <div className="flex gap-3">
                    <button className="p-2 hover:bg-red-50 rounded-full text-red-500 transition-colors">
                      <Trash2
                        className="h-5 w-5"
                        onClick={handleDeleteProgram}
                      />
                    </button>
                    <button className="p-2 hover:bg-primary/10 rounded-full text-primary transition-colors">
                      <Edit2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <Accordion
                  type="single"
                  collapsible
                  className="bg-gray-50 rounded-md"
                >
                  <AccordionItem value="majors">
                    <AccordionTrigger className="px-4 py-3 text-primary hover:no-underline">
                      List of Majors ({department.listOfMajor?.length ?? 0})
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 p-4">
                        {department?.listOfMajor?.map((major: Major) => {
                          return (
                            <div
                              key={major.id}
                              className="bg-white p-3 rounded-md flex justify-between items-center hover:shadow-sm transition-shadow"
                            >
                              <p className="text-gray-700">{major.major}</p>
                              <div className="flex gap-2">
                                <button className="p-1.5 hover:bg-red-50 rounded-full text-red-500 transition-colors">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 hover:bg-primary/10 rounded-full text-primary transition-colors">
                                  <Edit2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OverviewDepartments;
