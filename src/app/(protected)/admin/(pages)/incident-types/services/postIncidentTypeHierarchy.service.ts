import API from "@/lib/axios/api";
import { IncidentTypeHierarchy } from "@/models/incident-type-hierarchy";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IncidentTypeHierarchySchema } from "../components/FormIncidentTypeHierarchy/formIncidentTypeHierarchySchema";
import { INCIDENTS_TYPE_HIERARCHY_QUERY_KEY } from "./getIncidentTypesHierarchy.service";

export async function postIncidentTypeHierarchy(
  incidentTypeHierarchySchema: IncidentTypeHierarchySchema
) {
  const url = "/incident-type-hierarchy";
  const res = await API.post<IncidentTypeHierarchy>({ url, data: incidentTypeHierarchySchema });
  return res;
}

export const usePostIncidentTypeHierarchy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postIncidentTypeHierarchy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCIDENTS_TYPE_HIERARCHY_QUERY_KEY] });
      toast.success("Jerarquía creada exitosamente");
      modals.closeAll();
    }
  });
};
