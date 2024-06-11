import API from "@/lib/axios/api";
import { UserRoleData } from "@/models/user-role-data.model";
import { useQuery } from "@tanstack/react-query";

export function getUserRoleDataByPoliceRoleService() {
  const url = `/user-rol/police`;
  const res = API.get<Record<string, UserRoleData>>({ url });
  return res;
}

export const USER_ROLE_POLICE_QUERY_KEY = "user-role-police";

export const useGetUserRoleDataByPoliceRole = () => {
  return useQuery<Record<string, UserRoleData>>({
    queryKey: [USER_ROLE_POLICE_QUERY_KEY],
    queryFn: getUserRoleDataByPoliceRoleService
  });
};
