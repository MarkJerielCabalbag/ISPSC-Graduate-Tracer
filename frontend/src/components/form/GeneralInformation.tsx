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
    <div className="space-y-6">
      <h1 className="bg-primary p-4 main-font rounded-lg mb-8">
        I. General Information
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-md font-bold text-gray-700 mb-3">
            Full Name
          </label>
          <Input
            placeholder="Ex (Juan D. Cruz)"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-md font-bold text-gray-700 mb-3">
            Year of Graduation
          </label>
          <Select onValueChange={(value) => handleGraduationChange(value)}>
            <SelectTrigger className="w-full focus:ring-2 focus:ring-primary/50 transition-all">
              <SelectValue placeholder="Select Year of Survey" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year: number) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
