import API from "@/lib/axios/api";
import { PoliceLocation } from "@/models/police-location.model";
import { useQuery } from "@tanstack/react-query";

export async function getPoliceLocationService() {
  const url = "/police-location";
  const res = await API.get<PoliceLocation[]>({ url });
  return res;
}

export const POLICE_LOCATION_QUERY_KEY = "police-location";

export const useGetPoliceLocation = () => {
  return useQuery({
    queryKey: [POLICE_LOCATION_QUERY_KEY],
    queryFn: getPoliceLocationService
  });
};
