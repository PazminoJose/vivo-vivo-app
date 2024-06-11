import API from "@/lib/axios/api";
import { IncidentTypeData } from "@/models/incident-type";
import { AutoCompleteData } from "@/types/autocomplete-data";
import { useQuery } from "@tanstack/react-query";

export async function getIncidentsTypeDataService() {
  const url = "/incident-type/data";
  const res = await API.get<AutoCompleteData<IncidentTypeData>>({ url });
  return res;
}

export const INCIDENTS_TYPE_DATA_QUERY_KEY = "incidents-type-data";

export const useGetIncidentsTypeData = () => {
  return useQuery({
    queryKey: [INCIDENTS_TYPE_DATA_QUERY_KEY],
    queryFn: getIncidentsTypeDataService
  });
};
