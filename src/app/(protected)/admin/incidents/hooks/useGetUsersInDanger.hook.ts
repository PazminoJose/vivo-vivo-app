import { useQuery } from "@tanstack/react-query";
import { getUsersInDanger } from "../services/getUsersInDanger.service";

export const USERS_IN_DANGER_QUERY_KEY = "usersInDanger";

export const useGetUsersInDanger = () => {
  return useQuery({
    queryKey: [USERS_IN_DANGER_QUERY_KEY],
    queryFn: getUsersInDanger
  });
};
