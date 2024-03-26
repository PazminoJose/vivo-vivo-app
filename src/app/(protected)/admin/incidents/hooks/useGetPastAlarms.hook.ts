import { useQuery } from "@tanstack/react-query";
import { getPastAlarms } from "../services/getPastAlarms.service";

const PAST_ALARMS_QUERY_KEY = "pastAlarms";

export const useGetPastAlarms = () => {
  return useQuery({
    queryKey: [PAST_ALARMS_QUERY_KEY],
    queryFn: getPastAlarms
  });
};
