import API from "@/lib/axios/api";
import { UserInDangerByIncidentHierarchy } from "@/models/user-in-danger.model";
import { useQuery } from "@tanstack/react-query";

export const USERS_IN_DANGER_GROUPED_QUERY_KEY = "users-in-danger-grouped-by-incident-type-hierarchy";

export async function getUsersInDangerByIncidentTypeHierarchy() {
  const url = "/user/users-in-danger/grouped-by-incident-type-hierarchy";
  const res = await API.get<UserInDangerByIncidentHierarchy[]>({ url });
  return res;
}

export const useGetUsersInDangerByIncidentTypeHierarchy = () => {
  return useQuery({
    queryKey: [USERS_IN_DANGER_GROUPED_QUERY_KEY],
    queryFn: getUsersInDangerByIncidentTypeHierarchy,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};
