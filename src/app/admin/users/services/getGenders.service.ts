import API from "@/lib/axios/api";
import { DataSelect } from "@/models/data-select";

export async function getGendersService() {
  const url = "/gender";
  const res = await API.get<DataSelect[]>({ url });
  return res;
}
