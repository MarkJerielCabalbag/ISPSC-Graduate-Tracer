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
import { Label } from "../../../components/ui/label";
import { useRemoveMajor } from "../../hooks/client";
import { ModalType } from "../../types/types";

type DeleteMajorType = ModalType & {
  majorId: number;
};

const DeleteMajor = ({ isOpen, handleIsOpen, majorId }: DeleteMajorType) => {
  const { mutateAsync, isPending } = useRemoveMajor(majorId);
  return (
    <AlertDialog open={isOpen} onOpenChange={handleIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Major</AlertDialogTitle>
          <AlertDialogDescription>
            <Label className="text-gray-600 leading-6">
              Are you willing to remove this major? This action cannot be
              undone. Please confirm that you want to delete this major.
            </Label>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={async () => {
              try {
                await mutateAsync();
                handleIsOpen(!isOpen);
              } catch (error) {
                console.error("Error deleting major:", error);
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

export default DeleteMajor;
