import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteUserZoneService } from "../services/deleteUserZode.service";
import { USERS_ZONE_QUERY_KEY } from "./useGetUsersZoneByZoneID.hook";

export const useDeleteUserZone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserZoneService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_ZONE_QUERY_KEY] });
      toast.success("Oficial eliminado correctamente");
    }
  });
};
