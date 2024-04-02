import { useQuery } from "@tanstack/react-query";
import { getZonesService } from "../services/getZones.service";

const ZONES_QUERY_KEY = "zones";

export const useGetZones = (state?: number) => {
  return useQuery({
    queryKey: [ZONES_QUERY_KEY, state],
    queryFn: () => {
      return getZonesService(state);
    }
  });
};
