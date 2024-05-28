import API from "@/lib/axios/api";
import { Zone } from "@/models/zone.model";
import { ZoneSchema } from "../components/FormZoneControl/FormZoneControl";

export function postZoneService(zone: ZoneSchema) {
  const url = "/zones";
  const res = API.post<Zone>({ url, data: zone });
  return res;
}
