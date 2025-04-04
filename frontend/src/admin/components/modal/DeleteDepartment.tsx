import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { useRemoveDepartment } from "../../hooks/client";
import { ModalType } from "../../types/types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from ".././../../components/ui/alert-dialog";

type DeleteDepartmentType = ModalType & {
  departmentId: number;
};

const DeleteDepartment = ({
  departmentId,
  isOpen,
  handleIsOpen,
}: DeleteDepartmentType) => {
  const { mutateAsync, isPending } = useRemoveDepartment(departmentId);
  return (
    <AlertDialog open={isOpen} onOpenChange={handleIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Department</AlertDialogTitle>
          <AlertDialogDescription>
            <Label className="text-gray-600 leading-6">
              Are you sure you want to delete this department? This action
              cannot be undone. Please confirm that you want to delete this
              department.
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
                handleIsOpen(false);
              } catch (error) {
                console.error("Error deleting department:", error);
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

export default DeleteDepartment;
