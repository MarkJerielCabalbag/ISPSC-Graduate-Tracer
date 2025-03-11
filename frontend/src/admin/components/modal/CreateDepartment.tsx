import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useCreateCollege } from "../../hooks/client";
import { useAdminStore } from "../../hooks/store";
import { ModalType } from "../../types/types";
import { Button } from "../../../components/ui/button";

const CreateDepartment = ({ isOpen, handleIsOpen }: ModalType) => {
  const { department, setCollegeDepartment } = useAdminStore();
  const {
    mutateAsync: createCollegeDepartment,
    isPending: isCreateCollegeDepartmentPending,
    isError,
  } = useCreateCollege(department);
  return (
    <AlertDialog open={isOpen} onOpenChange={handleIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create College / Department</AlertDialogTitle>
          <AlertDialogDescription>
            <Label className="my-3">
              Please fill in the details below to create a new college or
              department.
            </Label>
            <Input
              className={`${isError ? "border-red-500" : ""}`}
              type="text"
              placeholder="Please enter college / department name"
              value={department}
              onChange={(e) => setCollegeDepartment(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleIsOpen(!isOpen)}>
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={async () => {
              try {
                await createCollegeDepartment();
                setCollegeDepartment("");
              } catch (error) {
                console.log(error);
                setCollegeDepartment("");
                handleIsOpen(true);
              }
            }}
          >
            {isCreateCollegeDepartmentPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" />
                Creating...
              </div>
            ) : (
              "Create"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateDepartment;
