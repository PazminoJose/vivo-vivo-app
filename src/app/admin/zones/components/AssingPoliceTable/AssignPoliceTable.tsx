"use client";
import DataTable from "@/components/DataTable/DataTable";
import { UserRoleData } from "@/models/user-role-data.model";
import { ActionIcon, Autocomplete, Button, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconUserX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDeleteUserZone } from "../../hooks/useDeleteUserZone.hook";
import { useGetUserRoleDataByPoliceRole } from "../../hooks/useGetUserRoleDataByPoliceRole";
import { useGetUsersZoneByZoneID } from "../../hooks/useGetUsersZoneByZoneID.hook";
import { usePostUserZone } from "../../hooks/usePostUserZone.hook";
import { getPoliceHasActiveZoneService } from "../../services/getPoliceHasActiveZone.service";
import useAssignPoliceTableColumns from "./useAssignPoliceTableColumns";

interface UserZoneTableProps {
  zoneID: number;
}

export default function AssignPoliceTable({ zoneID }: UserZoneTableProps) {
  const [policeAutocompleteData, setPoliceAutocompleteData] = useState<string[]>([]);
  const [selectedPolice, setSelectedPolice] = useState<UserRoleData | null>(null);
  const [autocompleteValue, setAutocompleteValue] = useState<string>("");

  // Query
  const { data: usersZone, isLoading } = useGetUsersZoneByZoneID(zoneID);
  const columns = useAssignPoliceTableColumns();

  const { data: policeUserRole } = useGetUserRoleDataByPoliceRole();
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
      onConfirm: () => deleteUserZoneMutation(userZoneID)
    });
  };

  // Effects
  useEffect(() => {
    if (policeUserRole) {
      setPoliceAutocompleteData(policeUserRole.map((police) => police.names));
    }
  }, [policeUserRole]);

  return (
    <DataTable
      state={{ isLoading }}
      enableColumnPinning
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
      enableRowActions
      positionActionsColumn="last"
      renderRowActions={({ row }) => (
        <ActionIcon variant="primary" onClick={() => handleDeleteUserZone(row.original.userZoneID)}>
          <Tooltip label="Eliminar">
            <IconUserX />
          </Tooltip>
        </ActionIcon>
      )}
      initialState={{
        showGlobalFilter: false
      }}
      columns={columns}
      data={usersZone ?? []}
    />
  );
}
