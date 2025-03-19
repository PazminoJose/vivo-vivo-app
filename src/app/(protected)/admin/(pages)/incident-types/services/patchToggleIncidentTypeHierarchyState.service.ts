import API from "@/lib/axios/api";
import { APISuccessResponse } from "@/types/api-response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { INCIDENTS_TYPE_HIERARCHY_QUERY_KEY } from "./getIncidentTypesHierarchy.service";

export async function patchToggleIncidentTypeHierarchyStateService(incidentTypeHierarchyID: number) {
  const url = `/incident-type-hierarchy/toggle-state/${incidentTypeHierarchyID}`;
  const res = await API.patch<APISuccessResponse>({ url });
  return res;
}

export const usePatchToggleIncidentTypeHierarchyState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchToggleIncidentTypeHierarchyStateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCIDENTS_TYPE_HIERARCHY_QUERY_KEY] });
      queryClient.removeQueries({ queryKey: [INCIDENTS_TYPE_HIERARCHY_QUERY_KEY, 1] });
      toast.success("El estado de la jerarquía ha sido cambiado correctamente");
    }
  });
};
