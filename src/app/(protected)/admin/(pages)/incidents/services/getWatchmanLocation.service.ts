import API from "@/lib/axios/api";
import { WatchmanLocation } from "@/models/watchman-location.model";
import { useQuery } from "@tanstack/react-query";

export const WATCHMAN_LOCATION_QUERY_KEY = "watchman-location";

export async function getWatchmanLocationService() {
  const url = "/watchman-location";
  const res = await API.get<WatchmanLocation[]>({ url });
  return res;
}

export const useGetWatchmanLocation = () => {
  return useQuery({
    queryKey: [WATCHMAN_LOCATION_QUERY_KEY],
    queryFn: getWatchmanLocationService
  });
};
