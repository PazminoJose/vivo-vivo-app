import API from "@/lib/axios/api";
import { UserHospital } from "@/models/user-hospital.model";
import { UserRoleData } from "@/models/user-role-data.model";

export async function postUserHospitalService(data: UserHospital) {
  const url = `/user-hospital`;
  const res = await API.post<UserRoleData>({ url, data });
  return res;
}
