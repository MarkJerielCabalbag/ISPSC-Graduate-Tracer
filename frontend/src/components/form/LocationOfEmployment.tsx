import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useFormStore } from "../../hooks/store";

const LocationOfEmployment = () => {
  const { handleCurrentJobLocation } = useFormStore();

  return (
    <div className="my-5">
      <h1 className="bg-primary p-3 main-font rounded-md my-8">
        V. Location of Employment
      </h1>

      <div>
        <h1 className="text-md font-bold text-gray-700 mb-3">
          Where is your current job located?
        </h1>
        <RadioGroup onValueChange={(value) => handleCurrentJobLocation(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="locally" id="locally" />
            <Label htmlFor="locally">Locally</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="abroad" id="abroad" />
            <Label htmlFor="abroad">Abroad</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default LocationOfEmployment;
