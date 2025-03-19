import API from "@/lib/axios/api";
import { Zone } from "@/models/zone.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ZoneSchema } from "../components/FormZoneControl/formZoneControlSchema";
import { ZONES_QUERY_KEY } from "./getZones.service";

export function postZoneService(zone: ZoneSchema) {
  const url = "/zones";
  const res = API.post<Zone>({ url, data: zone });
  return res;
}

export const usePostZone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postZoneService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ZONES_QUERY_KEY], refetchType: "all" });
      toast.success("Zona creada correctamente");
    }
  });
};
