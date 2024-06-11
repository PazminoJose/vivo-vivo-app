"use client";
import { SOCKET_URL } from "@/constants/constants";
import { Position } from "@/models/position.model";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import GoogleMapApiProvider from "../../../providers/GoogleMapApiProvider";
import { Polygon } from "../../zones/components/Polygon";
import { useGetZones } from "../../zones/services/getZones.service";
import { SOCKET_SUSCRIBE_EVENTS } from "../events/socket.event";
import { POLICE_LOCATION_QUERY_KEY } from "../services/getPoliceLocation.service";
import { USERS_IN_DANGER_QUERY_KEY } from "../services/getUsersInDanger.service";
import PoliceMarkers from "./../components/PoliceMarkers";
import UserInDangerMarkers from "./../components/UserInDangerMarkers";
import UsersInDangerControl from "./../components/UsersInDangerControl";
import ViewPastAlarmsControl from "./../components/ViewPastAlarmsControl";
import { useIncidentsStore } from "./../store/incidents.store";

const DynamicMap = dynamic(() => import("../../../components/Map"), {
  ssr: false
});

export default function IncidentsMap() {
  const { data } = useSession();
  const params = useSearchParams();
  const setSelectedUserInDanger = useIncidentsStore((store) => store.setSelectedUserInDanger);

  const queryClient = useQueryClient();
  const { data: zones } = useGetZones(1);

  const defaultCenter: google.maps.LatLngLiteral = useMemo(
    () => ({
      lat: -1.253351,
      lng: -78.623011
    }),
    []
  );

  useEffect(() => {
    const socket = io(SOCKET_URL, { query: { userID: data?.user.userID, roleName: "ADMIN" } });
    if (!socket) return;
    socket.on(SOCKET_SUSCRIBE_EVENTS.UPDATE_USER_STATUS, () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_IN_DANGER_QUERY_KEY]
      });
    });
    socket.on(SOCKET_SUSCRIBE_EVENTS.UPDATE_POLICE_LOCATION, () => {
      queryClient.invalidateQueries({
        queryKey: [POLICE_LOCATION_QUERY_KEY]
      });
    });
    const userInDangerID = params.get("userID");
    if (userInDangerID) {
      socket.on(
        `${SOCKET_SUSCRIBE_EVENTS.USER_IN_DANGER}-${userInDangerID}`,
        ({ position }: { position: Position }) => {
          if (position == null) return;
          setSelectedUserInDanger({ position: { lat: position.lat, lng: position.lng } });
        }
      );
    }
    return () => {
      socket.disconnect();
    };
  }, [data, params]);

  return (
    <GoogleMapApiProvider>
      <DynamicMap
        defaultCenter={defaultCenter}
        streetViewControl={false}
        zoomControl={false}
        defaultZoom={13}
      >
        <ViewPastAlarmsControl />
        <UsersInDangerControl />
        <PoliceMarkers />
        <UserInDangerMarkers />
        {zones &&
          zones.length > 0 &&
          zones.map((zone) => (
            <Polygon
              fillColor={zone.zoneColor}
              strokeColor={zone.zoneColor}
              paths={zone.polygon.map((p) => {
                return new google.maps.LatLng(p[0], p[1]);
              })}
              key={zone.zoneID}
            />
          ))}
      </DynamicMap>
    </GoogleMapApiProvider>
  );
}
