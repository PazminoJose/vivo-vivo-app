"use client";
import DataTable from "@/components/DataTable/DataTable";
import { User } from "@/models/user.model";
import { ActionIcon, Button, Loader, Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCircle, IconCircleOff, IconDots, IconEdit, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useGetUsers, usePatchToggleUserState } from "../../services";
import { parseRegisterSchema } from "../../utils/parseRegisterSchema";
import FormRegister from "../FormRegister";
import useUserTableColumns from "./useUserTableColumns";

export default function UsersTable() {
  const [selectedUserID, setSelectedUserID] = useState<number>(0);

  const { data: users, isLoading } = useGetUsers();
  const columns = useUserTableColumns();

  const { mutate: toggleUserStateMutation, isPending } = usePatchToggleUserState();

  const handleToggleUserState = async (user: User) => {
    const { userID, person, state } = user;
    const fullName = `${person.firstName} ${person.middleName} ${person.lastNames}`;
    setSelectedUserID(userID);
    modals.openConfirmModal({
      title: "Confirmar",
      children: `¿Está seguro de que desea ${state === 0 ? "habilitar" : "deshabilitar"} el usuario ${fullName}?`,
      onConfirm: () => {
        toggleUserStateMutation(userID);
      }
    });
  };

  const handleOpenFormRegister = async (user?: User) => {
    const parseUser = user ? await parseRegisterSchema(user) : undefined;
    modals.open({
      size: "xl",
      children: <FormRegister initialValues={parseUser} />
    });
  };

  return (
    <div className="flex flex-col">
      <DataTable
        state={{ isLoading }}
        enableColumnPinning
        enableRowActions
        renderRowActions={({ row }) => {
          const isDisabled = row.original.state === 0;
          const isLoading = isPending && selectedUserID === row.original.userID;
          return (
            <Menu closeOnItemClick={false} trigger="hover">
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
                  onClick={async () => handleOpenFormRegister(row.original)}
                >
                  Editar
                </Menu.Item>
                <Menu.Item
                  disabled={isLoading && selectedUserID === row.original.userID}
                  leftSection={
                    isLoading ? <Loader size="sm" /> : isDisabled ? <IconCircle /> : <IconCircleOff />
                  }
                  onClick={() => handleToggleUserState(row.original)}
                >
                  {isDisabled ? "Habilitar" : "Deshabilitar"}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          );
        }}
        renderTopToolbarCustomActions={() => (
          <Button leftSection={<IconPlus />} onClick={() => handleOpenFormRegister()}>
            Crear
          </Button>
        )}
        columns={columns}
        data={users ?? []}
      />
    </div>
  );
}
