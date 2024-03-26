"use client";
import { SOCKET_URL } from "@/constants/constants";
import { Position } from "@/models/position.model";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import GoogleMapApiProvider from "../../providers/GoogleMapApiProvider";
import PoliceMarkers from "./../components/PoliceMarkers";
import UserInDangerMarkers from "./../components/UserInDangerMarkers";
import UsersInDangerControl from "./../components/UsersInDangerControl";
import ViewPastAlarmsControl from "./../components/ViewPastAlarmsControl";
import { POLICE_LOCATION_QUERY_KEY } from "./../hooks/useGetPoliceLocation.hook";
import { USERS_IN_DANGER_QUERY_KEY } from "./../hooks/useGetUsersInDanger.hook";
import { useIncidentsStore } from "./../store/incidents.store";
const DynamicMap = dynamic(() => import("../../components/Map"), {
  ssr: false
});

export default function IncidentsMap() {
  const { data } = useSession();
  const params = useSearchParams();
  const setSelectedUserInDanger = useIncidentsStore((store) => store.setSelectedUserInDanger);

  const queryClient = useQueryClient();

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
    socket.on("update-user-status", () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_IN_DANGER_QUERY_KEY]
      });
      queryClient.invalidateQueries({
        queryKey: [POLICE_LOCATION_QUERY_KEY]
      });
    });
    const userInDangerID = params.get("userID");
    if (userInDangerID) {
      socket.on(`user-in-danger-${userInDangerID}`, ({ position }: { position: Position }) => {
        if (position == null) return;
        setSelectedUserInDanger({ position: { lat: position.lat, lng: position.lng } });
      });
    }
    return () => {
      socket.disconnect();
    };
  }, [data, params]);

  return (
    <GoogleMapApiProvider>
      <DynamicMap defaultCenter={defaultCenter} streetViewControl={false} zoomControl={false}>
        <ViewPastAlarmsControl />
        <UsersInDangerControl />
        <PoliceMarkers />
        <UserInDangerMarkers />
      </DynamicMap>
    </GoogleMapApiProvider>
  );
}
