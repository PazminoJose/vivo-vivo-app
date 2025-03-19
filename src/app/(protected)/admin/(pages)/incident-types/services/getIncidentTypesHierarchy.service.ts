import API from "@/lib/axios/api";
import { IncidentTypeHierarchy } from "@/models/incident-type-hierarchy";
import { useQuery } from "@tanstack/react-query";

export const INCIDENTS_TYPE_HIERARCHY_QUERY_KEY = "incidents-type-hierarchy";

export async function getIncidentTypesHierarchyService(state?: number) {
  const url = `/incident-type-hierarchy${state ? `?state=${state}` : ""}`;
  const res = await API.get<IncidentTypeHierarchy[]>({ url });
  return res;
}

export const useGetIncidentTypesHierarchy = (state?: number) => {
  return useQuery({
    queryKey: [INCIDENTS_TYPE_HIERARCHY_QUERY_KEY, state],
    queryFn: () => getIncidentTypesHierarchyService(state)
  });
};
