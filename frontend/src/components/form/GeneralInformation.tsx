import { Input } from "../ui/input";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { displayYears } from "../../utils/utils";
import { useFormStore } from "../../hooks/store";
import { useEffect, useState } from "react";

const years = displayYears(2020, 2080);

const GeneralInformation = () => {
  const [name, setName] = useState("");
  const { handleNameChange, handleGraduationChange } = useFormStore();
  useEffect(() => {
    handleNameChange(name);
  }, [name]);

  return (
    <div>
      <h1 className="bg-primary p-3 main-font rounded-md">
        I. General Information
      </h1>

      <div className="flex items-center gap-5">
        <div className="w-1/2 my-5">
          <h1>Full Name</h1>
          <Input
            placeholder="Ex (Juan D. Cruz)"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-1/2 my-5">
          <h1>Year of Graduation</h1>
          <Select onValueChange={(value) => handleGraduationChange(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Year of Survey" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year: number) => (
                <SelectItem value={String(year)}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
