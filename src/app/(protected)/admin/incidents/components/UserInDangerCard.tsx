import { IMG_URL } from "@/constants/constants";
import { UserInDanger } from "@/models/user-in-danger.model";
import { Avatar, Button, Card } from "@mantine/core";
import { IconLocation } from "@tabler/icons-react";
import { useMap } from "@vis.gl/react-google-maps";
import Link from "next/link";
import { useIncidentsStore } from "../store/incidents.store";

interface UserInDangerCardProps {
  user: UserInDanger;
}

export default function UserInDangerCard({ user }: UserInDangerCardProps) {
  const map = useMap();
  const setSelectedUserInDanger = useIncidentsStore((store) => store.setSelectedUserInDanger);

  const handleClickViewUserInDanger = (user: UserInDanger) => {
    setSelectedUserInDanger(user);
    if (map) map.moveCamera({ center: user.position, zoom: 15 });
  };

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
