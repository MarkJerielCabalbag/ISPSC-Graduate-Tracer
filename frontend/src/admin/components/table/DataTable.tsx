import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import CreateDepartment from "../modal/CreateDepartment";
import CreateProgram from "../modal/CreateProgram";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import CreateMajor from "../modal/CreateMajor";
import { PlusCircleIcon } from "lucide-react";

const DataTable = () => {
  const [isOpenCollege, setIsOpenCollege] = useState(false);
  const [isOpenProgram, setIsOpenProgram] = useState(false);
  const [isOpenMajor, setIsOpenMajor] = useState(false);
  return (
    <div className="w-[100%]">
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
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Dashboard</CardTitle>

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
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default DataTable;
