import { MutationProps } from "@/types/mutation-props";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { putHospitalService } from "../services/putHospital.service";
import { HOSPITALS_QUERY_KEY } from "./useGetHospitals.hook";

export const usePutHospital = ({ onSuccess }: MutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putHospitalService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [HOSPITALS_QUERY_KEY] });
      toast.success("Hospital editado correctamente");
      if (onSuccess) onSuccess();
    }
  });
};
