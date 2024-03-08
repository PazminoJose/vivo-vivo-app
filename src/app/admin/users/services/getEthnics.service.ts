import API from "@/lib/axios/api";
import { DataSelect } from "@/models/data-select";

export async function getEthnicsService() {
  const url = "/ethnic";
  const res = await API.get<DataSelect[]>({ url });
  return res;
}
