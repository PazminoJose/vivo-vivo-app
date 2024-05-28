import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { patchToggleUserStateService } from "../services/patchToogleUserState.service";
import { USERS_QUERY_KEY } from "./useGetUsers.hook";

export const usePatchToggleUserState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchToggleUserStateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      toast.success("El estado del usuario ha sido cambiado correctamente");
    }
  });
};
