import API from "@/lib/axios/api";
import { UserZoneData } from "@/models/user-zone.module";

export function getZoneServiceByZoneID(zoneID: number) {
  const url = `/user-zone/zone/${zoneID}`;
  const res = API.get<UserZoneData[]>({ url });
  return res;
}
