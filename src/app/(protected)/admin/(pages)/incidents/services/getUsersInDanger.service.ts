import API from "@/lib/axios/api";
import { UserInDanger } from "@/models/user-in-danger.model";
import { useQuery } from "@tanstack/react-query";

export async function getUsersInDanger() {
  const url = "/user/users-in-danger";
  const res = API.get<UserInDanger[]>({ url });
  return res;
}

export const USERS_IN_DANGER_QUERY_KEY = "users-in-danger";

export const useGetUsersInDanger = () => {
  return useQuery({
    queryKey: [USERS_IN_DANGER_QUERY_KEY],
    queryFn: getUsersInDanger
  });
};
