import API from "@/lib/axios/api";
import { Zone } from "@/models/zone.model";
import { ZoneSchema } from "../components/FormZoneControl/FormZoneControl";

export function putZoneService(zone: ZoneSchema) {
  const url = `/zones/${zone.zoneID}`;
  const res = API.put<Zone>({ url, data: zone });
  return res;
}
