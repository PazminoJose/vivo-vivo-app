import API from "@/lib/axios/api";
import { Role } from "@/models/role.model";
import { useQuery } from "@tanstack/react-query";

const ROLE_QUERY_KEY = "role";

export async function getRolesService() {
  const url = "/role";
  const res = await API.get<Role[]>({ url });
  return res;
}

export const useGetRoles = () => {
  return useQuery<Role[]>({
    queryKey: [ROLE_QUERY_KEY],
    queryFn: getRolesService
  });
};
