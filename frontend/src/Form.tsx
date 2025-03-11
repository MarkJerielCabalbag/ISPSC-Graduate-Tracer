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

const years = displayYears(2020, 2080);

const Form = () => {
  const [email, setEmail] = useState("");
  const { handleEmailChange, handleSurveyChange } = useFormStore();

  useEffect(() => {
    handleEmailChange(email);
  }, [email]);
  return (
    <div>
      <Header />

      <div className="my-5">
        <h1>Email</h1>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div className="my-5">
        <h1>Year of Survey</h1>
        <Select onValueChange={(value) => handleSurveyChange(value)}>
          <SelectTrigger className="w-full">
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

      <GeneralInformation />
      <GraduateEmploymentInformation />
    </div>
  );
};

export default Form;
