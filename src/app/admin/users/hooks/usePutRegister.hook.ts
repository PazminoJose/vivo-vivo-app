import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { putRegisterService } from "../services/putRegister.service";
import { USERS_QUERY_KEY } from "./useGetUsers.hook";

interface UsePostRegisterProps {
  onSuccess?: () => void | Promise<void>;
}

export const usePutRegister = ({ onSuccess }: UsePostRegisterProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putRegisterService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      toast.success("Usuario editado correctamente");
      if (onSuccess) onSuccess();
    }
  });
};
