import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { ModalType } from "../../types/types";
import { useEditMajor } from "../../hooks/client";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
type EditMajorType = ModalType & {
  majorId: number;
};

const EditMajor = ({ majorId, isOpen, handleIsOpen }: EditMajorType) => {
  const [major, setMajor] = useState("");
  const { mutateAsync, isPending } = useEditMajor(majorId, major);
  console.log("majorId", majorId);
  return (
    <AlertDialog open={isOpen} onOpenChange={handleIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Major</AlertDialogTitle>
          <AlertDialogDescription>
            <Label className="my-3">New Major Name</Label>
            <Input
              type="text"
              value={major.toUpperCase()}
              onChange={(e) => setMajor(e.target.value)}
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

export default EditMajor;
