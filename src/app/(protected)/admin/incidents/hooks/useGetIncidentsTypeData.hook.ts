import { useQuery } from "@tanstack/react-query";
import { getIncidentsTypeDataService } from "../services/getIncidentsTypeData.service";

export const INCIDENTS_TYPE_DATA_QUERY_KEY = "incidentsTypeData";

export const useGetIncidentsTypeData = () => {
  return useQuery({
    queryKey: [INCIDENTS_TYPE_DATA_QUERY_KEY],
    queryFn: getIncidentsTypeDataService
  });
};
