import API from "@/lib/axios/api";

export async function getPointsService() {
  const res = await API.get<number[][]>({
    url: "/alarm-detail-position/alarm-status/2"
  });
  return res;
}
