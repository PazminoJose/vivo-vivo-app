import { User } from "@/models/user.model";
import { useQuery } from "@tanstack/react-query";
import { getUsersService } from "../services/getUsers.service";

export const USERS_QUERY_KEY = "users";

export const useGetUsers = () => {
  return useQuery<User[]>({ queryKey: [USERS_QUERY_KEY], queryFn: getUsersService });
};
