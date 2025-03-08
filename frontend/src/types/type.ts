export type Response = {
  yearOfSurvey?: number;
  email?: string;
  fullName?: string;
  yearOfGraduation?: number;
  departmentId?: number;
  programId?: number;
  majorId?: number;
  isJobAligned?: boolean;
  isSelfEmployed?: boolean;
  isFurtherStudies?: boolean;
  typeOfOrganization?: string;
  currentJobLocated?: string;
};

export type EmploymentInformation = {
  id?: number | undefined;
  department?: string;
  program?: string;
  major?: string;
};
