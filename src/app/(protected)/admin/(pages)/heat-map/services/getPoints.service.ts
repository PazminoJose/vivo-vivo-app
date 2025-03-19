import API from "@/lib/axios/api";
import { HeatMapData } from "@/models/heat-map-data.model";
import { DateRange } from "@/types/date-range";
import { useQuery } from "@tanstack/react-query";

export interface PointsServiceParams {
  alarmStatusID: number;
  incidentTypeIDs?: number[];
  dateRange?: DateRange;
}

const POINTS_QUERY_KEY = "points";

export async function getPointsService({
  alarmStatusID,
  incidentTypeIDs,
  dateRange
}: PointsServiceParams) {
  const incidentTypeIDsParam = incidentTypeIDs ? incidentTypeIDs : "";
  const initDateParam = dateRange?.startDate ? dateRange?.startDate : "";
  const endDateParam = dateRange?.endDate ? dateRange?.endDate : "";
  let url = `/alarm-detail-position/points/${alarmStatusID}?incidentTypeIDs=${incidentTypeIDsParam}&startDate=${initDateParam}&endDate=${endDateParam}`;
  const res = await API.get<HeatMapData[]>({ url });
  return res;
}

export const useGetPoints = ({ alarmStatusID, incidentTypeIDs, dateRange }: PointsServiceParams) => {
  return useQuery({
    queryKey: [POINTS_QUERY_KEY, { alarmStatusID, incidentTypeIDs, dateRange }],
    queryFn: () => getPointsService({ alarmStatusID, incidentTypeIDs, dateRange })
  });
};
