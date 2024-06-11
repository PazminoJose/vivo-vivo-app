import API from "@/lib/axios/api";
import { User } from "@/models/user.model";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { USER_QUERY_KEY } from "./getUsers.service";

export async function postRegisterService(data: FormData) {
  const url = "/auth/register";
  const res = await API.post<User>({ url, data });
  return res;
}

export const usePostRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postRegisterService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      toast.success("Usuario creado correctamente");
      modals.closeAll();
    }
  });
};
