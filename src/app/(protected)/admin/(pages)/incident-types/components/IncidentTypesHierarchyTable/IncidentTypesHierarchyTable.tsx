"use client";
import DataTable from "@/components/DataTable/DataTable";
import { ActionIcon, Button, Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCircle, IconCircleOff, IconDots, IconEdit, IconPlus } from "@tabler/icons-react";
import { useGetIncidentTypesHierarchy } from "../../services/getIncidentTypesHierarchy.service";
import { usePatchToggleIncidentTypeHierarchyState } from "../../services/patchToggleIncidentTypeHierarchyState.service";
import FormIncidentTypeHierarchy from "../FormIncidentTypeHierarchy/FormIncidentTypeHierarchy";
import { useIncidentTypesHierarchyTableColumns } from "./useIncidentTypesHierarchyTableColumns";

export default function IncidentTypesHierarchyTable() {
  const { data: incidentTypesHierarchy, isLoading } = useGetIncidentTypesHierarchy();
  const columns = useIncidentTypesHierarchyTableColumns();

  const { mutateAsync: toggleIncidentTypeHierarchyStatusMutation } =
    usePatchToggleIncidentTypeHierarchyState();

  const handleToggleIncidentTypeStatus = async (incidentType: IncidentTypeHierarchy) => {
    const { incidentTypeHierarchyID, state, incidentTypeHierarchyName } = incidentType;
    modals.openConfirmModal({
      title: "Confirmar",
      children: `¿Está seguro que desea ${state === 0 ? "habilitar" : "deshabilitar"} la jerarquía ${incidentTypeHierarchyName}?`,
      onConfirm: () => {
        toggleIncidentTypeHierarchyStatusMutation(incidentTypeHierarchyID);
      }
    });
  };

  const handleOpenFormIncidenTypes = (incidentTypeHierarchy?: IncidentTypeHierarchy) => {
    modals.open({
      title: "Editar tipo de incidente",
      children: <FormIncidentTypeHierarchy initialValues={incidentTypeHierarchy} />
    });
  };

  return (
    <div className="flex flex-col">
      <DataTable
        mantineTableContainerProps={{
          style: { maxHeight: "460px" }
        }}
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
        data={incidentTypesHierarchy ?? []}
        columns={columns}
      />
    </div>
  );
}
