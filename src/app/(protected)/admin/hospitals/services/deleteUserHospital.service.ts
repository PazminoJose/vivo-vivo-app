import API from "@/lib/axios/api";

export async function deleteUserHospitalService(userZoneID: number) {
  const url = `/user-hospital/${userZoneID}`;
  const res = await API.del<any>({ url });
  return res;
}
