import API from "@/lib/axios/api";
import { APISuccessResponse } from "@/types/api-response";

export async function patchToggleUserStateService(userID: number) {
  const url = `/user/toggle-state/${userID}`;
  const res = await API.patch<APISuccessResponse>({ url });
  return res;
}
