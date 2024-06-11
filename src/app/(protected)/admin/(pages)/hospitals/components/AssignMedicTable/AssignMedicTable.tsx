import DataTable from "@/components/DataTable/DataTable";
import { UserRoleData } from "@/models/user-role-data.model";
import { ActionIcon, Autocomplete, Button, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconUserX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDeleteUserHospital } from "../../hooks/useDeleteUserHospital.hook";
import { useGetUserDataByMedicRole } from "../../hooks/useGetUserDataByMedicRole.hook";
import { useGetUsersHospitalByHospitalID } from "../../hooks/useGetUsersHospitalByHospitalID.hook";
import { usePostUserHospital } from "../../hooks/usePostUserHospital.hook";
import { getMedicHasActiveHospitalService } from "../../services/getMedicHasActiveHospital.service";
import useAssignMedicTableColumns from "./useAssignMedicTableColumns";

interface AssignMedicTableProps {
  hospitalID: number;
}

export default function AssignMedicTable({ hospitalID }: AssignMedicTableProps) {
  const [medicAutocompleteData, setMedicAutocompleteData] = useState<string[]>([]);
  const [autocompleteValue, setAutocompleteValue] = useState<string>("");
  const [selectedMedic, setSelectedMedic] = useState<UserRoleData | null>(null);

  // Query
  const { data: usersHospital } = useGetUsersHospitalByHospitalID(hospitalID);
  const columns = useAssignMedicTableColumns();

  const { data: medicUserRole } = useGetUserDataByMedicRole();

  // Mutation
  const { mutate: assignPoliceToZone, isPending: isPendingAssignMedic } = usePostUserHospital();
  const { mutate: deleteUserHospitalMutation } = useDeleteUserHospital();

  // Handlers
  const handleConfirmAssignMedic = () => {
    if (selectedMedic === null) return;
    assignPoliceToZone({ userID: selectedMedic.userID, hospitalID });
    setSelectedMedic(null);
    setAutocompleteValue("");
  };

  const handleMedicChange = (value: string) => {
    setAutocompleteValue(value);
    const medic = medicUserRole?.find((medic) => medic.fullName === value);
    if (medic) setSelectedMedic(medic);
    else setSelectedMedic(null);
  };

  const handleAssignMedicToHospital = async () => {
    if (selectedMedic === null) return;
    const hasActiveMedic = await getMedicHasActiveHospitalService(selectedMedic.userID);
    if (hasActiveMedic) {
      modals.openConfirmModal({
        title: "Confirmar",
        centered: true,
        children: "El médico seleccionado ya tiene un hospital activo, ¿desea reasignarlo?",
        onConfirm: handleConfirmAssignMedic
      });
    } else {
      handleConfirmAssignMedic();
    }
  };

  const handleDeleteUserHospital = (userHospitalID: number) => {
    modals.openConfirmModal({
      title: "Confirmar",
      centered: true,
      children: "¿Desea eliminar el médico asignado a este hospital?",
      onConfirm: () => deleteUserHospitalMutation(userHospitalID)
    });
  };

  useEffect(() => {
    if (medicUserRole) {
      setMedicAutocompleteData(medicUserRole.map((police) => police.fullName));
    }
  }, [medicUserRole]);

  return (
    <DataTable
      renderTopToolbarCustomActions={() => (
        <div className="flex gap-2">
          <Autocomplete
            value={autocompleteValue}
            data={medicAutocompleteData}
            placeholder="Buscar policía"
            onChange={handleMedicChange}
          />
          <Button
            loading={isPendingAssignMedic}
            disabled={selectedMedic === null}
            onClick={handleAssignMedicToHospital}
          >
            Asignar
          </Button>
        </div>
      )}
      enableRowActions
      positionActionsColumn="last"
      renderRowActions={({ row }) => (
        <ActionIcon
          variant="primary"
          onClick={() => handleDeleteUserHospital(row.original.userHospitalID)}
        >
          <Tooltip label="Eliminar">
            <IconUserX />
          </Tooltip>
        </ActionIcon>
      )}
      columns={columns}
      data={usersHospital ?? []}
    />
  );
}
