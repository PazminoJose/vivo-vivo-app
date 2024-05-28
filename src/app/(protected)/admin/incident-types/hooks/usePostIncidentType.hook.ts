import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postIncidentTypeService } from "../services/postIcidentTyoe.service";
import { INCIDENTS_TYPE_QUERY_KEY } from "./useGetIncidentTypes.hook";

export const usePostIncidentType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postIncidentTypeService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCIDENTS_TYPE_QUERY_KEY] });
      toast.success("Tipo de incidente creado exitosamente");
      modals.closeAll();
    }
  });
};
