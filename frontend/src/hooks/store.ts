import { create } from "zustand";

type FormState = {
  email: string;
  yearOfSurvey: string;
  fullName: string;
  yearOfGraduation: string;
  departmentId: number;
  programId: number;
  majorId: number;

  //the questions
  isEmployed: string;
  isJobAligned: string;
  isSelfEmployed: string;
  isFurtherStudies: string;
  typeOfOrganization: string;
  currentJobLocated: string;

  isProgramOpen: boolean;
  isMajorOpen: boolean;
  isContinueFillOut: boolean;
  handleDepartmentChange: (
    value: string,
    getDepartment: () => Promise<void>
  ) => Promise<void>;

  handleMajorChange: (
    value: string,
    getMajor: () => Promise<void>
  ) => Promise<void>;

  handleMajorSelect: (value: string) => void;

  handleContinueFillOutChange: (value: string) => void;
  handleEmailChange: (value: string) => void;
  handleNameChange: (value: string) => void;
  handleGraduationChange: (value: string) => void;
  handleSurveyChange: (value: string) => void;

  handleAlignedJob: (value: string) => void;
  handleSelfEmployed: (value: string) => void;
  handleFurtherStudies: (value: string) => void;
  handleTypeOfOrganization: (value: string) => void;
  handleCurrentJobLocation: (value: string) => void;
};

export const useFormStore = create<FormState>((set) => ({
  yearOfSurvey: "",
  email: "",
  fullName: "",
  yearOfGraduation: "",
  departmentId: 0,
  programId: 0,
  majorId: 0,
  isProgramOpen: false,
  isMajorOpen: false,

  isJobAligned: "",
  isSelfEmployed: "",
  isFurtherStudies: "",
  typeOfOrganization: "",
  currentJobLocated: "",
  isContinueFillOut: false,

  //the questions
  isEmployed: "",

  handleDepartmentChange: async (value, getDepartment) => {
    const id = Number(value);
    set({ departmentId: id, isProgramOpen: true });
    await getDepartment();
  },

  handleMajorChange: async (value, getMajor) => {
    const id = Number(value);
    set({ programId: id, isMajorOpen: true });
    await getMajor();
  },

  handleMajorSelect: (value: string) => set({ majorId: Number(value) }),

  handleContinueFillOutChange: (value: string) => {
    value === "yes"
      ? set({ isContinueFillOut: true, isEmployed: "yes" })
      : set({ isContinueFillOut: false, isEmployed: "no" });
  },

  handleAlignedJob: (value: string) => set({ isJobAligned: value }),
  handleSelfEmployed: (value: string) => set({ isSelfEmployed: value }),
  handleFurtherStudies: (value: string) => set({ isFurtherStudies: value }),
  handleTypeOfOrganization: (value: string) =>
    set({ typeOfOrganization: value }),
  handleCurrentJobLocation: (value: string) =>
    set({ currentJobLocated: value }),

  handleEmailChange: (value: string) => set({ email: value }),
  handleNameChange: (value: string) => set({ fullName: value }),
  handleGraduationChange: (value: string) => set({ yearOfGraduation: value }),
  handleSurveyChange: (value: string) => set({ yearOfSurvey: value }),
}));
