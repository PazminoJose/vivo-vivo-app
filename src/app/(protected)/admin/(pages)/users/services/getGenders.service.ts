import API from "@/lib/axios/api";
import { DataSelect } from "@/models/data-select";
import { useQuery } from "@tanstack/react-query";

const GENDER_QUERY_KEY = "genders";

export async function getGendersService() {
  const url = "/gender";
  const res = await API.get<DataSelect[]>({ url });
  return res;
}

export const useGetGenders = () => {
  return useQuery<DataSelect[]>({
    queryKey: [GENDER_QUERY_KEY],
    queryFn: getGendersService
  });
};
