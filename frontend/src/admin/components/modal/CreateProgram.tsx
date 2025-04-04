import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";

import { Label } from "../../../components/ui/label";
import { useCreateProgram } from "../../hooks/client";
import { useAdminStore } from "../../hooks/store";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { ModalType } from "../../types/types";

type CreateProgramType = ModalType & {
  departmentId: number;
};

const CreateProgram = ({
  isOpen,
  handleIsOpen,
  departmentId,
}: CreateProgramType) => {
  const { setProgramDepartment, program } = useAdminStore();
  const { mutateAsync: createProgram, isPending } = useCreateProgram(
    program,
    departmentId as number
  );
  console.log("departmentId", departmentId);
  return (
    <AlertDialog open={isOpen} onOpenChange={handleIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Program</AlertDialogTitle>
          <AlertDialogDescription>
            <Label className="my-3">Program Name</Label>
            <Input
              placeholder="Please enter the program name"
              type="text"
              value={program.toUpperCase()}
              onChange={(e) => setProgramDepartment(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => {
              handleIsOpen(!isOpen);
              setProgramDepartment("");
            }}
          >
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={async () => {
              try {
                await createProgram();
                setProgramDepartment("");
                handleIsOpen(false);
              } catch (error) {
                console.log(error);
                setProgramDepartment("");
                handleIsOpen(true);
              }
            }}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateProgram;
