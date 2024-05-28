import API from "@/lib/axios/api";
import { IncidentType } from "@/models/incident-type";
import { IncidentTypeSchema } from "../components/FormIncidentType/formIncidentTypeSchema";

export async function postIncidentTypeService(incidentType: IncidentTypeSchema) {
  const url = "/incident-type";
  const res = await API.post<IncidentType>({ url, data: incidentType });
  return res;
}
