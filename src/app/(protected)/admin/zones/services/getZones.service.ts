import API from "@/lib/axios/api";
import { Zone } from "@/models/zone.model";

export function getZonesService(state?: number) {
  const url = `/zones?state=${state}`;
  const res = API.get<Zone[]>({ url });
  return res;
}
