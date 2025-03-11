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

const DataTable = () => {
  const [isOpenCollege, setIsOpenCollege] = useState(false);
  const [isOpenProgram, setIsOpenProgram] = useState(false);
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
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <div className="flex gap-2 items-center justify-end">
            <Button onClick={() => setIsOpenCollege(true)}>
              Create College / Department
            </Button>
            <Button onClick={() => setIsOpenProgram(true)}>
              Create Program
            </Button>
            <Button>Create Major</Button>
          </div>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default DataTable;
