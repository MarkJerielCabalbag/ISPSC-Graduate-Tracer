import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Skeleton } from "../../../components/ui/skeleton";
import { collegeDepartment, ModalType } from "../../types/types";
import { Label } from "../../../components/ui/label";
import { useCreateProgram, useGetCollegeDepartment } from "../../hooks/client";
import { useAdminStore } from "../../hooks/store";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

const CreateProgram = ({ isOpen, handleIsOpen }: ModalType) => {
  const { data: department, isLoading } = useGetCollegeDepartment();
  const { setProgramDepartment, program, departmentId } = useAdminStore();
  const { mutateAsync: createProgram, isError } = useCreateProgram(
    program,
    departmentId
  );
  return (
    <AlertDialog open={isOpen} onOpenChange={handleIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a program</AlertDialogTitle>
          <AlertDialogDescription>
            <Label className="my-3">
              Please select first where this program is related to department /
              college.
            </Label>

            {isLoading ? (
              <div>
                <Skeleton className="w-[100%] h-10" />
                <Skeleton className="w-[10%] h-10" />
              </div>
            ) : (
              <Select
                onValueChange={(value) =>
                  setProgramDepartment(program, Number(value))
                }
              >
                <SelectTrigger
                  className={`w-full ${isError ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select a college / department that is related to this new program" />
                </SelectTrigger>
                <SelectContent>
                  {department?.map((program: collegeDepartment) => (
                    <SelectItem key={program.id} value={String(program.id)}>
                      {program.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {departmentId !== 0 && (
              <>
                <Label className="my-3">Program Name</Label>
                <Input
                  placeholder="Please enter the program name"
                  type="text"
                  value={program.toUpperCase()}
                  onChange={(e) =>
                    setProgramDepartment(e.target.value, departmentId)
                  }
                />
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              handleIsOpen(!isOpen);
              setProgramDepartment("", 0);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={async () => {
              try {
                await createProgram();
                setProgramDepartment("", 0);
                handleIsOpen(false);
              } catch (error) {
                console.log(error);
                setProgramDepartment("", 0);
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
