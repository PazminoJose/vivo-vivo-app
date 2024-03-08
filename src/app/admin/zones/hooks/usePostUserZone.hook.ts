import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postUserZoneService } from "../services/postUserZone.service";
import { USERS_ZONE_QUERY_KEY } from "./useGetUsersZoneByZoneID.hook";

export const usePostUserZone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUserZoneService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_ZONE_QUERY_KEY] });
      toast.success("Oficial asignado correctamente");
    }
  });
};
