import { useQuery } from "@tanstack/react-query";
import { getIncidentTypesService } from "../services/getIncidentTypes.service";

export const INCIDENTS_TYPE_QUERY_KEY = "incidentsType";

export const useGetIncidentTypes = () => {
  return useQuery({
    queryKey: [INCIDENTS_TYPE_QUERY_KEY],
    queryFn: getIncidentTypesService
  });
};
