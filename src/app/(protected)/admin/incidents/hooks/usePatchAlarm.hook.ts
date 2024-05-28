import { MutationProps } from "@/types/mutation-props";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { patchAlarm } from "../services/patchAlarm.service";
import { INCIDENTS_TYPE_DATA_QUERY_KEY } from "./useGetIncidentsTypeData.hook";
import { USERS_IN_DANGER_QUERY_KEY } from "./useGetUsersInDanger.hook";

export const usePatchAlarm = ({ onSuccess }: MutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchAlarm,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_IN_DANGER_QUERY_KEY]
      });
      queryClient.invalidateQueries({
        queryKey: [INCIDENTS_TYPE_DATA_QUERY_KEY]
      });
      toast.success("Información de la alarma actualizada correctamente");
      if (onSuccess) onSuccess();
    }
  });
};
