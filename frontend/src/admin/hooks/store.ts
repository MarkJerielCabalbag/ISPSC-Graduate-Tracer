import { TableOptions } from "@tanstack/react-table";
import { create } from "zustand";

type AdminState<T> = {
  department: string;
  departmentId: number;
  program: string;
  major: string;
  programId: number;
  setCollegeDepartment: (department: string) => void;
  setProgramDepartment: (program: string) => void;
  setMajorProgram: (major: string) => void;
  setNewProgram: (program: string) => void;
  openEditProgram: boolean;
  setOpenEditProgram: (open: boolean) => void;
  table: TableOptions<T>;
  // setColumnFilters: (columnFilters: ColumnFiltersState[]) => void;
  setTable: (table: TableOptions<T>) => void;
  statuses: T[];
  status: string;
  isActive: boolean;
  // columnFilters: ColumnFiltersState[];
  pagination: {
    pageIndex: number;
    pageSize: number;
  };

  setPageIndex: (pageIndex: number, pageSize: number) => void;
};

export const useAdminStore = create<AdminState<unknown>>((set) => ({
  department: "",
  departmentId: 0,
  program: "",
  major: "",
  programId: 0,
  openEditProgram: false,
  table: {} as TableOptions<unknown>,
  statuses: [],
  status: "",
  isActive: false,
  // columnFilters: [] as ColumnFiltersState[],
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },

  setMajorProgram: (major: string) => set({ major: major }),
  setProgramDepartment: (program: string) => set({ program: program }),
  setCollegeDepartment: (department: string) => set({ department: department }),
  // setColumnFilters: (columnFilters: ColumnFiltersState[]) => {
  //   set({ columnFilters });
  // },
  setPageIndex: (pageSize: number, pageIndex: number) =>
    set({
      pagination: {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    }),
  setTable: (table: TableOptions<unknown>) => set({ table }),

  setNewProgram: (program: string) => set({ program: program }),
  setOpenEditProgram: (open: boolean) => set({ openEditProgram: open }),
}));
