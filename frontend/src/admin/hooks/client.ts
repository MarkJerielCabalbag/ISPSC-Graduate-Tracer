import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../api/client";
import toast from "react-hot-toast";

export const useCreateCollege = (department: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => client.createDepartmentCollege(department),
    onSuccess: (data) => {
      toast.success(data?.message as string);
      queryClient.invalidateQueries({ queryKey: ["departmentDetails"] });
      queryClient.invalidateQueries({ queryKey: ["overviewTracedGraduates"] });
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => client.createProgram(program, departmentId),
    onSuccess: (data) => {
      toast.success(data?.message as string);
      queryClient.invalidateQueries({ queryKey: ["departmentDetails"] });
    },
    onError: (error) => {
      toast.error(error?.message as string);
    },
  });
};

export const useCreateMajor = (major: string, programId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => client.createMajor(major, programId),
    onSuccess: (data) => {
      toast.success(data?.message as string);
      queryClient.invalidateQueries({ queryKey: ["departmentDetails"] });
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

export const useAddTotalGraduates = (id: number, totalGraduates: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => client.addTotalGraduates(id, totalGraduates),
    onSuccess: (data) => {
      toast.success(data?.message as string);
      queryClient.invalidateQueries({ queryKey: ["totalGraduates"] });
    },
    onError: (error) => {
      toast.error(error?.message as string);
    },
  });
};

export const useGetEmploymentStatistics = (
  yearOfGraduation: string,
  program: string
) => {
  return useQuery({
    queryKey: ["employmentStatistics"],
    queryFn: () => client.getEmploymentStatistics(yearOfGraduation, program),
  });
};

export const useGetQuestions = (yearOfGraduation: string, program: string) => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: () => client.getQuestions(yearOfGraduation, program),
  });
};

export const useGetPercentageTraced = (
  yearOfGraduation: string,
  program: string
) => {
  return useQuery({
    queryKey: ["tracedPercentage"],
    queryFn: () => client.getPercentage(yearOfGraduation, program),
  });
};

export const useGetOrganization = (
  yearOfGraduation: string,
  program: string
) => {
  return useQuery({
    queryKey: ["organization"],
    queryFn: () => client.getOrganization(yearOfGraduation, program),
  });
};

export const useGetCurrentJobLocation = (
  yearOfGraduation: string,
  program: string
) => {
  return useQuery({
    queryKey: ["jobLocation"],
    queryFn: () => client.getCurrentJobLocation(yearOfGraduation, program),
  });
};

export const useGetDepartmentDetails = () => {
  return useQuery({
    queryKey: ["departmentDetails"],
    queryFn: () => client.getDepartmentDetails(),
  });
};

export const useRemoveProgram = (programId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => client.removeProgram(programId),
    onSuccess: (data) => {
      toast.success(data?.message as string);
      queryClient.invalidateQueries({ queryKey: ["departmentDetails"] });
    },
    onError: (error) => {
      toast.error(error?.message as string);
    },
  });
};

export const useEditProgram = (programId: number, program: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => client.editProgram(programId, program),
    onSuccess: (data) => {
      toast.success(data?.message as string);
      queryClient.invalidateQueries({ queryKey: ["departmentDetails"] });
    },
    onError: (error) => {
      toast.error(error?.message as string);
    },
  });
};

export const useRemoveMajor = (majorId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => client.removeMajor(majorId),
    onSuccess: (data) => {
      toast.success(data?.message as string);
      queryClient.invalidateQueries({ queryKey: ["departmentDetails"] });
    },
    onError: (error) => {
      toast.error(error?.message as string);
    },
  });
};

export const useEditMajor = (majorId: number, major: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => client.editMajor(majorId, major),
    onSuccess: (data) => {
      toast.success(data?.message as string);
      queryClient.invalidateQueries({ queryKey: ["departmentDetails"] });
    },
    onError: (error) => {
      toast.error(error?.message as string);
    },
  });
};

export const useRemoveDepartment = (departmentId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => client.removeDepartment(departmentId),
    onSuccess: (data) => {
      toast.success(data?.message as string);
      queryClient.invalidateQueries({ queryKey: ["departmentDetails"] });
      queryClient.invalidateQueries({ queryKey: ["overviewTracedGraduates"] });
    },
    onError: (error) => {
      toast.error(error?.message as string);
    },
  });
};
