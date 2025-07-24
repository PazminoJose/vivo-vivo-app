import { IMG_URL } from "@/constants/constants";
import { Position } from "@/models/position.model";
import { UserInDanger } from "@/models/user-in-danger.model";
import { Avatar } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { useSocketIOProvider } from "../../../providers/SockerIOPtovider";
import { SOCKET_SUSCRIBE_EVENTS } from "../events/socket.event";

interface UserInDangerMarkerProps {
  user: UserInDanger;
}

export default function UserInDangerMarker({ user }: UserInDangerMarkerProps) {
  let activeTimeoutID: NodeJS.Timeout | null = null;
  const socket = useSocketIOProvider();
  const [position, setPosition] = useState<Position | null>(user.position);
  const [isActive, setIsActive] = useState(true);

  const resetInactivityTimeout = () => {
    setIsActive(true);
    activeTimeoutID && clearTimeout(activeTimeoutID);
    activeTimeoutID = setTimeout(() => {
      setIsActive(false);
    }, 15000);
  };

  useShallowEffect(() => {
    if (!socket) return;
    socket.on(
      `${SOCKET_SUSCRIBE_EVENTS.USER_IN_DANGER}-${user.userID}`,
      ({ position }: { position: Position }) => {
        if (position == null) return;
        setPosition({ lat: position.lat, lng: position.lng });
        resetInactivityTimeout();
      }
    );
  }, [socket]);

  return (
    isActive && (
      <AdvancedMarker position={position}>
        <Avatar
          src={`${IMG_URL}/${user.avatar}`}
          size="lg"
          className="border-[3.5px]"
          style={{ borderColor: user.color }}
        />
      </AdvancedMarker>
    )
  );
}
