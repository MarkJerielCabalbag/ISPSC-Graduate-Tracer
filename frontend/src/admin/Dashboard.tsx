import { Toaster } from "react-hot-toast";
import DataTable from "./components/table/DataTable";
import { adminColumns } from "./hooks/useTable";
import { useGetSummaryData } from "./hooks/client";
import { useState } from "react";
import CreateDepartment from "./components/modal/CreateDepartment";
import CreateProgram from "./components/modal/CreateProgram";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import CreateMajor from "./components/modal/CreateMajor";
import { Button } from "../components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { formatData } from "./utils/utils";
import Header from "./components/Header";
import OverviewTracedStudents from "./components/OverviewTracedStudents";
const Dashboard = () => {
  const { data } = useGetSummaryData();
  const [isOpenCollege, setIsOpenCollege] = useState(false);
  const [isOpenProgram, setIsOpenProgram] = useState(false);
  const [isOpenMajor, setIsOpenMajor] = useState(false);

  const formattedData = formatData(
    data || [],
    (yearData: { yearOfGraduation: string; programData: any[] }) =>
      yearData.programData.map((programData) => ({
        yearOfGraduation: yearData.yearOfGraduation,
        ...programData,
      }))
  );

  console.log(formattedData);
  return (
    <div>
      <Header />
      <OverviewTracedStudents />
      {<Toaster />}
      {isOpenCollege && (
        <CreateDepartment
          isOpen={isOpenCollege}
          handleIsOpen={setIsOpenCollege}
        />
      )}

      {isOpenProgram && (
        <CreateProgram isOpen={isOpenProgram} handleIsOpen={setIsOpenProgram} />
      )}

      {isOpenMajor && (
        <CreateMajor isOpen={isOpenMajor} handleIsOpen={setIsOpenMajor} />
      )}
      <div className="w-[90%] mx-auto">
        <DataTable
          data={formattedData}
          column={adminColumns}
          rowLength={formattedData.length}
          tableHeader={
            <>
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-primary font-bold">Overall Dashboard</h1>
                  <h2 className="text-black">Graduate Tracer</h2>
                </div>
                <div className="flex justify-end">
                  <Popover>
                    <PopoverTrigger className="py-2 px-4 bg-primary text-white rounded-md">
                      Open
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex flex-col space-y-2">
                        <Button
                          onClick={() => setIsOpenCollege(true)}
                          className="bg-transparent text-black flex items-center justify-start gap-2 hover:bg-transparent"
                        >
                          <PlusCircleIcon />
                          Create College / Department
                        </Button>
                        <Button
                          onClick={() => setIsOpenProgram(true)}
                          className="bg-transparent text-black flex items-center justify-start gap-2 hover:bg-transparent"
                        >
                          <PlusCircleIcon />
                          Create Program
                        </Button>
                        <Button
                          onClick={() => setIsOpenMajor(true)}
                          className="bg-transparent text-black flex items-center justify-start gap-2 hover:bg-transparent"
                        >
                          <PlusCircleIcon />
                          Create Major
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;
