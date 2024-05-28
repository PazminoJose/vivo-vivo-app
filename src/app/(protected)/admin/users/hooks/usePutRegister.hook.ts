import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { putRegisterService } from "../services/putRegister.service";
import { USERS_QUERY_KEY } from "./useGetUsers.hook";

export const usePutRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putRegisterService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      toast.success("Usuario editado correctamente");
      modals.closeAll();
    }
  });
};
