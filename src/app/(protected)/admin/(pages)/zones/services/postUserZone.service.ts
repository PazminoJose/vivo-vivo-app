import API from "@/lib/axios/api";
import { UserZone, UserZoneData } from "@/models/user-zone.module";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { USERS_ZONE_QUERY_KEY } from "./getUsersZoneByZoneID.service";

export async function postUserZoneService(data: UserZone) {
  const url = "/user-zone";
  const res = await API.post<UserZoneData>({ url, data });
  return res;
}

export const usePostUserZone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUserZoneService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_ZONE_QUERY_KEY], refetchType: "all" });
      toast.success("Oficial asignado correctamente");
    }
  });
};
