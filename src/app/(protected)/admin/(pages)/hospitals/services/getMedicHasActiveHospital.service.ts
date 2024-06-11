import API from "@/lib/axios/api";

export async function getMedicHasActiveHospitalService(userID: number) {
  const url = `/medic-active-hospital/${userID}`;
  const res = await API.get<boolean>({ url });
  return res;
}
