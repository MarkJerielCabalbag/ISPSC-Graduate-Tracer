import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useFormStore } from "../../hooks/store";

const EmployementSector = () => {
  const { handleTypeOfOrganization } = useFormStore();

  return (
    <div className="my-5">
      <h1 className="bg-primary p-3 main-font rounded-md mb-8">
        IV. Employment Sector
      </h1>

      <div>
        <h1 className="text-md font-bold text-gray-700 mb-3">
          What type of organization do you work for?
        </h1>
        <RadioGroup onValueChange={(value) => handleTypeOfOrganization(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="government" id="government" />
            <Label htmlFor="government">Government</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="private institution"
              id="private institution"
            />
            <Label htmlFor="private institution">Private Institution</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="entreprenueral / freelance"
              id="entreprenueral / freelance"
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
