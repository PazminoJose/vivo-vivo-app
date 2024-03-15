import { IMG_URL } from "@/constants/constants";
import { UserHospitalData } from "@/models/user-hospital.model";
import { Avatar, Box } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function useAssignMedicTableColumns() {
  const columns = useMemo<MRT_ColumnDef<UserHospitalData>[]>(
    () => [
      {
        id: "fullName",
        accessorFn: (user) => `${user.firstName} ${user.middleName} ${user.lastNames}`,
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
      }
    ],
    []
  );
  return columns;
}
