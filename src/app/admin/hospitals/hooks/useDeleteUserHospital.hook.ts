import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteUserHospitalService } from "../services/deleteUserHospital.service";
import { USERS_HOSPITAL_QUERY_KEY } from "./useGetUsersHospitalByHospitalID.hook";

export const useDeleteUserHospital = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserHospitalService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_HOSPITAL_QUERY_KEY] });
      toast.success("Médico eliminado correctamente");
    }
  });
};
