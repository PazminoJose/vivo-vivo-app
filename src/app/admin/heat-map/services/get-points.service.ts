import API from "@/lib/axios/api";
import { HeatLatLngTuple } from "leaflet";

export type PointsResponse = {
  points: Array<HeatLatLngTuple>;
};
export async function getPointsService() {
  const res = await API.get<PointsResponse>({
    url: "/alarm-detail-position/alarm-status/654ad17d06e35c13d35eb659"
  });
  return res;
}
