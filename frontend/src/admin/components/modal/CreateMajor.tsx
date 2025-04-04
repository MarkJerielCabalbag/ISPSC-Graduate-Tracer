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
import { ModalType } from "../../types/types";
import { useCreateMajor } from "../../hooks/client";
import { useAdminStore } from "../../hooks/store";
import { Input } from "../../../components/ui/input";

type CreateMajorType = ModalType & {
  id?: number;
};

const CreateMajor = ({ isOpen, handleIsOpen, id }: CreateMajorType) => {
  const { setMajorProgram, major } = useAdminStore();
  const { mutateAsync: createMajor, isPending } = useCreateMajor(
    major,
    id as number
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={handleIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Major</AlertDialogTitle>
          <AlertDialogDescription>
            <Label className="my-3">Major Name</Label>
            <Input
              type="text"
              value={major.toUpperCase()}
              onChange={(e) => setMajorProgram(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => {
              handleIsOpen(false);
              setMajorProgram("");
            }}
          >
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={async () => {
              try {
                await createMajor();
                handleIsOpen(false);
                setMajorProgram("");
              } catch (error) {
                setMajorProgram("");
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
