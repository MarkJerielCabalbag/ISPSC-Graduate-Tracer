import { Input } from "./components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./components/ui/select";
import { displayYears } from "./utils/utils";
import GeneralInformation from "./components/form/GeneralInformation";
import GraduateEmploymentInformation from "./components/form/GraduateEmploymentInformation";
import { useFormStore } from "./hooks/store";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

const years = displayYears(2020, 2080);

const Form = () => {
  const [email, setEmail] = useState("");
  const { handleEmailChange, handleSurveyChange } = useFormStore();

  useEffect(() => {
    handleEmailChange(email);
  }, [email]);
  return (
    <div className="w-[90%] max-w-[768px] mx-auto space-y-8">
      <Header />
      {<Toaster />}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-t-8 border-[#800000] space-y-8">
        <div className="mb-6">
          <h1 className="text-md font-bold text-gray-700 mb-3">Email</h1>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border-gray-300 focus:border-[#800000] focus:ring-[#800000]"
          />
        </div>

        <div>
          <h1 className="text-md font-bold text-gray-700 mb-3">
            Year of Survey
          </h1>
          <Select onValueChange={(value) => handleSurveyChange(value)}>
            <SelectTrigger className="w-full border-gray-300 focus:border-[#800000] focus:ring-[#800000]">
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

      <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-t-8 border-[#800000]">
        <GeneralInformation />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-t-8 border-[#800000]">
        <GraduateEmploymentInformation />
      </div>
    </div>
  );
};

export default Form;
