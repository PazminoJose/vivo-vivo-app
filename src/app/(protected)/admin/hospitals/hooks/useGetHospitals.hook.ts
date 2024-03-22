import { Hospital } from "@/models/hospital.model";
import { useQuery } from "@tanstack/react-query";
import { getHospitalsService } from "../services/getHospitals.service";

export const HOSPITALS_QUERY_KEY = "hospitals";

export const useGetHospitals = () => {
  return useQuery<Hospital[]>({ queryKey: [HOSPITALS_QUERY_KEY], queryFn: getHospitalsService });
};
