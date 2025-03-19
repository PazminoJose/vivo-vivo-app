import API from "@/lib/axios/api";
import { UserRoleData } from "@/models/user-role-data.model";
import { useQuery } from "@tanstack/react-query";

export const USER_ROLE_WATCHMAN_QUERY_KEY = "user-role-watchman";

export function getUserRoleDataByWatchmanRoleService() {
  const url = `/user-rol/watchman`;
  const res = API.get<Record<string, UserRoleData>>({ url });
  return res;
}

export const useGetUserRoleDataByWatchmanRole = () => {
  return useQuery<Record<string, UserRoleData>>({
    queryKey: [USER_ROLE_WATCHMAN_QUERY_KEY],
    queryFn: getUserRoleDataByWatchmanRoleService
  });
};
