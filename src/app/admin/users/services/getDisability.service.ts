import API from "@/lib/axios/api";
import { DataSelect } from "@/models/data-select";

export async function getDisabilityService() {
  const url = "/disability";
  const res = await API.get<DataSelect[]>({ url });
  return res;
}
