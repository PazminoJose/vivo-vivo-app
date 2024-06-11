import API from "@/lib/axios/api";
import { IncidentType } from "@/models/incident-type";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IncidentTypeSchema } from "../components/FormIncidentType/formIncidentTypeSchema";
import { INCIDENTS_TYPE_QUERY_KEY } from "./getIncidentTypes.service";

export async function postIncidentTypeService(incidentType: IncidentTypeSchema) {
  const url = "/incident-type";
  const res = await API.post<IncidentType>({ url, data: incidentType });
  return res;
}

export const usePostIncidentType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postIncidentTypeService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCIDENTS_TYPE_QUERY_KEY] });
      toast.success("Tipo de incidente creado exitosamente");
      modals.closeAll();
    }
  });
};
