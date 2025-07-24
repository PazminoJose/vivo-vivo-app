import { IMG_URL } from "@/constants/constants";
import { IncidentTypeData } from "@/models/incident-type";
import { UserInDanger } from "@/models/user-in-danger.model";
import { ActionIcon, Autocomplete, Avatar, Button, Card, Menu, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconInfoCircle, IconLocation } from "@tabler/icons-react";
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetIncidentsTypeData } from "../services/getIncidentsTypeData.service";
import { usePatchAlarm } from "../services/patchAlarm.service";
import { usePostMarkAlarmAsAttended } from "../services/postMarkAlarmAsAttended.service";
import { useIncidentsStore } from "../store/incidents.store";

interface UserInDangerCardProps {
  userInDanger: UserInDanger;
}

export default function UserInDangerCard({ userInDanger: user }: UserInDangerCardProps) {
  const map = useMap();
  const [incidentsTypeAutocompleteValue, setIncidentsTypeAutocompleteValue] = useState<string>("");
  const [selectedIncidentType, setSelectedIncidentType] = useState<IncidentTypeData | null>(null);
  const [openedMenu, { toggle: toggleMenu }] = useDisclosure();
  const setSelectedUserInDanger = useIncidentsStore((store) => store.setSelectedUserInDanger);

  const { data: incidentsTypeData } = useGetIncidentsTypeData();
  const { mutate: updateMutation, isPending } = usePatchAlarm();
  const { mutateAsync: markAlarmAsAttended, isPending: isPendingMarkAlarmAsAttended } =
    usePostMarkAlarmAsAttended();

  const handleClickViewUserInDanger = () => {
    setSelectedUserInDanger(null);
    setSelectedUserInDanger(user);
    if (map) map.moveCamera({ center: user.position });
  };

  const handleIncidentTypeChange = (value: string) => {
    if (!incidentsTypeData) return;
    setIncidentsTypeAutocompleteValue(value);
    const incidentType = incidentsTypeData[value];
    if (incidentType) setSelectedIncidentType(incidentType);
    else
      setSelectedIncidentType({
        incidentTypeName: value
      });
  };

  const handleAddInformation = () => {
    if (!selectedIncidentType) return;
    updateMutation({
      incidentType: selectedIncidentType,
      alarmID: user.alarmID
    });
  };

  const handleMarkAsAttended = () => {
    toast.promise(markAlarmAsAttended({ userID: user.userID, alarmID: user.alarmID }), {
      loading: "Marcando como atendida...",
      success: "Usuario marcado como atendido",
      error: "Error al marcar como atendido"
    });
  };

  useEffect(() => {
    if (user.incidentTypeName && incidentsTypeData) {
      const incidentType = incidentsTypeData[user.incidentTypeName];
      if (incidentType) setIncidentsTypeAutocompleteValue(incidentType.incidentTypeName);
    }
  }, [user.incidentTypeName, incidentsTypeData]);

  return (
    <Card className="mt-2 p-2" key={user.userID}>
      <div className="text-md flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <Avatar
            size="xl"
            className="border-[3.5px]"
            style={{ borderColor: user.color }}
            src={`${IMG_URL}/${user.avatar}`}
          />
          <div className="flex gap-1">
            <Menu
              position="left"
              opened={openedMenu}
              closeOnItemClick={false}
              closeOnClickOutside={false}
            >
              <Menu.Target>
                <Tooltip label="Ingresar información">
                  <ActionIcon onClick={toggleMenu}>
                    <IconInfoCircle />
                  </ActionIcon>
                </Tooltip>
              </Menu.Target>
              <Menu.Dropdown style={{ width: "25rem" }}>
                <Menu.Item component="div">
                  <div className="flex flex-col gap-2">
                    <Autocomplete
                      value={incidentsTypeAutocompleteValue}
                      label="Tipo de incidente"
                      placeholder="Ingrese el tipo de incidente"
                      data={Object.keys(incidentsTypeData || {})}
                      onChange={handleIncidentTypeChange}
                    />
                    <Button
                      disabled={!incidentsTypeAutocompleteValue.trim()}
                      fullWidth
                      onClick={handleAddInformation}
                      loading={isPending}
                    >
                      Guardar
                    </Button>
                  </div>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Tooltip label="Marcar como atendido">
              <ActionIcon
                onClick={() => {
                  handleMarkAsAttended();
                }}
              >
                <IconCheck />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Ver ubicación del usuario en peligro">
              <ActionIcon
                onClick={() => {
                  handleClickViewUserInDanger();
                }}
              >
                <IconLocation />
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-col px-2">
          <p className="font-bold">
            Nombre: <span className="font-normal">{user?.fullName}</span>.
          </p>
          <p className="font-bold">
            Teléfono: <span className="font-normal">{user?.phone}</span>.
          </p>
          <p className="font-bold">
            Tipo de incidente: <span className="font-normal">{user?.incidentTypeName}</span>.
          </p>
          <p className="font-bold">
            Punto de vigilancia más cercano:{" "}
            <span className="font-normal">{user?.closestVigilancePointName}</span>.
          </p>
        </div>
      </div>
    </Card>
  );
}
