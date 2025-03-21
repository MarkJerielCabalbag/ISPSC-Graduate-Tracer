import { PlusCircleIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";

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
      <div className="flex gap-5 items-center">
        <div>
          <h1 className="text-primary font-bold">Overall Dashboard</h1>
          <h2 className="text-black">Graduate Tracer</h2>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Button
              onClick={() => setIsOpenCollege(true)}
              className="bg-primary text-white"
            >
              <PlusCircleIcon />
              Create College / Department
            </Button>
            <Button
              onClick={() => setIsOpenProgram(true)}
              className="bg-primary text-white"
            >
              <PlusCircleIcon />
              Create Program
            </Button>
            <Button
              onClick={() => setIsOpenMajor(true)}
              className="bg-primary text-white"
            >
              <PlusCircleIcon />
              Create Major
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverallDashboardTheader;
