import API from "@/lib/axios/api";
import { HospitalSchema } from "../components/FormHospital";

export async function postHospitalService(data: HospitalSchema) {
  const url = "/hospital";
  const res = await API.post({ url, data });
  return res;
}
