import logo from "./assets/ispsc.png";
import bagongPilipinas from "./assets/bagong-pilipinas.png";
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

const years = displayYears(2020, 2080);

const Form = () => {
  const [email, setEmail] = useState("");
  const { handleEmailChange, handleSurveyChange } = useFormStore();

  useEffect(() => {
    handleEmailChange(email);
  }, [email]);
  return (
    <div>
      <div className="bg-primary p-10 rounded-md flex items-center gap-5">
        <img src={logo} alt="ispsc logo" className="w-20 h-20" />
        <img
          src={bagongPilipinas}
          alt="bagong-pilipinas"
          className="w-20 h-20 "
        />
        <div>
          <h1 className="main-font text-xl">
            Ilocos Sur Polytechnic State College
          </h1>
          <p
            className="main-font
          "
          >
            Sta. Maria Campus
          </p>
        </div>
      </div>

      <div className="my-5">
        <h1>Email</h1>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
