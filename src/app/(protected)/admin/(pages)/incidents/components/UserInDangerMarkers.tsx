import { IMG_URL } from "@/constants/constants";
import { Avatar } from "@mantine/core";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useIncidentsStore } from "../store/incidents.store";

export default function UserInDangerMarkers() {
  const selectedUserInDanger = useIncidentsStore((store) => store.selectedUserInDanger);

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
