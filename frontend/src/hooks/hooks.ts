import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "../api/client";
import { Response } from "../types/type";
import toast from "react-hot-toast";
const useGetCollegeDepartment = () => {
  return useQuery({
    queryKey: ["department"],
    queryFn: () => client.getDepartment(),
  });
};

const useGetRelatedProgram = (id: number) => {
  return useMutation({
    mutationFn: () => client.getRelatedProgram(id),
    onSuccess: () => {},
  });
};

const useGetRelatedMajor = (id: number) => {
  return useMutation({
    mutationFn: () => client.getRelatedMajor(id),
  });
};

const useAddResponse = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (response: Response) => client.addResponse(response),
    onSuccess: (data) => {
      toast.success(data.message);
      onSuccess?.();
    },
  });
};
export const hooks = {
  useGetCollegeDepartment,
  useGetRelatedProgram,
  useGetRelatedMajor,
  useAddResponse,
};
