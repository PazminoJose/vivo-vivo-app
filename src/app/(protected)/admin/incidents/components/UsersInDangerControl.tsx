import { Card } from "@mantine/core";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { useGetUsersInDanger } from "../hooks/useGetUsersInDanger.hook";
import { useIncidentsStore } from "../store/incidents.store";
import UserInDangerCard from "./UserInDangerCard";

export default function UsersInDangerControl() {
  const selectedUserInDanger = useIncidentsStore((store) => store.selectedUserInDanger);
  const removeSelectedUserInDanger = useIncidentsStore((store) => store.removeSelectedUserInDanger);
  const { data: usersInDanger } = useGetUsersInDanger();

  useEffect(() => {
    const isSelectedUserInList = usersInDanger?.some(
      (user) => user.userID === selectedUserInDanger?.userID
    );
    if (!isSelectedUserInList) {
      removeSelectedUserInDanger();
    }
  }, [usersInDanger?.length]);

  return (
    <MapControl position={ControlPosition.RIGHT_TOP}>
      <Card className="mr-4 flex h-[75vh] max-h-[75vh] w-[17rem] flex-col gap-1 border border-primary-400 bg-primary-100 p-2 pr-0 shadow-lg">
        <h2 className="text-center text-xl font-bold">Ciudadanos en peligro</h2>
        <div className="mt-2 block overflow-y-scroll rounded-b-lg ">
          {usersInDanger && usersInDanger.length > 0 ? (
            usersInDanger.map((user) => <UserInDangerCard key={user.userID} userInDanger={user} />)
          ) : (
            <div className="text-center font-bold">No hay reportes de incidentes</div>
          )}
        </div>
      </Card>
    </MapControl>
  );
}
