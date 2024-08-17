import API from "@/lib/axios/api";
import { UserInDangerByIncidentHierarchy } from "@/models/user-in-danger.model";
import { useQuery } from "@tanstack/react-query";

export async function getUsersInDangerByIncidentTypeHierarchy() {
  const url = "/user/users-in-danger/grouped-by-incident-type-hierarchy";
  const res = await API.get<UserInDangerByIncidentHierarchy[]>({ url });
  console.log({ res });

  return res;
}

export const USERS_IN_DANGER_QUERY_KEY = "users-in-danger-grouped-by-incident-type-hierarchy";

export const useGetUsersInDangerByIncidentTypeHierarchy = () => {
  return useQuery({
    queryKey: [USERS_IN_DANGER_QUERY_KEY],
    queryFn: getUsersInDangerByIncidentTypeHierarchy
  });
};
