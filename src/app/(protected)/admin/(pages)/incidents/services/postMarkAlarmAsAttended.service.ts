import API from "@/lib/axios/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USERS_IN_DANGER_QUERY_KEY } from "./getUsersInDanger.service";
import { USERS_IN_DANGER_GROUPED_QUERY_KEY } from "./getUsersInDangerByIncidentTypeHierarchy.service";

interface ServiceParams {
  alarmID: number;
  userID: number;
}

export function postMarkAlarmAsAttendedService(data: ServiceParams) {
  const url = "/alarm-detail-position/mark-as-attended";
  return API.post({ url, data });
}

export const usePostMarkAlarmAsAttended = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postMarkAlarmAsAttendedService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_IN_DANGER_GROUPED_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [USERS_IN_DANGER_QUERY_KEY] });
    }
  });
};
