import API from "@/lib/axios/api";
import { IncidentTypeData } from "@/models/incident-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { INCIDENTS_TYPE_DATA_QUERY_KEY } from "./getIncidentsTypeData.service";
import { USERS_IN_DANGER_QUERY_KEY } from "./getUsersInDangerByIncidentTypeHierarchy.service";

interface PatchAlarmServiceParams {
  alarmID: number;
  incidentType: IncidentTypeData;
}

export async function patchAlarm({ alarmID, incidentType }: PatchAlarmServiceParams) {
  const url = `/alarm/incident-type/${alarmID}`;
  const res = await API.patch<any>({ url, data: incidentType });
  return res;
}

export const usePatchAlarm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchAlarm,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_IN_DANGER_QUERY_KEY]
      });
      queryClient.invalidateQueries({
        queryKey: [INCIDENTS_TYPE_DATA_QUERY_KEY]
      });
      toast.success("Información de la alarma actualizada correctamente");
    }
  });
};
