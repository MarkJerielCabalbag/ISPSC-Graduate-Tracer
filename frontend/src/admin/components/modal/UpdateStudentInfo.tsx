import { ModalType } from "../../types/types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import GeneralInformation from "../../../components/form/GeneralInformation";
import GraduateEmploymentInformation from "../../../components/form/GraduateEmploymentInformation";
import RelevanceOfEmployment from "../../../components/form/RelevanceOfEmployment";
import EmployementSector from "../../../components/form/EmployementSector";
import LocationOfEmployment from "../../../components/form/LocationOfEmployment";
type UpdateStudentInfoProps = {
  selectedStudentId: number;
} & ModalType;

const UpdateStudentInfo = ({
  isOpen,
  handleIsOpen,
  selectedStudentId,
}: UpdateStudentInfoProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={handleIsOpen}>
      <AlertDialogContent className="max-w-11/12 sm:max-w-2xl">
        <AlertDialogHeader>Update Student</AlertDialogHeader>
        <AlertDialogDescription>
          <GeneralInformation />
          <GraduateEmploymentInformation />
          <RelevanceOfEmployment />
          <EmployementSector />
          <LocationOfEmployment />
        </AlertDialogDescription>
        <AlertDialogFooter className="flex gap-2 items-center">
          <Button variant={"outline"} onClick={() => handleIsOpen(!isOpen)}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              try {
                handleIsOpen(!isOpen);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Update
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateStudentInfo;
