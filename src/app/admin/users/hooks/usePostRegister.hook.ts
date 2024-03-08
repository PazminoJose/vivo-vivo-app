import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postRegisterService } from "../services/postRegister.service";
import { USERS_QUERY_KEY } from "./useGetUsers.hook";

interface UsePostRegisterProps {
  onSuccess?: () => void | Promise<void>;
}

export const usePostRegister = ({ onSuccess }: UsePostRegisterProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postRegisterService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      toast.success("Usuario creado correctamente");
      if (onSuccess) onSuccess();
    }
  });
};
