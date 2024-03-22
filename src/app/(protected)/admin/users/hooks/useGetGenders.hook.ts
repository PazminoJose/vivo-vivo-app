import { DataSelect } from "@/models/data-select";
import { useQuery } from "@tanstack/react-query";
import { getGendersService } from "../services/getGenders.service";

const QUERY_KEY = ["genders"];

export const useGetGenders = () => {
  return useQuery<DataSelect[]>({ queryKey: [QUERY_KEY], queryFn: getGendersService });
};
