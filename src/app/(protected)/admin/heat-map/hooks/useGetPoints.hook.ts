import { useQuery } from "@tanstack/react-query";
import { PointsServiceProps, getPointsService } from "../services/getPoints.service";

const POINTS_QUERY_KEY = "points";

export const useGetPoints = ({ alarmStatusID, incidentTypeIDs, dateRange }: PointsServiceProps) => {
  return useQuery({
    queryKey: [POINTS_QUERY_KEY, { alarmStatusID, incidentTypeIDs, dateRange }],
    queryFn: () => getPointsService({ alarmStatusID, incidentTypeIDs, dateRange })
  });
};
