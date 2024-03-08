import { DataSelect } from "@/models/data-select";
import { useQuery } from "@tanstack/react-query";
import { getEthnicsService } from "../services/getEthnics.service";

const QUERY_KEY = ["ethnic"];

export const useGetEthnics = () => {
  return useQuery<DataSelect[]>({ queryKey: [QUERY_KEY], queryFn: getEthnicsService });
};
