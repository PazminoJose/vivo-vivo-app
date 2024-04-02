import { IMG_URL } from "@/constants/constants";
import { IncidentType } from "@/models/incident-type";
import { UserInDanger } from "@/models/user-in-danger.model";
import { Autocomplete, Avatar, Button, Card, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconLocation } from "@tabler/icons-react";
import { useMap } from "@vis.gl/react-google-maps";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetIncidentsType } from "../hooks/useGetIncidentsType.hook";
import { usePatchAlarm } from "../hooks/usePatchAlarm.hook";
import { useIncidentsStore } from "../store/incidents.store";

interface UserInDangerCardProps {
  userInDanger: UserInDanger;
}

export default function UserInDangerCard({ userInDanger: user }: UserInDangerCardProps) {
  const map = useMap();
  const [incidentsTypeAutocompleteValue, setIncidentsTypeAutocompleteValue] = useState<string>("");
  const [selectedIncidentType, setSelectedIncidentType] = useState<IncidentType | null>(null);
  const [openedMenu, { close: closeMenu, toggle: toggleMenu }] = useDisclosure();
  const setSelectedUserInDanger = useIncidentsStore((store) => store.setSelectedUserInDanger);

  const { data: incidentsType } = useGetIncidentsType();
  const { mutate: updateMutation, isPending } = usePatchAlarm();

  const handleClickViewUserInDanger = (user: UserInDanger) => {
    setSelectedUserInDanger(user);
    if (map) map.moveCamera({ center: user.position, zoom: 15 });
  };

  const handleIncidentTypeChange = (value: string) => {
    setIncidentsTypeAutocompleteValue(value);
    const incidentType = incidentsType?.find((i) => i.incidentTypeName === value);
    if (incidentType) setSelectedIncidentType(incidentType);
    else setSelectedIncidentType(null);
  };

  const handleAddInformation = () => {
    updateMutation(
      {
        alarm: { incidentTypeID: selectedIncidentType?.incidentTypeID },
        alarmID: user.alarmID
      },
      {
        onSuccess: closeMenu
      }
    );
  };

  useEffect(() => {
    if (user.incidentTypeID) {
      const incidentType = incidentsType?.find((i) => i.incidentTypeID === user.incidentTypeID);
      if (incidentType) setIncidentsTypeAutocompleteValue(incidentType.incidentTypeName);
    }
  }, [user.incidentTypeID, incidentsType]);

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
        <Menu
          position="left"
          opened={openedMenu}
          classNames={{ dropdown: "w-32" }}
          closeOnItemClick={false}
          closeOnClickOutside={false}
        >
          <Menu.Target>
            <Button leftSection={<IconInfoCircle />} onClick={toggleMenu}>
              Ingresar información
            </Button>
          </Menu.Target>
          <Menu.Dropdown style={{ width: "15rem" }}>
            <Menu.Item>
              <div className="flex flex-col gap-2">
                <Autocomplete
                  value={incidentsTypeAutocompleteValue}
                  label="Tipo de incidente"
                  placeholder="Ingrese el tipo de incidente"
                  data={incidentsType ? incidentsType.map((i) => i.incidentTypeName) : []}
                  onChange={handleIncidentTypeChange}
                />
                <Button fullWidth onClick={handleAddInformation} loading={isPending}>
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
