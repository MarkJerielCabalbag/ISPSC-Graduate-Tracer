import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../api/client";
import toast from "react-hot-toast";

export const useCreateCollege = (department: string) => {
  return useMutation({
    mutationFn: () => client.createDepartmentCollege(department),
    onSuccess: (data) => {
      toast.success(data?.message as string);
    },
    onError: (error) => {
      toast.error(error?.message as string);
    },
  });
};

export const useGetCollegeDepartment = () => {
  return useQuery({
    queryKey: ["collegeDepartment"],
    queryFn: () => client.getCollegeDepartment(),
  });
};

export const useGetPrograms = () => {
  return useQuery({
    queryKey: ["programs"],
    queryFn: () => client.getPrograms(),
  });
};

export const useCreateProgram = (program: string, departmentId: number) => {
  return useMutation({
    mutationFn: () => client.createProgram(program, departmentId),
    onSuccess: (data) => {
      toast.success(data?.message as string);
    },
    onError: (error) => {
      toast.error(error?.message as string);
    },
  });
};

export const useCreateMajor = (major: string, programId: number) => {
  return useMutation({
    mutationFn: () => client.createMajor(major, programId),
    onSuccess: (data) => {
      toast.success(data?.message as string);
    },
    onError: (error) => {
      toast.error(error?.message as string);
    },
  });
};

export const useGetSummaryData = () => {
  return useQuery({
    queryKey: ["summaryData"],
    queryFn: () => client.getSummaryData(),
  });
};

export const useGetOverviewTracedGraduates = () => {
  return useQuery({
    queryKey: ["overviewTracedGraduates"],
    queryFn: () => client.getOverviewTracedGraduates(),
  });
};

export const useGetListPrograms = () => {
  return useQuery({
    queryKey: ["listOfPrograms"],
    queryFn: () => client.listOfPrograms(),
  });
};

export const useGetGraduatesPerRow = (
  yearOfGraduation: string,
  program: string
) => {
  return useQuery({
    queryKey: ["graduatesPerRow"],
    queryFn: () => client.graduatesPerRow(yearOfGraduation, program),
  });
};

export const useGetTotalGraduates = (
  yearOfGraduation: string,
  program: string
) => {
  return useQuery({
    queryKey: ["totalGraduates"],
    queryFn: () => client.getTotalGraduates(yearOfGraduation, program),
  });
};

export const useAddTotalGraduates = (
  id: number,
  totalGraduates: number,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => client.addTotalGraduates(id, totalGraduates),
    onSuccess: (data) => {
      toast.success(data.message as string);
      queryClient.invalidateQueries({ queryKey: ["totalGraduates"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message as string);
      onError?.();
    },
  });
};
