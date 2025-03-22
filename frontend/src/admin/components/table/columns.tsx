import { createColumnHelper } from "@tanstack/react-table";

export type AdminColumnDef = {
  yearOfGraduation: string;
  program: string;
  totalGraduates: number;
  totalTracedStudents: number;
  totalEmployedStudents: number;
  totalEmployedGraduatesAlignedToTheirProgram: number;
  totalEmployedGraduatesNotAlignedToTheirProgram: number;
  totalOfSelfEmployed: number;
  totalOfGraduatesEnrolledInFurtherStudies: number;
  totalOfGraduatesEmployedInGovernment: number;
  totalOfGraduatesEmployedInPrivate: number;
  totalOfGraduatesFreelance: number;
  totalOfGraduatesEmployedLocally: number;
  totalOfGraduatesEmployedAbroad: number;
};

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor("yearOfGraduation", {
    id: "yearOfGraduation",
    header: () => "Year of Graduates",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("program", {
    id: "program",
    header: () => "Program",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalTracedGraduates", {
    id: "totalTracedGraduates",
    header: () => "Total Traced Graduates",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalEmployedStudents", {
    id: "totalEmployedStudents",
    header: () => "Total Employed Students",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalEmployedGraduatesAlignedToTheirProgram", {
    id: "totalEmployedGraduatesAlignedToTheirProgram",
    header: () => "Total Employed Graduates Aligned To Their Program",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalEmployedGraduatesNotAlignedToTheirProgram", {
    id: "totalEmployedGraduatesNotAlignedToTheirProgram",
    header: () => "Total Employed Graduates Not Aligned To Their Program",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalOfSelfEmployed", {
    id: "totalOfSelfEmployed",
    header: () => "Total of Self Employed",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalOfGraduatesEnrolledInFurtherStudies", {
    id: "totalOfGraduatesEnrolledInFurtherStudies",
    header: () => "Total of Graduates Enrolled In Further Studies",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalOfGraduatesEmployedInGovernment", {
    id: "totalOfGraduatesEmployedInGovernment",
    header: () => "Total of Graduates Employed In Government",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalOfGraduatesEmployedInPrivate", {
    id: "totalOfGraduatesEmployedInPrivate",
    header: () => "Total of Graduates Employed In Private Institutions",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalOfGraduatesFreelance", {
    id: "totalOfGraduatesFreelance",
    header: () => "Total of Graduates Engaged in Freelance / Entrepreneurial",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalOfGraduatesEmployedLocally", {
    id: "totalOfGraduatesEmployedLocally",
    header: () => "Total of Graduates Employed Locally",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalOfGraduatesEmployedAbroad", {
    id: "totalOfGraduatesEmployedAbroad",
    header: () => "Total of Graduates Employed Abroad",
    cell: (info) => info.getValue(),
  }),
];

export const graduatesRowColumnDef = [
  columnHelper.accessor("fullName", {
    id: "fullName",
    header: () => "Full Name",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("email", {
    id: "email",
    header: () => "Email",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("yearOfGraduation", {
    id: "yearOfGraduation",
    header: () => "Year of Graduation",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("yearOfSurvey", {
    id: "yearOfSurvey",
    header: () => "Year of Survey",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("department", {
    id: "department",
    header: () => "Department",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("program", {
    id: "program",
    header: () => "Program",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("major", {
    id: "major",
    header: () => "Major",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("isEmployed", {
    id: "isEmployed",
    header: () => "Are you currently employed?",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("isJobAligned", {
    id: "isJobAligned",
    header: () => "Is your job aligned with your program?",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("isSelfEmployed", {
    id: "isSelfEmployed",
    header: () => "Are you self-employed?",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("isFurtherStudies", {
    id: "isFurtherStudies",
    header: () => "Are you currently enrolled in further studies?",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("typeOfOrganization", {
    id: "typeOfOrganization",
    header: () => "What type of organization do you work for?",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("currentJobLocated", {
    id: "currentJobLocated",
    header: () => "Where is your current job located?",
    cell: (info) => info.getValue(),
  }),
];
