import API from "@/lib/axios/api";
import { DataSelect } from "@/models/data-select";
import { useQuery } from "@tanstack/react-query";

export async function getMaritalStatusService() {
  const url = "/marital-status";
  const res = await API.get<DataSelect[]>({ url });
  return res;
}

const MARITAL_STATUS_QUERY_KEY = "marital-status";

export const useGetMaritalStatus = () => {
  return useQuery<DataSelect[]>({
    queryKey: [MARITAL_STATUS_QUERY_KEY],
    queryFn: getMaritalStatusService
  });
};
