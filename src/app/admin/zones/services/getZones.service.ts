import API from "@/lib/axios/api";
import { Zone } from "@/models/zone.model";

export function getZoneService() {
  const url = "/zones";
  const res = API.get<Zone[]>({ url });
  return res;
}
