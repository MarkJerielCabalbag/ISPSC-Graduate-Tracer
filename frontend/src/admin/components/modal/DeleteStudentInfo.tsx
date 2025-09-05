import React from "react";
import { ModalType } from "../../types/types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";

const DeleteStudentInfo = ({ isOpen, handleIsOpen }: ModalType) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={handleIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>Remove Student</AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to delete this student information? This action
          cannot be undone.
        </AlertDialogDescription>
        <AlertDialogFooter className="flex gap-2 items-center">
          <Button variant={"outline"} onClick={() => handleIsOpen(!isOpen)}>
            Cancel
          </Button>
          <Button>Remove</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteStudentInfo;
