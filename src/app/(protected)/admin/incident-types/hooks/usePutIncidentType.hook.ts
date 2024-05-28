import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { putIncidentTypeService } from "../services/putIncidentType.service";
import { INCIDENTS_TYPE_QUERY_KEY } from "./useGetIncidentTypes.hook";

export const usePutIncidentType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putIncidentTypeService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCIDENTS_TYPE_QUERY_KEY] });
      toast.success("Tipo de incidente actualizado exitosamente");
      modals.closeAll();
    }
  });
};
