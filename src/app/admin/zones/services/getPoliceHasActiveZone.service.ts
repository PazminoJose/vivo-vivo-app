import API from "@/lib/axios/api";

export function getPoliceHasActiveZoneService(userID: number) {
  const url = `/user-zone/police-active-zone/${userID}`;
  const res = API.get<boolean>({ url });
  return res;
}
