import API from "@/lib/axios/api";
import { DataSelect } from "@/models/data-select";

export async function getMaritalStatusService() {
  const url = "/marital-status";
  const res = await API.get<DataSelect[]>({ url });
  return res;
}
