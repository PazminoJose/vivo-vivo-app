import { VigilancePoint, Zone } from "@/models/zone.model";
import { useDebouncedState, useShallowEffect } from "@mantine/hooks";
import { InfoWindow } from "@vis.gl/react-google-maps";
import { useEffect, useMemo, useState } from "react";
import { useZoneControlStore } from "../store/zoneControl.store";
import { Polygon } from "./Polygon";
import VigilancePointMarker from "./VigilancePointMarker";
import ZoneMenu from "./ZoneMenu";

interface ZonePolygonProps {
  zone: Zone;
}

export default function ZonePolygon({ zone }: ZonePolygonProps) {
  const [rightClickPosition, setRightClickPosition] = useState<google.maps.LatLng | null>(null);
  const [vigilancePoints, setVigilancePoints] = useState<VigilancePoint[]>(zone.VigilancePoint);
  // const [] = useState<VigilancePoint[]>(zone.VigilancePoint);
  const [isDragging, setIsDragging] = useState(false);
  const [debouncedZonePath, setDebouncedZonePath] = useDebouncedState<number[][]>([], 200);

  // Store
  const isEditingOrCreating = useZoneControlStore((state) => state.isEditingOrCreating);
  const selectedZone = useZoneControlStore((state) => state.selectedZone);
  const setSelectedZone = useZoneControlStore((state) => state.setSelectedZone);
  const currentColor = useZoneControlStore((state) => state.currentColor);
  // const vigilancePoints = useZoneControlStore((state) => state.vigilancePoints);
  const isAddingOrEditingVigilancePoint = useZoneControlStore(
    (state) => state.isAddingOrEditingVigilancePoint
  );
  // const addVigilancePoint = useZoneControlStore((state) => state.addVigilancePoint);
  const showVigilancePointsInZone = useZoneControlStore((state) => state.showVigilancePointsInZone);
  // const removeVigilancePoint = useZoneControlStore((state) => state.removeVigilancePoint);
  const blockClickablePolygon = useZoneControlStore((state) => state.blockClickablePolygon);
  const setBlockClickablePolygon = useZoneControlStore((state) => state.setBlockClickablePolygon);

  const isEditingOrCreatingCurrentZone = useMemo(
    () => isEditingOrCreating && zone.zoneID === selectedZone?.zoneID,
    [isEditingOrCreating, selectedZone?.zoneID, zone.zoneID]
  );

  const isActive = useMemo(() => zone.state === 1, [zone.state]);

  const showVigilancePoints = useMemo(
    () => showVigilancePointsInZone[zone.zoneID] && vigilancePoints && vigilancePoints.length > 0,
    [showVigilancePointsInZone[zone.zoneID], vigilancePoints]
  );

  const path = useMemo(() => {
    return zone.polygon.map((p) => {
      return new google.maps.LatLng(p[0], p[1]);
    });
  }, [zone.polygon]);

  const addVigilancePoint = (vigilancePoint: VigilancePoint) => {
    setVigilancePoints((prev) => [...prev, vigilancePoint]);
  };

  const handleAddVigilancePoint = (e: google.maps.MapMouseEvent) => {
    if (isAddingOrEditingVigilancePoint && zone.zoneID === selectedZone?.zoneID && e.latLng) {
      addVigilancePoint({
        vigilancePointName: "N/A",
        zoneID: zone.zoneID,
        latitude: e.latLng.lat(),
        longitude: e.latLng.lng()
      });
      showVigilancePointsInZone[zone.zoneID] = true;
      setBlockClickablePolygon(true);
    }
  };

  const updateVigilancePointPosition = (position: google.maps.LatLng, index: number) => {
    setVigilancePoints((prev) => {
      const newVigilancePoints = [...prev];
      newVigilancePoints[index] = {
        ...newVigilancePoints[index],
        latitude: position.lat(),
        longitude: position.lng()
      };
      return newVigilancePoints;
    });
  };

  const removeVigilancePoint = (index: number) => {
    setVigilancePoints((prev) => {
      const newVigilancePoints = prev.filter((_, i) => i !== index);
      if (newVigilancePoints.length === 0) setBlockClickablePolygon(false);
      return newVigilancePoints;
    });
    setBlockClickablePolygon(false);
  };

  const handleOnPathChange = (path: google.maps.LatLng[]) => {
    const points = path.map((p) => [p.lat(), p.lng()]);
    setDebouncedZonePath(points);
  };

  useEffect(() => {
    if (!isEditingOrCreating) setDebouncedZonePath([]);
  }, [isEditingOrCreating]);

  useShallowEffect(() => {
    if (selectedZone) setSelectedZone({ ...selectedZone, polygon: debouncedZonePath });
  }, [debouncedZonePath]);

  // useShallowEffect(() => {
  //   if (zone.VigilancePoint.length > 0) {
  //     setVigilancePoints(zone.VigilancePoint);
  //   }
  // }, [zone]);

  return (
    <>
      <Polygon
        onRightClick={(e) => {
          setRightClickPosition(e.latLng);
        }}
        clickable={!blockClickablePolygon}
        onClick={handleAddVigilancePoint}
        editable={isEditingOrCreatingCurrentZone}
        draggable={isEditingOrCreatingCurrentZone}
        fillColor={isActive ? (isEditingOrCreatingCurrentZone ? currentColor : zone.zoneColor) : "grey"}
        strokeColor={
          isActive ? (isEditingOrCreatingCurrentZone ? currentColor : zone.zoneColor) : "grey"
        }
        onPathChange={handleOnPathChange}
        paths={
          isEditingOrCreatingCurrentZone && debouncedZonePath.length > 0
            ? debouncedZonePath.map((p) => {
                return new google.maps.LatLng(p[0], p[1]);
              })
            : path
        }
      />
      {rightClickPosition !== null && (
        <InfoWindow
          headerContent={<span className="font-bold">{zone.zoneName}</span>}
          onClose={() => setRightClickPosition(null)}
          position={rightClickPosition}
        >
          <ZoneMenu
            showViewOnMap={false}
            withMenuComponent={false}
            zone={zone}
            onSelectedOption={() => setRightClickPosition(null)}
          />
        </InfoWindow>
      )}
      {showVigilancePoints &&
        vigilancePoints.map((vigilancePoint, index) => (
          <VigilancePointMarker
            onPositionChange={(position) => updateVigilancePointPosition(position, index)}
            key={index}
            vigilancePoint={vigilancePoint}
            onRemove={() => removeVigilancePoint(index)}
          />
        ))}
    </>
  );
}
