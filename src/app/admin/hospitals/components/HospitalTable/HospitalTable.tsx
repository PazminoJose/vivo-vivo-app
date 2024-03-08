"use client";
import DataTable from "@/components/DataTable/DataTable";
import { Hospital } from "@/models/hospital.model";
import { Button, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUserEdit, IconUserPlus, IconUserX } from "@tabler/icons-react";
import { useState } from "react";
import { useGetHospitals } from "../../hooks/useGetHospitals.hook";
import FormHospital from "../FormHospital";
import useHospitalTableColumns from "./useHospitalTableColumns";

export default function HospitalTable() {
  const [opened, { open, close }] = useDisclosure();
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const { data: hospitals } = useGetHospitals();
  const columns = useHospitalTableColumns();

  const handleEdit = async (hospital: Hospital) => {
    setSelectedHospital(hospital);
    open();
  };

  const handleCancel = () => {
    close();
    setSelectedHospital(null);
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
        data={hospitals ?? []}
      />
      <Modal size="xl" opened={opened} onClose={handleCancel}>
        <FormHospital onSubmitSuccess={close} initialValues={selectedHospital} />
      </Modal>
    </div>
  );
}
