import API from "@/lib/axios/api";
import { APISuccessResponse } from "@/types/api-response";

export async function patchToggleIncidentTypeStateService(incidentTypeID: number) {
  const url = `/incident-type/toggle-state/${incidentTypeID}`;
  const res = await API.patch<APISuccessResponse>({ url });
  return res;
}
