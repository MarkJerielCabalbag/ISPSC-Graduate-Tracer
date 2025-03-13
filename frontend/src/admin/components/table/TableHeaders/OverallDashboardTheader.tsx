import { PlusCircleIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { useState } from "react";
import CreateDepartment from "../../modal/CreateDepartment";
import CreateProgram from "../../modal/CreateProgram";
import CreateMajor from "../../modal/CreateMajor";

const OverallDashboardTheader = () => {
  const [isOpenCollege, setIsOpenCollege] = useState(false);
  const [isOpenProgram, setIsOpenProgram] = useState(false);
  const [isOpenMajor, setIsOpenMajor] = useState(false);
  return (
    <>
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
  );
};

export default OverallDashboardTheader;
