import API from "@/lib/axios/api";
import { UserZone, UserZoneData } from "@/models/user-zone.module";

export async function postUserZoneService(data: UserZone) {
  const url = "/user-zone";
  const res = await API.post<UserZoneData>({ url, data });
  return res;
}
