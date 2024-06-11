"use client";
import DataTable from "@/components/DataTable/DataTable";
import { IncidentType } from "@/models/incident-type";
import { ActionIcon, Button, Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCircle, IconCircleOff, IconDots, IconEdit, IconPlus } from "@tabler/icons-react";
import { useGetIncidentTypes, usePatchToggleIncidentTypeState } from "../../services";
import FormIncidentType from "../FormIncidentType/FormIncidentType";
import { useIncidentTypesTableColumns } from "./useIncidentTypesTableColumns";

export default function IncidentTypesTable() {
  const { data: incidentTypes, isLoading } = useGetIncidentTypes();
  const columns = useIncidentTypesTableColumns();

  const { mutateAsync: toggleIncidentTypeStatusMutation } = usePatchToggleIncidentTypeState();

  const handleToggleIncidentTypeStatus = async (incidentType: IncidentType) => {
    const { incidentTypeID, state, incidentTypeName } = incidentType;
    modals.openConfirmModal({
      title: "Confirmar",
      children: `¿Está seguro que desea ${state === 0 ? "habilitar" : "deshabilitar"} el tipo de incidente ${incidentTypeName}?`,
      onConfirm: () => {
        toggleIncidentTypeStatusMutation(incidentTypeID);
      }
    });
  };

  const handleOpenFormIncidenTypes = (incidentType?: IncidentType) => {
    modals.open({
      title: "Editar tipo de incidente",
      children: <FormIncidentType initialValues={incidentType} />
    });
  };

  return (
    <div className="flex flex-col">
      <DataTable
        enableColumnPinning
        enableRowActions
        renderRowActions={({ row }) => {
          const isDisabled = row.original.state === 0;
          return (
            <Menu closeOnItemClick={false} trigger="click-hover">
              <Menu.Target>
                <div className="flex w-full justify-center">
                  <ActionIcon variant="transparent">
                    <IconDots />
                  </ActionIcon>
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconEdit />}
                  onClick={async () => handleOpenFormIncidenTypes(row.original)}
                >
                  Editar
                </Menu.Item>
                <Menu.Item
                  leftSection={isDisabled ? <IconCircle /> : <IconCircleOff />}
                  onClick={async () => handleToggleIncidentTypeStatus(row.original)}
                >
                  {isDisabled ? "Habilitar" : "Deshabilitar"}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          );
        }}
        renderTopToolbarCustomActions={() => (
          <Button leftSection={<IconPlus />} onClick={() => handleOpenFormIncidenTypes()}>
            Crear
          </Button>
        )}
        state={{ isLoading }}
        data={incidentTypes ?? []}
        columns={columns}
      />
    </div>
  );
}
