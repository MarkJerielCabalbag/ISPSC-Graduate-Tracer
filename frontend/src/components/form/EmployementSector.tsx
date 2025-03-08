import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const EmployementSector = () => {
  return (
    <div className="my-5">
      <h1 className="bg-primary p-3 main-font rounded-md">
        IV. Employment Sector
      </h1>

      <div>
        <h1 className="text-lg text-primary my-3 italic">
          Is your job aligned with your program?
        </h1>
        <RadioGroup defaultValue="yes">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h1 className="text-lg text-primary my-3 italic">
          Are you self-employed
        </h1>
        <RadioGroup defaultValue="yes">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h1 className="text-lg text-primary my-3 italic">
          Are your currently enrolled in further studies?
        </h1>
        <RadioGroup defaultValue="yes">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default EmployementSector;
