import API from "@/lib/axios/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { VigilancePointSchema } from "../components/FormVigilancePoints/vigilancePointSchema";
import { ZONES_QUERY_KEY } from "./getZones.service";

export function patchVigilancePointService(schema: VigilancePointSchema) {
  const url = `/vigilance-point/${schema.vigilancePointID}`;
  return API.patch({ url, data: schema });
}

export const usePatchVigilancePoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchVigilancePointService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ZONES_QUERY_KEY], refetchType: "all" });
      toast.success("Punto de vigilancia actualizado correctamente");
    }
  });
};
