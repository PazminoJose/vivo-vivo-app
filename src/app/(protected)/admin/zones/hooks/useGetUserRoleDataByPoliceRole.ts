import { UserRoleData } from "@/models/user-role-data.model";
import { useQuery } from "@tanstack/react-query";
import { getUserRoleDataByPoliceRoleService } from "../services/getUserRoleDataByPoliceRoleService";

export const USER_ROLE_POLICE_QUERY_KEY = "user-role-police";

export const useGetUserRoleDataByPoliceRole = () => {
  return useQuery<Record<string, UserRoleData>>({
    queryKey: [USER_ROLE_POLICE_QUERY_KEY],
    queryFn: getUserRoleDataByPoliceRoleService
  });
};
