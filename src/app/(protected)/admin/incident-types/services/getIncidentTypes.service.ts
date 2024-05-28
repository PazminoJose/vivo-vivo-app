import API from "@/lib/axios/api";
import { IncidentType } from "@/models/incident-type";

export async function getIncidentTypesService() {
  const url = "/incident-type";
  const res = await API.get<IncidentType[]>({ url });
  return res;
}
