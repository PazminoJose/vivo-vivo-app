import API from "@/lib/axios/api";
import { DataSelect } from "@/models/data-select";
import { useQuery } from "@tanstack/react-query";

const DISABILITY_QUERY_KEY = "disability";

export async function getDisabilityService() {
  const url = "/disability";
  const res = await API.get<DataSelect[]>({ url });
  return res;
}

export const useGetDisabilities = () => {
  return useQuery<DataSelect[]>({
    queryKey: [DISABILITY_QUERY_KEY],
    queryFn: getDisabilityService
  });
};
