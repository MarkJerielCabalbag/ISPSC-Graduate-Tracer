import { create } from "zustand";

type AdminState = {
  department: string;
  departmentId: number;
  program: string;
  major: string;
  programId: number;
  setCollegeDepartment: (department: string) => void;
  setProgramDepartment: (program: string, departmentId: number) => void;
  setMajorProgram: (major: string, programId: number) => void;
};

export const useAdminStore = create<AdminState>((set) => ({
  department: "",
  departmentId: 0,
  program: "",
  major: "",
  programId: 0,
  setMajorProgram: (major, programId) =>
    set({ major: major, programId: Number(programId) }),
  setProgramDepartment: (program, departmentId) =>
    set({ program: program, departmentId: Number(departmentId) }),
  setCollegeDepartment: (department) => set({ department: department }),
}));
