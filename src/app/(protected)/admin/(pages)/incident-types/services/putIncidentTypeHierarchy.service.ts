import API from "@/lib/axios/api";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IncidentTypeHierarchySchema } from "../components/FormIncidentTypeHierarchy/formIncidentTypeHierarchySchema";
import { INCIDENTS_TYPE_HIERARCHY_QUERY_KEY } from "./getIncidentTypesHierarchy.service";

export async function putIncidentTypeHierarchy(
  incidentTypeHierarchySchema: IncidentTypeHierarchySchema
) {
  const url = "/incident-type-hierarchy";
  const res = await API.patch<IncidentTypeHierarchy>({ url, data: incidentTypeHierarchySchema });
  return res;
}

export const usePutIncidentTypeHierarchy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putIncidentTypeHierarchy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCIDENTS_TYPE_HIERARCHY_QUERY_KEY] });
      toast.success("Jerarquía actualizada exitosamente");
      modals.closeAll();
    }
  });
};
