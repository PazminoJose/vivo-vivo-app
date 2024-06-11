import API from "@/lib/axios/api";
import { APISuccessResponse } from "@/types/api-response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { INCIDENTS_TYPE_QUERY_KEY } from "./getIncidentTypes.service";

export async function patchToggleIncidentTypeStateService(incidentTypeID: number) {
  const url = `/incident-type/toggle-state/${incidentTypeID}`;
  const res = await API.patch<APISuccessResponse>({ url });
  return res;
}

export const usePatchToggleIncidentTypeState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchToggleIncidentTypeStateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCIDENTS_TYPE_QUERY_KEY] });
      toast.success("El estado del tipo de incidente ha sido cambiado correctamente");
    }
  });
};
