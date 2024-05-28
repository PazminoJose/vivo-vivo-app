import API from "@/lib/axios/api";
import { IncidentType } from "@/models/incident-type";
import { IncidentTypeSchema } from "../components/FormIncidentType/formIncidentTypeSchema";

export async function putIncidentTypeService(incidentType: IncidentTypeSchema) {
  const url = `/incident-type/${incidentType.incidentTypeID}`;
  const res = await API.put<IncidentType>({ url, data: incidentType });
  return res;
}
