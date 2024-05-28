"use client";
import DataTable from "@/components/DataTable/DataTable";
import { IncidentType } from "@/models/incident-type";
import { ActionIcon, Button, Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCircle, IconCircleOff, IconDots, IconEdit, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useGetIncidentTypes } from "../../hooks/useGetIncidentTypes.hook";
import { usePatchToggleIncidentTypeState } from "../../hooks/usePatchToggleIncidentTypeState.hook";
import FormIncidentType from "../FormIncidentType/FormIncidentType";
import { useIncidentTypesTableColumns } from "./useIncidentTypesTableColumns";

export default function IncidentTypesTable() {
  const [selectedIncidentTypeID, setSelectedIncidentTypeID] = useState<number>(0);

  const { data: incidentTypes, isLoading } = useGetIncidentTypes();
  const columns = useIncidentTypesTableColumns();

  const { mutateAsync: toggleIncidentTypeStatusMutation } = usePatchToggleIncidentTypeState();

  const handleToggleIncidentTypeStatus = async (incidentType: IncidentType) => {
    const { incidentTypeID, state, incidentTypeName } = incidentType;
    setSelectedIncidentTypeID(incidentTypeID);
    modals.openConfirmModal({
      title: "Confirmar",
      children: `¿Está seguro de que desea ${state === 0 ? "habilitar" : "deshabilitar"} el tipo de incidente ${incidentTypeName}?`,
      onConfirm: () => {
        toggleIncidentTypeStatusMutation(incidentTypeID)
          .then(() => setSelectedIncidentTypeID(0))
          .catch(() => setSelectedIncidentTypeID(0));
      }
    });
  };

  const handleOpenFormIncidenTypes = (incidentType?: IncidentType) => {
    modals.open({
      title: "Editar tipo de incidente",
      onClose: () => setSelectedIncidentTypeID(0),
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
