import API from "@/lib/axios/api";
import { Zone } from "@/models/zone.model";
import { useQuery } from "@tanstack/react-query";

export function getZonesService(state?: number) {
  const url = `/zones?state=${state}`;
  const res = API.get<Zone[]>({ url });
  return res;
}

export const ZONES_QUERY_KEY = "zones";

export const useGetZones = (state?: number) => {
  return useQuery({
    queryKey: [ZONES_QUERY_KEY, state],
    queryFn: () => {
      return getZonesService(state);
    }
  });
};
