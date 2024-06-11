import API from "@/lib/axios/api";
import { IncidentType } from "@/models/incident-type";
import { useQuery } from "@tanstack/react-query";

export async function getIncidentTypesService() {
  const url = "/incident-type";
  const res = await API.get<IncidentType[]>({ url });
  return res;
}

export const INCIDENTS_TYPE_QUERY_KEY = "incidents-type";

export const useGetIncidentTypes = () => {
  return useQuery({
    queryKey: [INCIDENTS_TYPE_QUERY_KEY],
    queryFn: getIncidentTypesService
  });
};
