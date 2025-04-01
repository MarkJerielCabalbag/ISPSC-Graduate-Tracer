import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "../../../components/ui/alert-dialog";
import { Label } from "../../../components/ui/label";
import { ModalType } from "../../types/types";
import { useRemoveProgram } from "../../hooks/client";

type DeleteProgramProps = ModalType & {
  majorId: number;
};

const DeleteProgram = ({
  isOpen,
  majorId,
  handleIsOpen,
}: DeleteProgramProps) => {
  const { mutateAsync: removeProgram } = useRemoveProgram(majorId);

  console.log(majorId, "majorId");
  return (
    <AlertDialog open={isOpen} onOpenChange={handleIsOpen}>
      <AlertDialogContent className="max-w-[425px]">
        <AlertDialogHeader className="gap-2">
          <AlertDialogTitle className="text-xl font-semibold text-primary flex gap-2 items">
            <Trash2 /> Delete Program
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-2">
            <Label className="text-gray-600 leading-6">
              Are you willing to remove this program? This action cannot be
              undone. Please confirm that you want to delete this program.
              Removing this program will also delete all the data related to
              this program.
            </Label>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 pt-6">
          <AlertDialogCancel
            onClick={() => handleIsOpen(!isOpen)}
            className="border-gray-200 hover:bg-gray-100"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => {
              handleIsOpen(false);
              removeProgram();
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProgram;
