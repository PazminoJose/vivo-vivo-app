import { IMG_URL } from "@/constants/constants";
import { Avatar, Card } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useGetPoliceLocation } from "../hooks/useGetPoliceLocation.hook";
import { useIncidentsStore } from "../store/incidents.store";

export default function PoliceMarkers() {
  const setSelectedPoliceLocation = useIncidentsStore((store) => store.setSelectedPoliceLocation);
  const selectedPoliceLocation = useIncidentsStore((store) => store.selectedPoliceLocation);
  const [openedInfoWindow, { close: closeInfoWindow, open: openInfoWindow }] = useDisclosure();
  const [markerRef, marker] = useAdvancedMarkerRef();

  const { data: policeLocation } = useGetPoliceLocation();

  return (
    <>
      {policeLocation?.map((pl) => {
        return (
          <AdvancedMarker
            ref={selectedPoliceLocation?.policeID === pl.policeID ? markerRef : undefined}
            onClick={() => {
              setSelectedPoliceLocation(pl);
              openInfoWindow();
            }}
            key={pl.policeID}
            position={{ lat: pl.position[0], lng: pl.position[1] }}
          >
            <Avatar
              size="md"
              className="border-[3.5px] border-blue-500"
              src={`${IMG_URL}/${pl.avatar}`}
            />
          </AdvancedMarker>
        );
      })}
      {openedInfoWindow && selectedPoliceLocation != null && (
        <InfoWindow anchor={marker} onCloseClick={closeInfoWindow}>
          <Card className="bg-[url(/logo-policia.png)] bg-cover">
            <Card.Section>
              <h2 className="text-center text-xl font-bold">Información del policía</h2>
            </Card.Section>
            <Card.Section className="flex flex-col gap-2 p-2">
              <Avatar
                size="xl"
                className="mx-auto border-[3.5px] border-blue-500"
                src={`${IMG_URL}/${selectedPoliceLocation?.avatar}`}
              />
              <p className="text-lg font-bold">Nombre: {selectedPoliceLocation?.fullName}</p>
              <p className="text-lg font-bold">Teléfono: {selectedPoliceLocation?.phone}</p>
            </Card.Section>
          </Card>
        </InfoWindow>
      )}
    </>
  );
}
