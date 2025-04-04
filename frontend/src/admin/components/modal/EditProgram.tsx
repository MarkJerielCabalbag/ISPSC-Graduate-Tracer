import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useEditProgram } from "../../hooks/client";
import { useAdminStore } from "../../hooks/store";
import { ModalType } from "../../types/types";

type EditProgramTypes = ModalType & {
  programId: number;
};

const EditProgram = ({ isOpen, handleIsOpen, programId }: EditProgramTypes) => {
  const { program, setNewProgram } = useAdminStore();
  const { mutateAsync, isPending } = useEditProgram(programId, program);
  return (
    <AlertDialog open={isOpen} onOpenChange={handleIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Program</AlertDialogTitle>
          <AlertDialogDescription>
            <Label className="my-3">New Program Name</Label>
            <Input
              type="text"
              value={program.toUpperCase()}
              onChange={(e) => setNewProgram(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={async () => {
              try {
                await mutateAsync();
                handleIsOpen(false);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditProgram;
