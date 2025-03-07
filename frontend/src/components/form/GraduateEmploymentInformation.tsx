import { hooks } from "../../hooks/hooks";
import { EmploymentInformation } from "../../types/type";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { displayYears } from "../../utils/utils";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

const years = displayYears(2020, 2080);

const GraduateEmploymentInformation = () => {
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [isProgramOpen, setOpenProgram] = useState(false);
  const [isMajorOpen, setOpenMajor] = useState(false);
  const { data: department, isLoading: isDepartmentLoading } =
    hooks.useGetCollegeDepartment();
  const { mutateAsync, data: programs } = hooks.useGetRelatedProgram(
    departmentId || 0
  );

  const handleDepartmentChange = async (value: string) => {
    const id = Number(value);
    setDepartmentId(id);
    setOpenProgram(true);
    await mutateAsync();
  };

  return (
    <div>
      <h1 className="bg-primary p-3 main-font rounded-md">
        II. Graduate Employment Information
      </h1>

      <div className="flex items-center gap-5">
        <div className="w-1/2 my-5">
          <h1>College / Department</h1>
          <Select onValueChange={handleDepartmentChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select College / Department" />
            </SelectTrigger>
            <SelectContent>
              {isDepartmentLoading ? (
                <div className="flex justify-center items-center my-3 text-primary">
                  <Loader2Icon className="animate-spin" /> Loading
                  Departments...
                </div>
              ) : (
                department?.map((emInfo: EmploymentInformation) => (
                  <SelectItem key={emInfo.id} value={String(emInfo.id)}>
                    {emInfo.department}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Year of Graduation */}
        <div className="w-1/2 my-5">
          <h1>Year of Graduation</h1>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Year Of Graduation" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year: number) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isProgramOpen && (
        <div className="w-full mb-5">
          <h1>Program</h1>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Program" />
            </SelectTrigger>
            <SelectContent>
              {isDepartmentLoading ? (
                <div className="flex justify-center items-center my-3 text-primary">
                  <Loader2Icon className="animate-spin" /> Loading Programs...
                </div>
              ) : (
                programs?.map((program: EmploymentInformation) => (
                  <SelectItem key={program.id} value={String(program.id)}>
                    {program.program}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      )}

      {isMajorOpen && (
        <div className="w-full mb-5">
          <h1>Program</h1>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Major" />
            </SelectTrigger>
            <SelectContent>
              {isDepartmentLoading ? (
                <div className="flex justify-center items-center my-3 text-primary">
                  <Loader2Icon className="animate-spin" /> Loading Programs...
                </div>
              ) : (
                programs?.map((program: EmploymentInformation) => (
                  <SelectItem key={program.id} value={String(program.id)}>
                    {program.program}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default GraduateEmploymentInformation;
