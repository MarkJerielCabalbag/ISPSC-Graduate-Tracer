import { hooks } from "../../hooks/hooks";
import { EmploymentInformation } from "../../types/type";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import RelevanceOfEmployment from "./RelevanceOfEmployment";
import EmployementSector from "./EmployementSector";
import LocationOfEmployment from "./LocationOfEmployment";
import { useFormStore } from "../../hooks/store";

const GraduateEmploymentInformation = () => {
  const { data: department } = hooks.useGetCollegeDepartment();

  const {
    isProgramOpen,
    isMajorOpen,
    yearOfSurvey,
    isEmployed,
    email,
    fullName,
    yearOfGraduation,
    departmentId,
    programId,
    majorId,
    isJobAligned,
    isSelfEmployed,
    isFurtherStudies,
    typeOfOrganization,
    currentJobLocated,
    handleMajorSelect,
    handleDepartmentChange,
    handleMajorChange,
    handleEmployedChange,
  } = useFormStore();

  const {
    mutateAsync: getDepartment,
    data: programs,
    isPending: isProgramPending,
  } = hooks.useGetRelatedProgram(departmentId || 0);

  const {
    mutateAsync: getMajor,
    data: majors,
    isPending: isMajorPending,
  } = hooks.useGetRelatedMajor(programId as number);

  const {
    mutateAsync: addResponse,
    isPending: isAddResponsePending,
    isError,
  } = hooks.useAddResponse();

  return (
    <div className="max-w-4xl mx-auto ">
      <h1 className="bg-primary p-4 main-font rounded-lg mb-8">
        II. Graduate Employment Information
      </h1>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-md font-bold text-gray-700 mb-3">
            College / Department
          </h2>
          <Select
            onValueChange={(value) =>
              handleDepartmentChange(value, getDepartment)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select College / Department" />
            </SelectTrigger>
            <SelectContent>
              {department?.map((emInfo: EmploymentInformation) => (
                <SelectItem key={emInfo.id} value={String(emInfo.id)}>
                  {emInfo.department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Program Section */}
        {isProgramPending ? (
          <div className="flex gap-2 items-center text-primary p-4 bg-primary/5 rounded-lg">
            <Loader2Icon className="animate-spin" />
            <span>Loading programs...</span>
          </div>
        ) : (
          <div
            className={`bg-white p-6 rounded-lg shadow-sm ${
              isProgramOpen ? "" : "hidden"
            }`}
          >
            <h2 className="text-lg font-medium mb-3">Program</h2>
            <Select
              onValueChange={(value) => handleMajorChange(value, getMajor)}
            >
              <SelectTrigger
                className={`w-full ${isError ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Select Program" />
              </SelectTrigger>
              <SelectContent>
                {programs?.map((program: EmploymentInformation) => (
                  <SelectItem key={program.id} value={String(program.id)}>
                    {program.program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Major Section */}
        <>
          {majors?.length !== 0 && isMajorPending && (
            <div className="flex gap-2 items-center text-primary p-4 bg-primary/5 rounded-lg">
              <Loader2Icon className="animate-spin" />
              <span>Loading majors...</span>
            </div>
          )}

          {majors?.length === 0 && (
            <div className="p-4 bg-primary/5 rounded-lg text-gray-600">
              Major is not available
            </div>
          )}

          {majors?.length > 0 && (
            <div
              className={`bg-white p-6 rounded-lg shadow-sm ${
                isMajorOpen ? "" : "hidden"
              }`}
            >
              <h2 className="text-lg font-medium mb-3">Major</h2>
              <Select onValueChange={(value) => handleMajorSelect(value)}>
                <SelectTrigger
                  className={`w-full ${isError ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select Major" />
                </SelectTrigger>
                <SelectContent>
                  {majors?.map((major: EmploymentInformation) => (
                    <SelectItem key={major.id} value={String(major.id)}>
                      {major.major}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </>

        {/* Employment Status Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-md font-bold text-gray-700 mb-3">
            Are you currently employed?
          </h2>
          <RadioGroup
            onValueChange={(value) => handleEmployedChange(value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>

          <div className="space-y-6 mt-6">
            <RelevanceOfEmployment />
            <EmployementSector />
            <LocationOfEmployment />
          </div>

          <div className="mt-8 flex justify-end items-center gap-4">
            <Button className="bg-white text-primary border border-primary shadow-sm hover:bg-primary/10">
              Clear
            </Button>

            {isAddResponsePending ? (
              <Button className="bg-primary text-white min-w-[100px]">
                <Loader2Icon className="animate-spin" />
              </Button>
            ) : (
              <Button
                className="bg-primary text-white min-w-[100px] hover:bg-primary/90"
                onClick={async () => {
                  try {
                    await addResponse({
                      yearOfSurvey: parseInt(yearOfSurvey),
                      email: email,
                      fullName: fullName,
                      yearOfGraduation: parseInt(yearOfGraduation),
                      departmentId: departmentId,
                      programId: programId,
                      majorId: majorId,
                      isJobAligned: isJobAligned,
                      isSelfEmployed: isSelfEmployed,
                      isFurtherStudies: isFurtherStudies,
                      typeOfOrganization: typeOfOrganization,
                      currentJobLocated: currentJobLocated,
                      isEmployed: isEmployed,
                    });
                  } catch (e) {
                    console.log("An error occured:", e);
                  }
                }}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraduateEmploymentInformation;
