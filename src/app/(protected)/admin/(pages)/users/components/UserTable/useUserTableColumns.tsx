import { IMG_URL } from "@/constants/constants";
import { User } from "@/models/user.model";
import { Avatar, Box } from "@mantine/core";
import dayjs from "dayjs";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function useUserTableColumns() {
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        id: "fullName",
        accessorFn: (user) =>
          `${user.person?.firstName} ${user.person?.middleName} ${user.person?.lastNames}`,
        header: "Nombre",
        Cell: ({ renderedCellValue, row }) => (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px"
            }}
          >
            <Avatar src={`${IMG_URL}/${row.original.person.avatar}`} alt="it's me" />
            <span>{renderedCellValue}</span>
          </Box>
        )
      },
      {
        id: "role",
        accessorFn: (user) => user.userRole?.map((r) => r.role.roleName).join(", "),
        header: "Role",
        filterVariant: "select",

        mantineFilterMultiSelectProps: {
          data: [
            { label: "Admin", value: "ADMIN" },
            { label: "Super Administrador", value: "SUPER_ADMIN" },
            { label: "User", value: "USER" },
            { label: "Vigilante", value: "VIGILANTE" },
            { label: "Médico", value: "MEDIC" }
          ]
        }
        // filterFn: (row, id, filterValue) => {
        //   if (filterValue?.length === 0) return true;
        //   const roles = row.original.userRole.map((r) => r.role.roleName);
        //   return roles.some((role) => role === filterValue);
        // }
      },
      {
        id: "state",
        accessorFn: (user) => (user.state === 1 ? "Activo" : "Inactivo"),
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
      },
      {
        accessorKey: "email",
        header: "Correo"
      },
      {
        accessorKey: "person.dni",
        header: "Cédula"
      },
      {
        accessorKey: "person.personInfo.address",
        header: "Dirección"
      },
      {
        accessorKey: "person.personInfo.phone",
        header: "Teléfono"
      },
      {
        accessorKey: "person.personInfo.ethnic.ethnicName",
        header: "Etnia",
        filterVariant: "select"
      },
      {
        accessorKey: "person.personInfo.gender.genderName",
        header: "Género",
        filterVariant: "select"
      },
      {
        accessorKey: "person.personInfo.maritalStatus.maritalStatusName",
        header: "Estado Civil",
        filterVariant: "select"
      },
      {
        id: "age",
        accessorFn: (user) => dayjs().diff(user.person?.personInfo.birthDate, "year").toString(),
        header: "Edad"
      }
    ],
    []
  );

  return columns;
}
