import API from "@/lib/axios/api";
import { HospitalSchema } from "../components/FormHospital";

interface ServiceProps {
  hospitalID: number;
  hospital: HospitalSchema;
}

export async function putHospitalService({ hospitalID, hospital }: ServiceProps) {
  const url = `/hospital/${hospitalID}`;
  const res = API.put({ url, data: hospital });
  return res;
}
