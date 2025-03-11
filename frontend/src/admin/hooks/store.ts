import { create } from "zustand";

type AdminState = {
  department: string;
  departmentId: number;
  program: string;
  setCollegeDepartment: (department: string) => void;
  setProgramDepartment: (program: string, departmentId: number) => void;
};

export const useAdminStore = create<AdminState>((set) => ({
  department: "",
  departmentId: 0,
  program: "",
  setProgramDepartment: (program, departmentId) =>
    set({ program: program, departmentId: Number(departmentId) }),
  setCollegeDepartment: (department) => set({ department: department }),
}));
