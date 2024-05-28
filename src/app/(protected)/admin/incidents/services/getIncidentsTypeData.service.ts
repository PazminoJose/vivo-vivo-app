import API from "@/lib/axios/api";
import { IncidentTypeData } from "@/models/incident-type";
import { AutoCompleteData } from "@/types/autocomplete-data";

export async function getIncidentsTypeDataService() {
  const url = "/incident-type/data";
  const res = await API.get<AutoCompleteData<IncidentTypeData>>({ url });
  return res;
}
