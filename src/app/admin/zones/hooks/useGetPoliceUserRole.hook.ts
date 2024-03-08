import { PoliceUserRole } from "@/models/police-user-role.model";
import { useQuery } from "@tanstack/react-query";
import { getPoliceUserRoleService } from "../services/getPolicesUserRole.service";

export const POLICES_USER_ROL_QUERY_KEY = "user-zone";

export const useGetPoliceUserRole = () => {
  return useQuery<PoliceUserRole[]>({
    queryKey: [POLICES_USER_ROL_QUERY_KEY],
    queryFn: getPoliceUserRoleService
  });
};
