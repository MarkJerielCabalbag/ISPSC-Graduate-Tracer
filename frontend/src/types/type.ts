import { ChartConfig } from "../components/ui/chart";

export type Response = {
  yearOfSurvey?: number;
  email?: string;
  fullName?: string;
  yearOfGraduation?: number;
  departmentId?: number;
  programId?: number;
  majorId?: number;
  isEmployed?: string;
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
  major?: string;
};

export type ChartTypes = {
  chartData: any[];
  chartConfig: ChartConfig;
  dataKey: string;
  nameKey?: string;
};
