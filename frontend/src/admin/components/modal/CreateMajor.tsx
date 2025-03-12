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

import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { collegeDepartment, ModalType } from "../../types/types";
import { useCreateMajor, useGetPrograms } from "../../hooks/client";
import { useAdminStore } from "../../hooks/store";
import { Input } from "../../../components/ui/input";

const CreateMajor = ({ isOpen, handleIsOpen }: ModalType) => {
  const { data: programs, isLoading } = useGetPrograms();

  const { programId, setMajorProgram, major } = useAdminStore();
  const {
    mutateAsync: createMajor,
    isError,
    isPending,
  } = useCreateMajor(major, programId);

  return (
    <AlertDialog open={isOpen} onOpenChange={handleIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Major</AlertDialogTitle>
          <AlertDialogDescription>
            <Label className="my-3">
              Please select first where this program is related to.
            </Label>

            {isLoading ? (
              <>loading</>
            ) : (
              <>
                <Select
                  onValueChange={(value) =>
                    setMajorProgram(major, Number(value))
                  }
                >
                  <SelectTrigger
                    className={`w-[100%] ${isError ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select a program that is related to this new major" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs?.map((program: collegeDepartment) => (
                      <SelectItem key={program.id} value={String(program.id)}>
                        {program.program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}

            {programId !== 0 && (
              <>
                <Label className="my-3">Major Name</Label>
                <Input
                  type="text"
                  value={major.toUpperCase()}
                  onChange={(e) => setMajorProgram(e.target.value, programId)}
                />
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              handleIsOpen(false);
              setMajorProgram("", 0);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={async () => {
              try {
                await createMajor();
                handleIsOpen(false);
                setMajorProgram("", 0);
              } catch (error) {
                setMajorProgram("", 0);
                handleIsOpen(true);
                console.log(error);
              }
            }}
          >
            Create
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateMajor;
