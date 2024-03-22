import { MutationProps } from "@/types/mutation-props";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postHospitalService } from "../services/postHospital.service";
import { HOSPITALS_QUERY_KEY } from "./useGetHospitals.hook";

export const usePostHospital = ({ onSuccess }: MutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postHospitalService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [HOSPITALS_QUERY_KEY] });
      toast.success("Hospital creado correctamente");
      if (onSuccess) onSuccess();
    }
  });
};
