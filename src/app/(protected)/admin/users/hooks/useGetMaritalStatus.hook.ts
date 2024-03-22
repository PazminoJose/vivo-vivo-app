import { DataSelect } from "@/models/data-select";
import { useQuery } from "@tanstack/react-query";
import { getMaritalStatusService } from "../services/getMaritalStatus.service";

const QUERY_KEY = ["marital-status"];

export const useGetMaritalStatus = () => {
  return useQuery<DataSelect[]>({ queryKey: [QUERY_KEY], queryFn: getMaritalStatusService });
};
