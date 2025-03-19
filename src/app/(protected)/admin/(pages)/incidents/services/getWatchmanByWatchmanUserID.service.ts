import API from "@/lib/axios/api";
import { WatchmanInfo } from "@/models/watchman-location.model";
import { useQuery } from "@tanstack/react-query";

export const WATCHMAN_QUERY_KEY = "watchman";

export function getWatchmanByWatchmanUserIDService(watchmanUserID?: number) {
  const url = `/watchman-location/watchman/${watchmanUserID}`;
  return API.get<WatchmanInfo>({ url });
}

export const useGetWatchmanByWatchmanUserID = (watchmanUserID: number) => {
  return useQuery<WatchmanInfo>({
    queryKey: [WATCHMAN_QUERY_KEY, watchmanUserID],
    queryFn: () => getWatchmanByWatchmanUserIDService(watchmanUserID)
  });
};
