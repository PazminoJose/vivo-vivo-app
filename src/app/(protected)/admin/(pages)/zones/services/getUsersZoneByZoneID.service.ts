import API from "@/lib/axios/api";
import { UserZoneData } from "@/models/user-zone.module";
import { useQuery } from "@tanstack/react-query";

export function getZoneServiceByZoneID(zoneID: number) {
  const url = `/user-zone/zone/${zoneID}`;
  const res = API.get<UserZoneData[]>({ url });
  return res;
}

export const USERS_ZONE_QUERY_KEY = "user-zone";

export const useGetUsersZoneByZoneID = (zoneID: number) => {
  return useQuery<UserZoneData[]>({
    queryKey: [USERS_ZONE_QUERY_KEY, zoneID],
    queryFn: () => getZoneServiceByZoneID(zoneID),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};
