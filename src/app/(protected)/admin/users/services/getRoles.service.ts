import API from "@/lib/axios/api";
import { Role } from "@/models/role.model";

export async function getRolesService() {
  const url = "/role";
  const res = await API.get<Role[]>({ url });
  return res;
}
