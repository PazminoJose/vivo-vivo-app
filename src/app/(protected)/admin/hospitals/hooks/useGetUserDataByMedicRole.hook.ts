import { UserRoleData } from "@/models/user-role-data.model";
import { useQuery } from "@tanstack/react-query";
import { getUsersDataByMedicRoleService } from "../services/getUsersDataByMedicRoleService";

export const USER_ROLE_MEDIC_QUERY_KEY = "user-role-medic";

export const useGetUserDataByMedicRole = () => {
  return useQuery<UserRoleData[]>({
    queryKey: [USER_ROLE_MEDIC_QUERY_KEY],
    queryFn: getUsersDataByMedicRoleService
  });
};
