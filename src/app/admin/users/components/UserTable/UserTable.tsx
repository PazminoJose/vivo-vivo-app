"use client";
import DataTable from "@/components/DataTable/DataTable";
import { User } from "@/models/user.model";
import { Button, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUserEdit, IconUserPlus, IconUserX } from "@tabler/icons-react";
import { useState } from "react";
import { RegisterSchema } from "../../context/registerFormContext";
import { useGetUsers } from "../../hooks/useGetUsers.hook";
import { parseRegisterSchema } from "../../utils/parseRegisterSchema";
import FormRegister from "../FormRegister";
import useUserTableColumns from "./useUserTableColumns";

export default function UsersTable() {
  const [opened, { open, close }] = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<RegisterSchema | null>(null);

  const { data: users } = useGetUsers();
  const columns = useUserTableColumns();

  const handleEdit = async (user: User) => {
    const parseUser = await parseRegisterSchema(user);
    setSelectedUser(parseUser);
    open();
  };

  const handleCancel = () => {
    close();
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col">
      <DataTable
        enableColumnPinning
        enableRowActions
        renderRowActionMenuItems={({ row }) => (
          <>
            <Menu.Item leftSection={<IconUserEdit />} onClick={async () => handleEdit(row.original)}>
              Editar
            </Menu.Item>
            <Menu.Item leftSection={<IconUserX />} onClick={() => {}}>
              Deshabilitar
            </Menu.Item>
          </>
        )}
        renderTopToolbarCustomActions={() => (
          <Button leftSection={<IconUserPlus />} onClick={open}>
            Crear
          </Button>
        )}
        columns={columns}
        data={users ?? []}
      />
      <Modal size="xl" opened={opened} onClose={handleCancel}>
        <FormRegister onSubmitSuccess={close} initialValues={selectedUser} />
      </Modal>
    </div>
  );
}
