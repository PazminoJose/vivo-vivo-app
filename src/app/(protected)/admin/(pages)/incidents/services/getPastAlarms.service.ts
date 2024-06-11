import API from "@/lib/axios/api";
import { PastAlarm } from "@/models/past-alarm.model";
import { useQuery } from "@tanstack/react-query";

export async function getPastAlarms() {
  const url = "/alarm/past";
  const res = await API.get<PastAlarm[]>({ url });
  return res;
}

const PAST_ALARMS_QUERY_KEY = "past-alarms";

export const useGetPastAlarms = () => {
  return useQuery({
    queryKey: [PAST_ALARMS_QUERY_KEY],
    queryFn: getPastAlarms
  });
};
