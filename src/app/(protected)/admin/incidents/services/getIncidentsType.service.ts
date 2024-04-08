import API from "@/lib/axios/api";
import { IncidentType } from "@/models/incident-type";
import { AutoCompleteData } from "@/types/autocomplete-data";

export async function getIncidentsType() {
  const url = "/incident-type/data";
  const res = await API.get<AutoCompleteData<IncidentType>>({ url });
  return res;
}
