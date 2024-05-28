import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postRegisterService } from "../services/postRegister.service";
import { USERS_QUERY_KEY } from "./useGetUsers.hook";

export const usePostRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postRegisterService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      toast.success("Usuario creado correctamente");
      modals.closeAll();
    }
  });
};
