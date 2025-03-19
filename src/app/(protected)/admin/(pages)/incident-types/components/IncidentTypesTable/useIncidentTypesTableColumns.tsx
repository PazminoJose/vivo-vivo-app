import { IncidentType } from "@/models/incident-type";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export function useIncidentTypesTableColumns() {
  const columns = useMemo<MRT_ColumnDef<IncidentType>[]>(
    () => [
      {
        accessorKey: "incidentTypeName",
        header: "Nombre"
      },
      {
        accessorKey: "incidentTypeDesc",
        header: "Descripción"
      },
      {
        accessorKey: "incidentTypeHierarchyName",
        header: "Jerarquía"
      },
      {
        id: "state",
        accessorFn: (incidentType) => (incidentType.state === 1 ? "Activo" : "Inactivo"),
        header: "Estado",
        filterVariant: "select",
        mantineFilterSelectProps: {
          data: [
            { label: "Activo", value: "Activo" },
            { label: "Inactivo", value: "Inactivo" }
          ]
        }
        // filterFn: (row, id, filterValue) => {
        //   if (filterValue?.length === 0) return true;
        //   return row.original.state === (filterValue === "Activo" ? 1 : 0);
        // }
      }
    ],
    []
  );

  return columns;
}
