import API from "@/lib/axios/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { VigilancePointSchema } from "../components/FormVigilancePoints/vigilancePointSchema";
import { ZONES_QUERY_KEY } from "./getZones.service";

export function postVigilancePointService(schema: VigilancePointSchema) {
  const url = "/vigilance-point";
  return API.post({ url, data: schema });
}

export const usePostVigilancePoint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postVigilancePointService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ZONES_QUERY_KEY], refetchType: "all" });
      toast.success("Punto de vigilancia añadido correctamente");
    }
  });
};
