import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postUserHospitalService } from "../services/postUserHospital.service";
import { USERS_HOSPITAL_QUERY_KEY } from "./useGetUsersHospitalByHospitalID.hook";

export const usePostUserHospital = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUserHospitalService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_HOSPITAL_QUERY_KEY]
      });
      toast.success("Médico asignado correctamente");
    }
  });
};
