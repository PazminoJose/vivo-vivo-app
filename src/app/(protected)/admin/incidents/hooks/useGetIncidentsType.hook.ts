import { useQuery } from "@tanstack/react-query";
import { getIncidentsType } from "../services/getIncidentsType.service";

export const INCIDENTS_TYPE_QUERY_KEY = "incidentsType";

export const useGetIncidentsType = () => {
  return useQuery({
    queryKey: [INCIDENTS_TYPE_QUERY_KEY],
    queryFn: getIncidentsType
  });
};
