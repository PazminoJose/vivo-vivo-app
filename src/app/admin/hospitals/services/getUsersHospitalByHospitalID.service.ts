import API from "@/lib/axios/api";
import { UserHospitalData } from "@/models/user-hospital.model";

export async function getUsersHospitalByHospitalIDService(hospitalID: number) {
  const url = `/user-hospital/hospital/${hospitalID}`;
  const res = API.get<UserHospitalData[]>({ url });
  return res;
}
