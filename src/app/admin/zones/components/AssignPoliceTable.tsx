"use client";
import DataTable from "@/components/DataTable/DataTable";
import { IMG_URL } from "@/constants/constants";
import { PoliceUserRole } from "@/models/police-user-role.model";
import { UserZoneData } from "@/models/user-zone.module";
import { ActionIcon, Autocomplete, Avatar, Box, Button, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconUserX } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { useDeleteUserZone } from "../hooks/useDeleteUserZone.hook";
import { useGetPoliceUserRole } from "../hooks/useGetPoliceUserRole.hook";
import { useGetUsersZoneByZoneID } from "../hooks/useGetUsersZoneByZoneID.hook";
import { usePostUserZone } from "../hooks/usePostUserZone.hook";
import { getPoliceHasActiveZoneService } from "../services/getPoliceHasActiveZone.service";

interface UserZoneTableProps {
  zoneID: number;
}

export default function AssignPoliceTable({ zoneID }: UserZoneTableProps) {
  const [policeAutocompleteData, setPoliceAutocompleteData] = useState<string[]>([]);
  const [selectedPolice, setSelectedPolice] = useState<PoliceUserRole | null>(null);
  const [autocompleteValue, setAutocompleteValue] = useState<string>("");

  // Query
  const { data: usersZone } = useGetUsersZoneByZoneID(zoneID);
  const { data: policeUserRole } = useGetPoliceUserRole();
  // Mutation
  const { mutate: assignPoliceToZone, isPending: isPendingAssignPolice } = usePostUserZone();
  const { mutate: deleteUserZoneMutation } = useDeleteUserZone();

  // Handlers
  const handlePoliceChange = (value: string) => {
    setAutocompleteValue(value);
    const police = policeUserRole?.find((police) => police.names === value);
    if (police) setSelectedPolice(police);
    else setSelectedPolice(null);
  };

  const handleConfirmAssignPolice = () => {
    if (selectedPolice === null) return;
    assignPoliceToZone({ userID: selectedPolice.userID, zoneID });
    setSelectedPolice(null);
    setAutocompleteValue("");
  };

  const handleAssignPoliceToZone = async () => {
    if (selectedPolice === null) return;
    const hasActiveZone = await getPoliceHasActiveZoneService(selectedPolice.userID);
    if (hasActiveZone) {
      modals.openConfirmModal({
        title: "Confirmar",
        centered: true,
        children: "El policía seleccionado ya tiene una zona activa, ¿desea reasignarla?",
        labels: { confirm: "Confirmar", cancel: "Cancelar" },
        onConfirm: handleConfirmAssignPolice
      });
    } else {
      handleConfirmAssignPolice();
    }
  };

  const handleDeleteUserZone = (userZoneID: number) => {
    modals.openConfirmModal({
      title: "Confirmar",
      centered: true,
      children: "¿Está seguro de eliminar el policía de la zona?",
      labels: { confirm: "Confirmar", cancel: "Cancelar" },
      onConfirm: () => deleteUserZoneMutation(userZoneID)
    });
  };

  // Effects
  useEffect(() => {
    if (policeUserRole) {
      setPoliceAutocompleteData(policeUserRole.map((police) => police.names));
    }
  }, [policeUserRole]);

  // Columns
  const columns = useMemo<MRT_ColumnDef<UserZoneData>[]>(
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
            <Avatar src={`${IMG_URL}/${row.original.avatar}`} alt="it's me" />
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

  return (
    <DataTable
      enableColumnPinning
      enableRowActions
      positionActionsColumn="last"
      renderRowActions={({ row }) => (
        <ActionIcon variant="primary" onClick={() => handleDeleteUserZone(row.original.userZoneID)}>
          <Tooltip label="Eliminar">
            <IconUserX />
          </Tooltip>
        </ActionIcon>
      )}
      renderTopToolbarCustomActions={() => (
        <div className="flex gap-2">
          <Autocomplete
            value={autocompleteValue}
            data={policeAutocompleteData}
            placeholder="Buscar policía"
            onChange={handlePoliceChange}
          />
          <Button
            loading={isPendingAssignPolice}
            disabled={selectedPolice === null}
            onClick={handleAssignPoliceToZone}
          >
            Asignar
          </Button>
        </div>
      )}
      initialState={{
        showGlobalFilter: false
      }}
      columns={columns}
      data={usersZone ?? []}
    />
  );
}
