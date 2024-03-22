import API from "@/lib/axios/api";
import { UserRoleData } from "@/models/user-role-data.model";

export async function getUsersDataByMedicRoleService() {
  const url = "/user-rol/medic";
  const res = await API.get<UserRoleData[]>({ url });
  return res;
}
