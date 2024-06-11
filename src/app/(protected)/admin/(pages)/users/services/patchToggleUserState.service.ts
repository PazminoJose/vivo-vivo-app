import API from "@/lib/axios/api";
import { APISuccessResponse } from "@/types/api-response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { USER_QUERY_KEY } from "./getUsers.service";

export async function patchToggleUserStateService(userID: number) {
  const url = `/user/toggle-state/${userID}`;
  const res = await API.patch<APISuccessResponse>({ url });
  return res;
}

export const usePatchToggleUserState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchToggleUserStateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      toast.success("El estado del usuario ha sido cambiado correctamente");
    }
  });
};
