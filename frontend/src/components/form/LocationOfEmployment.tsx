import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useFormStore } from "../../hooks/store";
type ErrorType = {
  isError: boolean;
};

const LocationOfEmployment = (isError: ErrorType) => {
  const { handleCurrentJobLocation } = useFormStore();
  return (
    <div className="my-5">
      <h1 className="bg-primary p-3 main-font rounded-md">
        V. Location of Employment
      </h1>

      <div>
        <h1 className="text-lg text-primary my-3 italic">
          Where is your current job located?
        </h1>
        <RadioGroup onValueChange={(value) => handleCurrentJobLocation(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="locally"
              id="locally"
              className={` ${isError ? "border-red-500" : ""}`}
            />
            <Label htmlFor="locally">Locally</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="abroad"
              id="abroad"
              className={` ${isError ? "border-red-500" : ""}`}
            />
            <Label htmlFor="abroad">Abroad</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default LocationOfEmployment;
