import API from "@/lib/axios/api";
import { UserZone } from "@/models/user-zone.module";

export function deleteUserZoneService(userZone: number) {
  const url = `/user-zone/${userZone}`;
  const res = API.del<UserZone>({ url });
  return res;
}
