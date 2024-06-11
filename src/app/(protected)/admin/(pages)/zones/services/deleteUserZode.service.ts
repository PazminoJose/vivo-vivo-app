import API from "@/lib/axios/api";
import { UserZone } from "@/models/user-zone.module";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { USERS_ZONE_QUERY_KEY } from "./getUsersZoneByZoneID.service";

export function deleteUserZoneService(userZone: number) {
  const url = `/user-zone/${userZone}`;
  const res = API.del<UserZone>({ url });
  return res;
}

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
