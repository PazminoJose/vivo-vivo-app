import API from "@/lib/axios/api";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ZONES_QUERY_KEY } from "./getZones.service";

export function patchToggleStatusVigilancePointService(vigilancePointID: number) {
  const url = `/toggle-status/${vigilancePointID}`;
  return API.patch({ url });
}

export const usePatchToggleStatusVigilancePoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchToggleStatusVigilancePointService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ZONES_QUERY_KEY], refetchType: "all" });
      toast.success("Punto de vigilancia eliminado correctamente");
      modals.closeAll();
    }
  });
};
