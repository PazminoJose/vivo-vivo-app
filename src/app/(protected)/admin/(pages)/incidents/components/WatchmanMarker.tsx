import { IMG_URL } from "@/constants/constants";
import { Position } from "@/models/position.model";
import { WatchmanLocation } from "@/models/watchman-location.model";
import { Avatar, Card } from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { useSocketIOProvider } from "../../../providers/SockerIOPtovider";
import { SOCKET_SUSCRIBE_EVENTS } from "../events/socket.event";
import { useGetWatchmanByWatchmanUserID } from "../services/getWatchmanByWatchmanUserID.service";
import { useIncidentsStore } from "../store/incidents.store";

interface WatchmanMarkerProps {
  watchmanLocation: WatchmanLocation;
}

export default function WatchmanMarker({ watchmanLocation }: WatchmanMarkerProps) {
  let activeTimeoutID: NodeJS.Timeout | null = null;
  const socket = useSocketIOProvider();
  const [isActive, setIsActive] = useState(true);
  const [markerPosition, setMarkerPosition] = useState<Position>(watchmanLocation.position);
  const [openedInfoWindow, { close: closeInfoWindow, open: openInfoWindow }] = useDisclosure();
  const [markerRef, marker] = useAdvancedMarkerRef();
  // Store
  const setSelectedWatchmanLocation = useIncidentsStore((store) => store.setSelectedWatchmanLocation);
  const selectedWatchmanLocation = useIncidentsStore((store) => store.selectedWatchmanLocation);

  const { data: watchmanInfo } = useGetWatchmanByWatchmanUserID(watchmanLocation.watchmanUserID);

  const resetInactivityTimeout = () => {
    setIsActive(true);
    activeTimeoutID && clearTimeout(activeTimeoutID);
    activeTimeoutID = setTimeout(() => {
      setIsActive(false);
    }, 15000);
  };

  const handleOnClickMarker = () => {
    setSelectedWatchmanLocation(watchmanLocation);
    openInfoWindow();
  };

  useShallowEffect(() => {
    if (!socket) return;
    const event = `${SOCKET_SUSCRIBE_EVENTS.UPDATE_WATCHMAN_LOCATION}-${watchmanLocation.watchmanUserID}`;
    socket.on(event, ({ position }) => {
      if (position) {
        setMarkerPosition(position);
        resetInactivityTimeout();
      }
    });
  }, [socket]);

  return (
    isActive && (
      <>
        <AdvancedMarker ref={markerRef} onClick={() => handleOnClickMarker()} position={markerPosition}>
          <Avatar
            size="md"
            className="border-[3.5px] border-blue-500"
            src={`${IMG_URL}/${watchmanInfo?.avatar}`}
          />
        </AdvancedMarker>
        {openedInfoWindow && selectedWatchmanLocation != null && (
          <InfoWindow anchor={marker} onCloseClick={closeInfoWindow}>
            <Card className="bg-[url(/logo-policia.png)] bg-cover">
              <Card.Section>
                <h2 className="text-center text-xl font-bold">Información del vigilante</h2>
              </Card.Section>
              <Card.Section className="flex flex-col gap-2 p-2">
                <Avatar
                  size="xl"
                  className="mx-auto border-[3.5px] border-blue-500"
                  src={`${IMG_URL}/${watchmanInfo?.avatar}`}
                />
                <p className="text-lg font-bold">Nombre: {watchmanInfo?.fullName}</p>
                <p className="text-lg font-bold">Teléfono: {watchmanInfo?.phone}</p>
              </Card.Section>
            </Card>
          </InfoWindow>
        )}
      </>
    )
  );
}
