import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "../api/client";
import { Response } from "../types/type";
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

const useAddResponse = () => {
  return useMutation({
    mutationFn: (response: Response) => client.addResponse(response),
  });
};
export const hooks = {
  useGetCollegeDepartment,
  useGetRelatedProgram,
  useGetRelatedMajor,
  useAddResponse,
};
