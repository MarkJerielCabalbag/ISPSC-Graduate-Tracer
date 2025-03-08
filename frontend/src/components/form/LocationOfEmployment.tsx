import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const LocationOfEmployment = () => {
  return (
    <div className="my-5">
      <h1 className="bg-primary p-3 main-font rounded-md">
        V. Location of Employment
      </h1>

      <div>
        <h1 className="text-lg text-primary my-3 italic">
          Where is your current job located?
        </h1>
        <RadioGroup defaultValue="locally">
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
