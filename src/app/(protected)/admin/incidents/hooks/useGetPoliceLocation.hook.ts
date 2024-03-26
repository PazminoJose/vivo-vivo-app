import { useQuery } from "@tanstack/react-query";
import { getPoliceLocationService } from "../services/getPoliceLocation.service";

export const POLICE_LOCATION_QUERY_KEY = "policeLocation";

export const useGetPoliceLocation = () => {
  return useQuery({
    queryKey: [POLICE_LOCATION_QUERY_KEY],
    queryFn: getPoliceLocationService
  });
};
