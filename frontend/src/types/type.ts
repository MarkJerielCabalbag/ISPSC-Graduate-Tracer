export type Response = {
  yearOfSurvey?: string;
  email?: string;
  fullName?: string;
  yearOfGraduation?: string;
  department?: string;
  program?: string;
  major?: string;
  currentlyEmployed?: string;
  isJobAligned?: string;
  isSelfEmployed?: string;
  isFurtherStudies?: string;
  typeOfOrganization?: string;
  currentJobLocated?: string;
};

export type EmploymentInformation = {
  id?: number | undefined;
  department?: string;
  program?: string;
};
