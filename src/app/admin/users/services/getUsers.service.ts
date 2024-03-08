import API from "@/lib/axios/api";

export async function getUsersService() {
  const url = "/user";
  const res = await API.get<any[]>({ url });
  return res;
}
