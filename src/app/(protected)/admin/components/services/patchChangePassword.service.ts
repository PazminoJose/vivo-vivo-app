import API from "@/lib/axios/api";
import { APISuccessResponse } from "@/types/api-response";
import { modals } from "@mantine/modals";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChangePasswordSchema } from "../FormChangePassword/formChangePasswordSchema";

interface PatchChangePasswordParams {
  changePasswordSchema: ChangePasswordSchema;
  userID: number;
}

export async function patchChangePassword(pathChangePasswordParams: PatchChangePasswordParams) {
  const { changePasswordSchema, userID } = pathChangePasswordParams;
  const url = `/auth/change-password/${userID}`;
  const res = await API.patch<APISuccessResponse>({ url, data: changePasswordSchema });
  return res;
}

export const usePatchChangePassword = () => {
  return useMutation({
    mutationFn: patchChangePassword,
    onSuccess: (data) => {
      toast.success(data.message);
      modals.closeAll();
    }
  });
};
