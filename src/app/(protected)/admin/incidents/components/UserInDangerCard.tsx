import { IMG_URL } from "@/constants/constants";
import { IncidentTypeData } from "@/models/incident-type";
import { UserInDanger } from "@/models/user-in-danger.model";
import { Autocomplete, Avatar, Button, Card, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconLocation } from "@tabler/icons-react";
import { useMap } from "@vis.gl/react-google-maps";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetIncidentsTypeData } from "../hooks/useGetIncidentsTypeData.hook";
import { usePatchAlarm } from "../hooks/usePatchAlarm.hook";
import { useIncidentsStore } from "../store/incidents.store";

interface UserInDangerCardProps {
  userInDanger: UserInDanger;
}

export default function UserInDangerCard({ userInDanger: user }: UserInDangerCardProps) {
  const map = useMap();
  const [incidentsTypeAutocompleteValue, setIncidentsTypeAutocompleteValue] = useState<string>("");
  const [selectedIncidentType, setSelectedIncidentType] = useState<IncidentTypeData | null>(null);
  const [openedMenu, { close: closeMenu, toggle: toggleMenu }] = useDisclosure();
  const setSelectedUserInDanger = useIncidentsStore((store) => store.setSelectedUserInDanger);

  const { data: incidentsTypeData } = useGetIncidentsTypeData();
  const { mutate: updateMutation, isPending } = usePatchAlarm({ onSuccess: closeMenu });

  const handleClickViewUserInDanger = (user: UserInDanger) => {
    setSelectedUserInDanger(user);
    if (map) map.moveCamera({ center: user.position, zoom: 15 });
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

  useEffect(() => {
    if (user.incidentTypeName && incidentsTypeData) {
      const incidentType = incidentsTypeData[user.incidentTypeName];
      if (incidentType) setIncidentsTypeAutocompleteValue(incidentType.incidentTypeName);
    }
  }, [user.incidentTypeName, incidentsTypeData]);

  return (
    <Card className="mt-2 p-2" key={user.userID}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Avatar
            size="lg"
            className="border-[3.5px] border-red-500"
            src={`${IMG_URL}/${user.avatar}`}
          />
          <div className="flex flex-col">
            <p className="font-bold">Nombre: {user?.fullName}.</p>
            <p className="font-bold">Teléfono: {user?.phone}.</p>
            <p className="font-bold">Cédula: {user?.dni}.</p>
          </div>
        </div>
        <Menu position="left" opened={openedMenu} closeOnItemClick={false} closeOnClickOutside={false}>
          <Menu.Target>
            <Button leftSection={<IconInfoCircle />} onClick={toggleMenu}>
              Ingresar información
            </Button>
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
        <Button
          leftSection={<IconLocation />}
          onClick={() => {
            handleClickViewUserInDanger(user);
          }}
          component={Link}
          href={`/admin/incidents?userID=${user.userID}`}
        >
          Ver en el mapa
        </Button>
      </div>
    </Card>
  );
}
