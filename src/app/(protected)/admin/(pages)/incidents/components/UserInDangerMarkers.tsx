import { IMG_URL } from "@/constants/constants";
import { Position } from "@/models/position.model";
import { Avatar } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useSocketIOProvider } from "../../../providers/SockerIOPtovider";
import { SOCKET_SUSCRIBE_EVENTS } from "../events/socket.event";
import { useIncidentsStore } from "../store/incidents.store";

export default function UserInDangerMarkers() {
  const socket = useSocketIOProvider();
  // Store
  const selectedUserInDanger = useIncidentsStore((store) => store.selectedUserInDanger);
  const setSelectedUserInDanger = useIncidentsStore((store) => store.setSelectedUserInDanger);

  useShallowEffect(() => {
    if (!socket || !selectedUserInDanger) return;
    const userInDangerID = selectedUserInDanger.userID;
    if (userInDangerID) {
      socket.on(
        `${SOCKET_SUSCRIBE_EVENTS.USER_IN_DANGER}-${userInDangerID}`,
        ({ position }: { position: Position }) => {
          if (position == null) return;
          setSelectedUserInDanger({ position: { lat: position.lat, lng: position.lng } });
        }
      );
    }
  }, [socket, selectedUserInDanger]);

  return (
    selectedUserInDanger != null && (
      <AdvancedMarker position={selectedUserInDanger.position}>
        <Avatar
          src={`${IMG_URL}/${selectedUserInDanger.avatar}`}
          className="border-[3.5px] border-red-500"
        />
      </AdvancedMarker>
    )
  );
}
