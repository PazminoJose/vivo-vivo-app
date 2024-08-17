import { IncidentTypeHierarchy } from "@/models/incident-type-hierarchy";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export function useIncidentTypesHierarchyTableColumns() {
  const columns = useMemo<MRT_ColumnDef<IncidentTypeHierarchy>[]>(
    () => [
      {
        accessorKey: "incidentTypeHierarchyName",
        header: "Nombre"
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
        },
        filterFn: (row, id, filterValue) => {
          if (filterValue.length === 0) return true;
          return row.original.state === (filterValue === "Activo" ? 1 : 0);
        }
      }
    ],
    []
  );

  return columns;
}
