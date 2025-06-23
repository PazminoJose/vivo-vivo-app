"use client";
import { useShallowEffect } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useSocketIOProvider } from "../../../providers/SockerIOPtovider";
import { Polygon } from "../../zones/components/Polygon";
import VigilancePointMarker from "../../zones/components/VigilancePointMarker";
import { useGetZones } from "../../zones/services/getZones.service";
import { SOCKET_SUSCRIBE_EVENTS } from "../events/socket.event";
import { USERS_IN_DANGER_QUERY_KEY } from "../services/getUsersInDangerByIncidentTypeHierarchy.service";
import { WATCHMAN_LOCATION_QUERY_KEY } from "../services/getWatchmanLocation.service";
import UserInDangerMarkers from "./../components/UserInDangerMarkers";
import UsersInDangerControl from "./../components/UsersInDangerControl";
import ViewPastAlarmsControl from "./../components/ViewPastAlarmsControl";
import WatchmanMarkers from "./WatchmanMarkers";

const DynamicMap = dynamic(() => import("../../../components/Map"), {
  ssr: false
});

const DynamicProvider = dynamic(() => import("../../../providers/GoogleMapApiProvider"), {
  ssr: false
});

export default function IncidentsMap() {
  const { data } = useSession();
  const socket = useSocketIOProvider();
  const queryClient = useQueryClient();
  const { data: zones } = useGetZones(1);

  const defaultCenter: google.maps.LatLngLiteral = useMemo(
    () => ({
      lat: -1.253351,
      lng: -78.623011
    }),
    []
  );

  useShallowEffect(() => {
    if (!socket) return;
    socket.on(SOCKET_SUSCRIBE_EVENTS.UPDATE_USER_STATUS, () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_IN_DANGER_QUERY_KEY]
      });
    });
    socket.on(SOCKET_SUSCRIBE_EVENTS.UPDATE_WATCHMAN_LOCATION, () => {
      queryClient.invalidateQueries({
        queryKey: [WATCHMAN_LOCATION_QUERY_KEY]
      });
    });
  }, [socket, data]);

  return (
    <DynamicProvider>
      <DynamicMap
        defaultCenter={defaultCenter}
        streetViewControl={false}
        zoomControl={false}
        defaultZoom={13}
      >
        <ViewPastAlarmsControl />
        <UsersInDangerControl />
        <WatchmanMarkers />
        <UserInDangerMarkers />
        {zones &&
          zones.length > 0 &&
          zones.map((zone) => (
            <div key={zone.zoneID}>
              <Polygon
                fillColor={zone.zoneColor}
                strokeColor={zone.zoneColor}
                paths={zone.polygon.map((p) => {
                  return new google.maps.LatLng(p[0], p[1]);
                })}
              />
              {zone.VigilancePoint.map((vigilancePoint, index) => (
                <VigilancePointMarker
                  vigilancePoint={vigilancePoint}
                  defaultOpened={false}
                  key={index}
                />
              ))}
            </div>
          ))}
      </DynamicMap>
    </DynamicProvider>
  );
}
