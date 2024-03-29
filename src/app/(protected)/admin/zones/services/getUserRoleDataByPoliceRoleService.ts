import API from "@/lib/axios/api";
import { UserRoleData } from "@/models/user-role-data.model";

export function getUserRoleDataByPoliceRoleService() {
  const url = `/user-rol/police`;
  const res = API.get<UserRoleData[]>({ url });
  return res;
}
