import API from "@/lib/axios/api";
import { Zone } from "@/models/zone.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ZoneSchema } from "../components/FormZoneControl/formZoneControlSchema";
import { ZONES_QUERY_KEY } from "./getZones.service";

export function putZoneService(zone: ZoneSchema) {
  const url = `/zones/${zone.zoneID}`;
  const res = API.put<Zone>({ url, data: zone });
  return res;
}

export const usePutZone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putZoneService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ZONES_QUERY_KEY], refetchType: "all" });
      toast.success("Zona editada correctamente");
    }
  });
};
