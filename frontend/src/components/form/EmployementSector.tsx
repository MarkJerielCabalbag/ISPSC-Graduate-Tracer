import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useFormStore } from "../../hooks/store";
type ErrorType = {
  isError: boolean;
};

const EmployementSector = (isError: ErrorType) => {
  const { handleTypeOfOrganization } = useFormStore();
  return (
    <div className="my-5">
      <h1 className="bg-primary p-3 main-font rounded-md">
        IV. Employment Sector
      </h1>

      <div>
        <h1 className="text-lg text-primary my-3 italic">
          What type of organization do you work for?
        </h1>
        <RadioGroup onValueChange={(value) => handleTypeOfOrganization(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="government"
              id="government"
              className={` ${isError ? "border-red-500" : ""}`}
            />
            <Label htmlFor="government">Government</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="private institution"
              id="private institution"
              className={` ${isError ? "border-red-500" : ""}`}
            />
            <Label htmlFor="private institution">Private Institution</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="entreprenueral / freelance"
              id="entreprenueral / freelance"
              className={` ${isError ? "border-red-500" : ""}`}
            />
            <Label htmlFor="entreprenueral / freelance">
              Entreprenueral / Freelance
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default EmployementSector;
