"use client";
import DataTable from "@/components/DataTable/DataTable";
import { IMG_URL } from "@/constants/constants";
import { UserRoleData } from "@/models/user-role-data.model";
import {
  ActionIcon,
  Autocomplete,
  AutocompleteProps,
  Avatar,
  Button,
  Group,
  Text,
  Tooltip
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconUserX } from "@tabler/icons-react";
import { useState } from "react";
import { useDeleteUserZone } from "../../services/deleteUserZode.service";
import { getPoliceHasActiveZoneService } from "../../services/getPoliceHasActiveZone.service";
import { useGetUserRoleDataByPoliceRole } from "../../services/getUserRoleDataByPoliceRole.service";
import { useGetUsersZoneByZoneID } from "../../services/getUsersZoneByZoneID.service";
import { usePostUserZone } from "../../services/postUserZone.service";
import useAssignPoliceTableColumns from "./useAssignPoliceTableColumns";

interface UserZoneTableProps {
  zoneID: number;
}

export default function AssignPoliceTable({ zoneID }: UserZoneTableProps) {
  const [policeAutocompleteData, setPoliceAutocompleteData] = useState<string[]>([]);
  const [policeData, setPoliceData] = useState<Record<string, UserRoleData> | null>(null);
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
    if (!policeUserRole) return;
    setAutocompleteValue(value);
    const police = policeUserRole[value];
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

  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({ option }) =>
    policeUserRole && (
      <Group gap="sm">
        <Avatar src={`${IMG_URL}/${policeUserRole[option.value].avatar}`} size={36} radius="xl" />
        <div>
          <Text size="sm">{option.value}</Text>
        </div>
      </Group>
    );

  return (
    <DataTable
      state={{ isLoading }}
      mantineTableContainerProps={{ className: "max-h-[400px]" }}
      enableColumnPinning
      renderTopToolbarCustomActions={() => (
        <div className="flex gap-2">
          <Autocomplete
            className="w-96"
            value={autocompleteValue}
            data={Object.keys(policeUserRole ?? {})}
            renderOption={renderAutocompleteOption}
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
