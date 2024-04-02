import API from "@/lib/axios/api";

interface ServiceProps {
  alarmID: number;
  alarm: {
    incidentTypeID?: number;
  };
}

export async function patchAlarm({ alarmID, alarm }: ServiceProps) {
  const url = `/alarm/${alarmID}`;
  const res = await API.patch<any>({ url, data: alarm });
  return res;
}
