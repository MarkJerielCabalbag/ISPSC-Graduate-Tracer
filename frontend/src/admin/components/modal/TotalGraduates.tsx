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
import { ModalType, TotalGraduatesType } from "../../types/types";
import { Button } from "../../../components/ui/button";
import { useAddTotalGraduates } from "../../hooks/client";
import { useState } from "react";

type AddTotalGraduatesType = ModalType & {
  totalGraduates?: TotalGraduatesType[];
  titleModal?: string;
};
const TotalGraduates = ({
  isOpen,
  handleIsOpen,
  totalGraduates,
  titleModal,
}: AddTotalGraduatesType) => {
  const id = totalGraduates?.[0]?.id ?? 0;
  const [total, setTotal] = useState("");
  const { mutateAsync, isPending, isError } = useAddTotalGraduates(
    id,
    Number(total)
  );
  return (
    <AlertDialog open={isOpen} onOpenChange={handleIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{titleModal}</AlertDialogTitle>
          <AlertDialogDescription>
            <Label className="my-3">
              Please fill the exact number of graduates
            </Label>
            <Input
              type="text"
              className={`${isError ? "border-red-500" : ""}`}
              placeholder="Please enter total of graduates"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => handleIsOpen(!isOpen)}
          >
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={async () => {
              try {
                await mutateAsync();
                setTotal("");
                handleIsOpen(false);
              } catch (error) {
                setTotal("");
              }
            }}
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Add"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TotalGraduates;
