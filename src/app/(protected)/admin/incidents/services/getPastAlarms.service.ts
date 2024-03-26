import API from "@/lib/axios/api";
import { PastAlarm } from "@/models/past-alarm.model";

export async function getPastAlarms() {
  const url = "/alarm/past";
  const res = await API.get<PastAlarm[]>({ url });
  return res;
}
