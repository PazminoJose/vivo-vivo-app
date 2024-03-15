import { UserHospitalData } from "@/models/user-hospital.model";
import { useQuery } from "@tanstack/react-query";
import { getUsersHospitalByHospitalIDService } from "../services/getUsersHospitalByHospitalID.service";

export const USERS_HOSPITAL_QUERY_KEY = "user-hospital";

export const useGetUsersHospitalByHospitalID = (hospitalID: number) => {
  return useQuery<UserHospitalData[]>({
    queryKey: [USERS_HOSPITAL_QUERY_KEY, hospitalID],
    queryFn: () => getUsersHospitalByHospitalIDService(hospitalID)
  });
};
