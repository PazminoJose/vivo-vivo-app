import API from "@/lib/axios/api";
import { User } from "@/models/user.model";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { USER_QUERY_KEY } from "./getUsers.service";

interface PutRegisterServiceParams {
  userID: number;
  personID: number;
  data: FormData;
}

export async function putRegisterService({ userID, personID, data }: PutRegisterServiceParams) {
  const url = `/auth/register/${userID}/${personID}`;
  const res = await API.put<User>({ url, data });
  return res;
}

export const usePutRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putRegisterService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      toast.success("Usuario editado correctamente");
      modals.closeAll();
    }
  });
};
