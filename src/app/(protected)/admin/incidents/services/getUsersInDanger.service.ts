import API from "@/lib/axios/api";
import { UserInDanger } from "@/models/user-in-danger.model";

export async function getUsersInDanger() {
  const url = "/user/users-in-danger";
  const res = API.get<UserInDanger[]>({ url });
  return res;
}
