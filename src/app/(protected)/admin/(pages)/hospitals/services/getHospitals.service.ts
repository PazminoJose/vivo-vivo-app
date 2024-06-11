import API from "@/lib/axios/api";
import { Hospital } from "@/models/hospital.model";

export async function getHospitalsService() {
  const url = "/hospital";
  const res = await API.get<Hospital[]>({ url });
  return res;
}
