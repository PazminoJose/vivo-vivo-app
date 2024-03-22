import API from "@/lib/axios/api";
import { User } from "@/models/user.model";

export async function postRegisterService(data: FormData) {
  const url = "/auth/register";
  const res = await API.post<User>({ url, data });
  return res;
}
