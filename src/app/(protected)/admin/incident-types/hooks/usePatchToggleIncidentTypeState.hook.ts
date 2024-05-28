import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { patchToggleIncidentTypeStateService } from "../services/patchToggleIncidentTypeState.service";
import { INCIDENTS_TYPE_QUERY_KEY } from "./useGetIncidentTypes.hook";

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
