import API from "@/lib/axios/api";
import { DataSelect } from "@/models/data-select";
import { useQuery } from "@tanstack/react-query";

const ETHNIC_QUERY_KEY = "ethnic";

export async function getEthnicsService() {
  const url = "/ethnic";
  const res = await API.get<DataSelect[]>({ url });
  return res;
}

export const useGetEthnics = () => {
  return useQuery<DataSelect[]>({
    queryKey: [ETHNIC_QUERY_KEY],
    queryFn: getEthnicsService
  });
};
