import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { patchAlarm } from "../services/patchAlarm.service";
import { USERS_IN_DANGER_QUERY_KEY } from "./useGetUsersInDanger.hook";

export const usePatchAlarm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchAlarm,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_IN_DANGER_QUERY_KEY]
      });
      toast.success("Información de la alarma actualizada correctamente");
    }
  });
};
