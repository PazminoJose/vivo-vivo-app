import { Hospital } from "@/models/hospital.model";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function useHospitalTableColumns() {
  const columns = useMemo<MRT_ColumnDef<Hospital>[]>(
    () => [
      {
        accessorKey: "hospitalName",
        header: "Nombre"
      },
      {
        accessorKey: "hospitalAddress",
        header: "Dirección"
      },
      {
        accessorKey: "hospitalPhone",
        header: "Teléfono"
      },
      {
        accessorKey: "floorsNumber",
        header: "Número de pisos"
      }
    ],
    []
  );

  return columns;
}
