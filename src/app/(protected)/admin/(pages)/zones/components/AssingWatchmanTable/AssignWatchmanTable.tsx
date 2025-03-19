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
import { useGetUserRoleDataByWatchmanRole } from "../../services/getUserRoleDataByWatchmanRole.service";
import { useGetUsersZoneByZoneID } from "../../services/getUsersZoneByZoneID.service";
import { getWatchmanHasActiveZoneService } from "../../services/getWatchmanHasActiveZone.service";
import { usePostUserZone } from "../../services/postUserZone.service";
import useAssignWatchmanTableColumns from "./useAssignWatchmanTableColumns";

interface UserZoneTableProps {
  zoneID: number;
}

export default function AssignWatchmanTable({ zoneID }: UserZoneTableProps) {
  const [watchmanAutocompleteData, setWatchmanAutocompleteData] = useState<string[]>([]);
  const [watchmanData, setWatchmanData] = useState<Record<string, UserRoleData> | null>(null);
  const [selectedWatchman, setSelectedWatchman] = useState<UserRoleData | null>(null);
  const [autocompleteValue, setAutocompleteValue] = useState<string>("");

  // Query
  const { data: usersZone, isLoading } = useGetUsersZoneByZoneID(zoneID);

  const columns = useAssignWatchmanTableColumns();

  const { data: watchmanUserRole } = useGetUserRoleDataByWatchmanRole();

  // Mutation
  const { mutate: assignWatchmanToZone, isPending: isPendingAssignWatchman } = usePostUserZone();
  const { mutate: deleteUserZoneMutation } = useDeleteUserZone();

  // Handlers
  const handleWatchmanChange = (value: string) => {
    if (!watchmanUserRole) return;
    setAutocompleteValue(value);
    const watchman = watchmanUserRole[value];
    if (watchman) setSelectedWatchman(watchman);
    else setSelectedWatchman(null);
  };

  const handleConfirmAssignWatchman = () => {
    if (selectedWatchman === null) return;
    assignWatchmanToZone({ userID: selectedWatchman.userID, zoneID });
    setSelectedWatchman(null);
    setAutocompleteValue("");
  };

  const handleAssignWatchmanToZone = async () => {
    if (selectedWatchman === null) return;
    const hasActiveZone = await getWatchmanHasActiveZoneService(selectedWatchman.userID);
    if (hasActiveZone) {
      modals.openConfirmModal({
        title: "Confirmar",
        centered: true,
        children: "El vigilante seleccionado ya tiene una zona activa, ¿desea reasignarla?",
        onConfirm: handleConfirmAssignWatchman
      });
    } else {
      handleConfirmAssignWatchman();
    }
  };

  const handleDeleteUserZone = (userZoneID: number) => {
    modals.openConfirmModal({
      title: "Confirmar",
      centered: true,
      children: "¿Está seguro de eliminar el watchman de la zona?",
      onConfirm: () => deleteUserZoneMutation(userZoneID)
    });
  };

  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({ option }) =>
    watchmanUserRole && (
      <Group gap="sm">
        <Avatar src={`${IMG_URL}/${watchmanUserRole[option.value].avatar}`} size={36} radius="xl" />
        <div>
          <Text size="sm">{option.value}</Text>
        </div>
      </Group>
    );

  return (
    <DataTable
      initialState={{
        showGlobalFilter: false
      }}
      columns={columns}
      data={usersZone ?? []}
      state={{ isLoading }}
      mantineTableContainerProps={{ className: "max-h-[400px]" }}
      enableColumnPinning
      renderTopToolbarCustomActions={() => (
        <div className="flex gap-2">
          <Autocomplete
            className="w-96"
            value={autocompleteValue}
            data={Object.keys(watchmanUserRole ?? {})}
            renderOption={renderAutocompleteOption}
            placeholder="Buscar vigilante"
            onChange={handleWatchmanChange}
          />
          <Button
            loading={isPendingAssignWatchman}
            disabled={selectedWatchman === null}
            onClick={handleAssignWatchmanToZone}
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
    />
  );
}
