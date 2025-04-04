import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useFormStore } from "../../hooks/store";

const RelevanceOfEmployment = () => {
  const { handleAlignedJob, handleSelfEmployed, handleFurtherStudies } =
    useFormStore();

  return (
    <div className="my-5">
      <h1 className="bg-primary p-3 main-font rounded-md my-8">
        III. Relevance of Employment Degree
      </h1>

      <div>
        <h1 className="text-md font-bold text-gray-700 mb-3">
          Is your job aligned with your program?
        </h1>
        <RadioGroup onValueChange={(value) => handleAlignedJob(value)}>
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
        <h1 className="text-md font-bold text-gray-700 mb-3">
          Are you self-employed
        </h1>
        <RadioGroup onValueChange={(value) => handleSelfEmployed(value)}>
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
        <h1 className="text-md font-bold text-gray-700 mb-3">
          Are your currently enrolled in further studies?
        </h1>
        <RadioGroup onValueChange={(value) => handleFurtherStudies(value)}>
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

export default RelevanceOfEmployment;
