import API from "@/lib/axios/api";
import { HeatMapData } from "@/models/heat-map-data.model";
import { DateRange } from "@/types/date-range";

export interface PointsServiceProps {
  alarmStatusID: number;
  incidentTypeIDs?: number[];
  dateRange?: DateRange;
}

export async function getPointsService({
  alarmStatusID,
  incidentTypeIDs,
  dateRange
}: PointsServiceProps) {
  const incidentTypeIDsParam = incidentTypeIDs ? incidentTypeIDs : "";
  const initDateParam = dateRange?.startDate ? dateRange?.startDate : "";
  const endDateParam = dateRange?.endDate ? dateRange?.endDate : "";
  let url = `/alarm-detail-position/points/${alarmStatusID}?incidentTypeIDs=${incidentTypeIDsParam}&startDate=${initDateParam}&endDate=${endDateParam}`;
  const res = await API.get<HeatMapData[]>({ url });
  return res;
}
