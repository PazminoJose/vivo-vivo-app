"use client";
import DataTable from "@/components/DataTable/DataTable";
import { Hospital } from "@/models/hospital.model";
import { Button, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBuildingHospital, IconEdit, IconUserPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useGetHospitals } from "../../hooks/useGetHospitals.hook";
import AssignMedicTable from "../AssignMedicTable/AssignMedicTable";
import FormHospital from "../FormHospital";
import useHospitalTableColumns from "./useHospitalTableColumns";

export default function HospitalTable() {
  const [openedCreateEdit, { open: openCreateEdit, close: closeCreateEdit }] = useDisclosure();
  const [openedAssignMedic, { open: openAssignMedic, close: closeAssignMedic }] = useDisclosure();
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const { data: hospitals } = useGetHospitals();
  const columns = useHospitalTableColumns();

  const handleAssignMedic = async (hospital: Hospital) => {
    setSelectedHospital(hospital);
    openAssignMedic();
  };

  const handleEdit = async (hospital: Hospital) => {
    setSelectedHospital(hospital);
    openCreateEdit();
  };

  const handleCancel = () => {
    if (openedCreateEdit) closeCreateEdit();
    if (openedAssignMedic) closeAssignMedic();
    setSelectedHospital(null);
  };

  return (
    <div className="flex flex-col">
      <DataTable
        enableColumnPinning
        enableRowActions
        renderRowActionMenuItems={({ row }) => (
          <>
            <Menu.Item leftSection={<IconUserPlus />} onClick={async () => handleAssignMedic(row.original)}>
              Asignar Medicos
            </Menu.Item>
            <Menu.Item leftSection={<IconEdit />} onClick={async () => handleEdit(row.original)}>
              Editar
            </Menu.Item>
            <Menu.Item leftSection={<IconX />} onClick={() => {}}>
              Deshabilitar
            </Menu.Item>
          </>
        )}
        renderTopToolbarCustomActions={() => (
          <Button leftSection={<IconBuildingHospital />} onClick={openCreateEdit}>
            Crear
          </Button>
        )}
        columns={columns}
        data={hospitals ?? []}
      />
      <Modal size="xl" opened={openedCreateEdit || openedAssignMedic} onClose={handleCancel}>
        {openedCreateEdit && <FormHospital onSubmitSuccess={close} initialValues={selectedHospital} />}
        {openedAssignMedic && selectedHospital?.hospitalID && (
          <AssignMedicTable hospitalID={selectedHospital.hospitalID} />
        )}
      </Modal>
    </div>
  );
}
