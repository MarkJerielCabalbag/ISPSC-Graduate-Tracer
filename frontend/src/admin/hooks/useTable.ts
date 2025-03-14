import {
  AccessorColumnDef,
  AccessorKeyColumnDef,
  ColumnDef,
  createColumnHelper,
} from "@tanstack/react-table";
import React from "react";

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

const columnHelper = createColumnHelper<AdminColumnDef>();

export const adminColumns = [
  columnHelper.accessor("yearOfGraduation", {
    // id: "yearOfGraduation",
    header: "Year of Graduates",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("program", {
    // id: "program", // Fixed typo
    header: "Program",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("totalGraduates", {
    // id: "totalGraduates",
    header: "Total Graduates",
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
  }),

  columnHelper.accessor("totalTracedStudents", {
    // id: "totalTracedStudents",
    header: "Total Traced Students",
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
  }),

  columnHelper.accessor("totalEmployedStudents", {
    // id: "totalEmployedStudents",
    header: "Total Employed Students",
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
  }),

  columnHelper.accessor("totalEmployedGraduatesAlignedToTheirProgram", {
    // id: "totalEmployedGraduatesAlignedToTheirProgram",
    header: "Total Employed Graduates Aligned To Their Program",
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
  }),

  columnHelper.accessor("totalEmployedGraduatesNotAlignedToTheirProgram", {
    // id: "totalEmployedGraduatesNotAlignedToTheirProgram",
    header: "Total Employed Graduates Not Aligned To Their Program",
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
  }),

  columnHelper.accessor("totalOfSelfEmployed", {
    // id: "totalOfSelfEmployed",
    header: "Total of Self Employed",
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
  }),

  columnHelper.accessor("totalOfGraduatesEnrolledInFurtherStudies", {
    // id: "totalOfGraduatesEnrolledInFurtherStudies",
    header: "Total of Graduates Enrolled In Further Studies",
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
  }),

  columnHelper.accessor("totalOfGraduatesEmployedInGovernment", {
    // id: "totalOfGraduatesEmployedInGovernment",
    header: "Total of Graduates Employed In Government",
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
  }),

  columnHelper.accessor("totalOfGraduatesEmployedInPrivate", {
    // id: "totalOfGraduatesEmployedInPrivate",
    header: "Total of Graduates Employed In Private Institutions",
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
  }),

  columnHelper.accessor("totalOfGraduatesFreelance", {
    // id: "totalOfGraduatesFreelance",
    header: "Total of Graduates Engaged in Freelance / Entrepreneurial",
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
  }),

  columnHelper.accessor("totalOfGraduatesEmployedLocally", {
    // id: "totalOfGraduatesEmployedLocally",
    header: "Total of Graduates Employed Locally",
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
  }),

  columnHelper.accessor("totalOfGraduatesEmployedAbroad", {
    // id: "totalOfGraduatesEmployedAbroad",
    header: "Total of Graduates Employed Abroad",
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
  }),
];
