import { IMG_URL } from "@/constants/constants";
import { PastAlarm } from "@/models/past-alarm.model";
import { Avatar, Box } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function usePastAlarmsColumns() {
  const columns = useMemo<MRT_ColumnDef<PastAlarm>[]>(
    () => [
      {
        accessorKey: "fullName",
        header: "Nombre",
        Cell: ({ renderedCellValue, row }) => (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px"
            }}
          >
            <Avatar src={`${IMG_URL}/${row.original.avatar}`} alt="avatar image" />
            <span>{renderedCellValue}</span>
          </Box>
        )
      },
      {
        accessorKey: "dni",
        header: "Cédula"
      },
      {
        accessorKey: "phone",
        header: "Teléfono"
      },
      {
        id: "startAlarmInfo",
        header: "Información alarma activada",
        accessorFn: (pastAlarm) =>
          `${pastAlarm.startCanton}, ${pastAlarm.startDistrict} - ${pastAlarm.startDate}`,
        Cell: ({ row }) => (
          <Box className="flex flex-col gap-2">
            <span>
              Lugar: {row.original.startCanton}, {row.original.startDistrict}
            </span>
            <span>Fecha: {row.original.startDate}</span>
          </Box>
        )
      },
      {
        id: "endAlarmInfo",
        header: "Información alarma terminada",
        accessorFn: (pastAlarm) =>
          `${pastAlarm.endCanton}, ${pastAlarm.endDistrict} - ${pastAlarm.endDate}`,
        Cell: ({ row }) => (
          <Box className="flex flex-col gap-2">
            <span>
              Lugar: {row.original.endCanton}, {row.original.endDistrict}
            </span>
            <span>Fecha: {row.original.endDate}</span>
          </Box>
        )
      }
    ],
    []
  );
  return columns;
}
