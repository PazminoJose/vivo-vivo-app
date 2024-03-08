import { UserZoneData } from "@/models/user-zone.module";
import { useQuery } from "@tanstack/react-query";
import { getZoneServiceByZoneID } from "../services/getUsersZoneByZoneID.service";

export const USERS_ZONE_QUERY_KEY = "user-zone";

export const useGetUsersZoneByZoneID = (zoneID: number) => {
  return useQuery<UserZoneData[]>({
    queryKey: [USERS_ZONE_QUERY_KEY, zoneID],
    queryFn: () => getZoneServiceByZoneID(zoneID)
  });
};
