import API from "@/lib/axios/api";
import { PoliceLocation } from "@/models/police-location.model";

export async function getPoliceLocationService() {
  const url = "/police-location";
  const res = await API.get<PoliceLocation[]>({ url });
  return res;
}
