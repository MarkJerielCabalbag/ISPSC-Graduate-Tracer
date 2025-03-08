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
    isContinueFillOut,
    handleMajorSelect,
    handleDepartmentChange,
    handleMajorChange,
    handleContinueFillOutChange,
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

  const { mutateAsync: addResponse } = hooks.useAddResponse();

  return (
    <div>
      <h1 className="bg-primary p-3 main-font rounded-md">
        II. Graduate Employment Information
      </h1>

      <div className="flex items-center gap-5">
        <div className="w-1/2 my-5">
          <h1>College / Department</h1>
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
      </div>

      {isProgramPending ? (
        <div className="my-5 flex gap-2 items-center text-primary">
          <Loader2Icon className="animate-spin" />
          Program is loading...
        </div>
      ) : (
        <div className={`w-full mb-5 ${isProgramOpen ? "" : "hidden"}`}>
          <h1>Program</h1>
          <Select onValueChange={(value) => handleMajorChange(value, getMajor)}>
            <SelectTrigger className="w-full">
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

      {isMajorPending ? (
        <div className="my-5 flex gap-2 items-center text-primary collapse">
          <Loader2Icon className="animate-spin" />
          Major is loading...
        </div>
      ) : (
        <div className={`w-full mb-5 ${isMajorOpen ? "" : "hidden"}`}>
          <h1>Major</h1>
          <Select onValueChange={(value) => handleMajorSelect(value)}>
            <SelectTrigger className="w-full">
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

      <div>
        <h1 className="text-lg text-primary mb-3 italic">
          Are you currently employed?
        </h1>
        <RadioGroup
          onValueChange={(value) => handleContinueFillOutChange(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>

        {isContinueFillOut ? (
          <>
            <RelevanceOfEmployment />
            <EmployementSector />
            <LocationOfEmployment />

            <div className="my-5 flex justify-end items-center gap-5">
              <Button className="bg-white text-primary shadow-md hover:text-white">
                Clear
              </Button>
              <Button
                onClick={async () => {
                  console.log({
                    yearOfSurvey: yearOfSurvey,
                    email: email,
                    fullName: fullName,
                    yearOfGraduation: yearOfGraduation,
                    departmentId: departmentId,
                    programId: programId,
                    majorId: majorId,
                    isJobAligned: isJobAligned,
                    isSelfEmployed: isSelfEmployed,
                    isFurtherStudies: isFurtherStudies,
                    typeOfOrganization: typeOfOrganization,
                    currentJobLocated: currentJobLocated,
                  });

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
                  });
                }}
              >
                Submit
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="my-5 flex justify-end items-center gap-5">
              <Button className="bg-white text-primary shadow-md hover:text-white">
                Clear
              </Button>
              <Button>Submit</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GraduateEmploymentInformation;
