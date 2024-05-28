import API from "@/lib/axios/api";
import { IncidentTypeData } from "@/models/incident-type";

interface ServiceProps {
  alarmID: number;
  incidentType: IncidentTypeData;
}

export async function patchAlarm({ alarmID, incidentType }: ServiceProps) {
  const url = `/alarm/incident-type/${alarmID}`;
  const res = await API.patch<any>({ url, data: incidentType });
  return res;
}
