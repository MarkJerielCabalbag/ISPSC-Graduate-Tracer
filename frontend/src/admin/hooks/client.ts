import { useQuery, useMutation } from "@tanstack/react-query";
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
