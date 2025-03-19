import API from "@/lib/axios/api";

export function getWatchmanHasActiveZoneService(userID: number) {
  const url = `/user-zone/watchman-active-zone/${userID}`;
  const res = API.get<boolean>({ url });
  return res;
}
