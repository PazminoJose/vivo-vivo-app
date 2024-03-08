import API from "@/lib/axios/api";
import { PoliceUserRole } from "@/models/police-user-role.model";

export function getPoliceUserRoleService() {
  const url = `/user-rol/police`;
  const res = API.get<PoliceUserRole[]>({ url });
  return res;
}
