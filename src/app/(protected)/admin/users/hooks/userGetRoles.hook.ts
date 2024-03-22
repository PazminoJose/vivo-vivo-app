import { Role } from "@/models/role.model";
import { useQuery } from "@tanstack/react-query";
import { getRolesService } from "../services/getRoles.service";

const QUERY_KEY = "roles";

export const useGetRoles = () => {
  return useQuery<Role[]>({ queryKey: [QUERY_KEY], queryFn: getRolesService });
};
