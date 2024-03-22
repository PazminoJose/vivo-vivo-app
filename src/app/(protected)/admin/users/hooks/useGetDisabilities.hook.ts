import { DataSelect } from "@/models/data-select";
import { useQuery } from "@tanstack/react-query";
import { getDisabilityService } from "../services/getDisability.service";

const QUERY_KEY = ["disability"];

export const useGetDisabilities = () => {
  return useQuery<DataSelect[]>({ queryKey: [QUERY_KEY], queryFn: getDisabilityService });
};
