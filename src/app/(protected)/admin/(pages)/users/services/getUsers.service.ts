import API from "@/lib/axios/api";
import { User } from "@/models/user.model";
import { useQuery } from "@tanstack/react-query";

export async function getUsersService() {
  const url = "/user";
  const res = await API.get<any[]>({ url });
  return res;
}

export const USER_QUERY_KEY = "user";

export const useGetUsers = () => {
  return useQuery<User[]>({
    queryKey: [USER_QUERY_KEY],
    queryFn: getUsersService
  });
};
